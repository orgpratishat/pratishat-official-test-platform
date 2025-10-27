const Question = require('../models/Question');

// @desc    Get all questions with filters
// @route   GET /api/questions
// @access  Private
exports.getQuestions = async (req, res, next) => {
  try {
    const { subject, chapter, topic, difficulty, year, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = chapter;
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (year) filter.year = year;

    const questions = await Question.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(filter);
    console.log(questions);

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Private
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chapters by subject
// @route   GET /api/questions/chapters/:subject
// @access  Private
exports.getChaptersBySubject = async (req, res, next) => {
  try {
    const chapters = await Question.distinct('chapter', {
      subject: req.params.subject
    });

    res.status(200).json({
      success: true,
      count: chapters.length,
      chapters
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get topics by chapter
// @route   GET /api/questions/topics/:subject/:chapter
// @access  Private
exports.getTopicsByChapter = async (req, res, next) => {
  try {
    const { subject, chapter } = req.params;

    const topics = await Question.distinct('topic', {
      subject,
      chapter
    });

    res.status(200).json({
      success: true,
      count: topics.length,
      topics
    });
  } catch (error) {
    next(error);
  }
};





// Add these new functions to your existing questionController.js

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private/Admin
exports.createQuestion = async (req, res, next) => {
  try {
    const {
      subject,
      chapter,
      topic,
      difficulty,
      questionText,
      questionImage,
      options,
      hint,
      approach,
      solution,
      exam,
      year
    } = req.body;

    // Validation
    if (!subject || !chapter || !topic || !questionText || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject, chapter, topic, difficulty, and question text'
      });
    }

    if (!options || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least 2 options are required'
      });
    }

    const correctOptions = options.filter(opt => opt.isCorrect);
    if (correctOptions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one option must be marked as correct'
      });
    }

    const question = await Question.create({
      subject,
      chapter,
      topic,
      difficulty,
      questionText,
      questionImage,
      exam,
      options,
      hint: hint || { text: '', image: '' },
      approach: approach || { text: '', image: '' },
      solution: solution || [],
      year,
      analytics: {
        averageTime: 0,
        bestTime: 0,
        worstTime: 0,
        totalAttempts: 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
exports.updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Validate if updating options
    if (req.body.options) {
      if (req.body.options.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'At least 2 options are required'
        });
      }

      const correctOptions = req.body.options.filter(opt => opt.isCorrect);
      if (correctOptions.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one option must be marked as correct'
        });
      }
    }

    question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question analytics after attempt
// @route   PUT /api/questions/:id/analytics
// @access  Private
exports.updateQuestionAnalytics = async (req, res, next) => {
  try {
    const { timeTaken } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const totalAttempts = question.analytics.totalAttempts + 1;
    const currentAverage = question.analytics.averageTime || 0;
    const newAverage = ((currentAverage * question.analytics.totalAttempts) + timeTaken) / totalAttempts;

    question.analytics.totalAttempts = totalAttempts;
    question.analytics.averageTime = newAverage;
    
    if (!question.analytics.bestTime || timeTaken < question.analytics.bestTime) {
      question.analytics.bestTime = timeTaken;
    }
    
    if (!question.analytics.worstTime || timeTaken > question.analytics.worstTime) {
      question.analytics.worstTime = timeTaken;
    }

    await question.save();

    res.status(200).json({
      success: true,
      message: 'Analytics updated',
      analytics: question.analytics
    });
  } catch (error) {
    next(error);
  }
};
