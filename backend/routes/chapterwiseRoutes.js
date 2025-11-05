

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

// @desc    Get all subjects
// @route   GET /api/chapterwise/subjects
router.get('/subjects', protect, async (req, res, next) => {
  try {
    const subjects = await Question.distinct('subject');
    
    res.status(200).json({
      success: true,
      subjects
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get chapters by subject
// @route   GET /api/chapterwise/:subject/chapters
router.get('/:subject/chapters', protect, async (req, res, next) => {
  try {
    const { subject } = req.params;
    
    const chapters = await Question.distinct('chapter', {
      subject: subject
    });

    res.status(200).json({
      success: true,
      count: chapters.length,
      chapters: chapters.sort()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get topics by chapter
// @route   GET /api/chapterwise/:subject/:chapter/topics
router.get('/:subject/:chapter/topics', protect, async (req, res, next) => {
  try {
    const { subject, chapter } = req.params;

    // Since topics is now an array, we need to use aggregation to get distinct topics
    const topics = await Question.aggregate([
      {
        $match: {
          subject: subject,
          chapter: chapter
        }
      },
      {
        $unwind: '$topics'
      },
      {
        $group: {
          _id: '$topics'
        }
      },
      {
        $project: {
          _id: 0,
          topic: '$_id'
        }
      },
      {
        $sort: { topic: 1 }
      }
    ]);

    // Extract just the topic names
    const topicNames = topics.map(t => t.topic);

    res.status(200).json({
      success: true,
      count: topicNames.length,
      topics: topicNames
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get questions by topic
// @route   GET /api/chapterwise/:subject/:chapter/:topic/questions
router.get('/:subject/:chapter/:topic/questions', protect, async (req, res, next) => {
  try {
    const { subject, chapter, topic } = req.params;

    // Find questions where the topics array contains the specified topic
    const questions = await Question.find({
      subject,
      chapter,
      topics: topic // This matches if the topic is in the topics array
    }).select('questionText questionImage options difficulty hint approach solution chapter topics subject year analytics createdAt exam createdBy');

    // Get user's previous attempts for these questions
    const questionIds = questions.map(q => q._id);
    const previousAttempts = await Attempt.find({
      user: req.user.id,
      attemptType: 'CHAPTERWISE',
      'responses.question': { $in: questionIds }
    });

    // Mark which questions were answered wrong
    const wrongQuestionIds = new Set();
    previousAttempts.forEach(attempt => {
      attempt.responses.forEach(response => {
        if (!response.isCorrect) {
          wrongQuestionIds.add(response.question.toString());
        }
      });
    });

    const questionsWithStatus = questions.map(q => ({
      ...q.toObject(),
      wasWrong: wrongQuestionIds.has(q._id.toString())
    }));

    res.status(200).json({
      success: true,
      count: questionsWithStatus.length,
      questions: questionsWithStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all topics across all chapters for a subject
// @route   GET /api/chapterwise/:subject/topics
router.get('/:subject/topics', protect, async (req, res, next) => {
  try {
    const { subject } = req.params;

    // Get all topics for a subject across all chapters
    const topics = await Question.aggregate([
      {
        $match: {
          subject: subject
        }
      },
      {
        $unwind: '$topics'
      },
      {
        $group: {
          _id: '$topics',
          chapters: { $addToSet: '$chapter' }
        }
      },
      {
        $project: {
          _id: 0,
          topic: '$_id',
          chapters: 1
        }
      },
      {
        $sort: { topic: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      count: topics.length,
      topics
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get questions by multiple topics
// @route   POST /api/chapterwise/questions/by-topics
router.post('/questions/by-topics', protect, async (req, res, next) => {
  try {
    const { subject, chapter, topics } = req.body;

    if (!subject || !topics || !Array.isArray(topics)) {
      return res.status(400).json({
        success: false,
        message: 'Subject and topics array are required'
      });
    }

    const matchCriteria = {
      subject: subject,
      topics: { $in: topics }
    };

    // Add chapter filter if provided
    if (chapter) {
      matchCriteria.chapter = chapter;
    }

    const questions = await Question.find(matchCriteria)
      .select('questionText questionImage options difficulty hint approach solution chapter topics subject year analytics createdAt exam createdBy');

    // Get user's previous attempts for these questions
    const questionIds = questions.map(q => q._id);
    const previousAttempts = await Attempt.find({
      user: req.user.id,
      attemptType: 'CHAPTERWISE',
      'responses.question': { $in: questionIds }
    });

    // Mark which questions were answered wrong
    const wrongQuestionIds = new Set();
    previousAttempts.forEach(attempt => {
      attempt.responses.forEach(response => {
        if (!response.isCorrect) {
          wrongQuestionIds.add(response.question.toString());
        }
      });
    });

    const questionsWithStatus = questions.map(q => ({
      ...q.toObject(),
      wasWrong: wrongQuestionIds.has(q._id.toString())
    }));

    res.status(200).json({
      success: true,
      count: questionsWithStatus.length,
      questions: questionsWithStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get question statistics by subject and chapter
// @route   GET /api/chapterwise/:subject/:chapter/stats
router.get('/:subject/:chapter/stats', protect, async (req, res, next) => {
  try {
    const { subject, chapter } = req.params;

    const stats = await Question.aggregate([
      {
        $match: {
          subject: subject,
          chapter: chapter
        }
      },
      {
        $unwind: '$topics'
      },
      {
        $group: {
          _id: '$topics',
          totalQuestions: { $sum: 1 },
          easyQuestions: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'Easy'] }, 1, 0] }
          },
          mediumQuestions: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'Medium'] }, 1, 0] }
          },
          hardQuestions: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'Hard'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          topic: '$_id',
          totalQuestions: 1,
          easyQuestions: 1,
          mediumQuestions: 1,
          hardQuestions: 1
        }
      },
      {
        $sort: { topic: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      count: stats.length,
      stats
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Search topics within a subject
// @route   GET /api/chapterwise/:subject/topics/search
router.get('/:subject/topics/search', protect, async (req, res, next) => {
  try {
    const { subject } = req.params;
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const topics = await Question.aggregate([
      {
        $match: {
          subject: subject,
          topics: { $regex: q, $options: 'i' }
        }
      },
      {
        $unwind: '$topics'
      },
      {
        $match: {
          topics: { $regex: q, $options: 'i' }
        }
      },
      {
        $group: {
          _id: '$topics'
        }
      },
      {
        $project: {
          _id: 0,
          topic: '$_id'
        }
      },
      {
        $sort: { topic: 1 }
      },
      {
        $limit: 20
      }
    ]);

    const topicNames = topics.map(t => t.topic);

    res.status(200).json({
      success: true,
      count: topicNames.length,
      topics: topicNames
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;