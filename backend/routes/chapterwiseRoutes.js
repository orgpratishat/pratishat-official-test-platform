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
});

// @desc    Get topics by chapter
// @route   GET /api/chapterwise/:subject/:chapter/topics
router.get('/:subject/:chapter/topics', protect, async (req, res, next) => {
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
});

// @desc    Get questions by topic
// @route   GET /api/chapterwise/:subject/:chapter/:topic/questions


router.get('/:subject/:chapter/:topic/questions', protect, async (req, res, next) => {
  try {
    const { subject, chapter, topic } = req.params;

    // Explicitly include all necessary fields
    const questions = await Question.find({
      subject,
      chapter,
      topic
    }).select('questionText questionImage options difficulty hint approach solution chapter topic subject year analytics createdAt exam');

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

module.exports = router;
