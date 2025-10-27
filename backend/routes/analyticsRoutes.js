const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Attempt = require('../models/Attempt');

// @desc    Get overall analytics
// @route   GET /api/analytics/overall
router.get('/overall', protect, async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all attempts
    const attempts = await Attempt.find({ user: userId });

    if (attempts.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No attempts found',
        analytics: null
      });
    }

    // Calculate overall statistics
    const totalAttempts = attempts.length;
    const totalCorrect = attempts.reduce((sum, att) => sum + att.score.correctAnswers, 0);
    const totalWrong = attempts.reduce((sum, att) => sum + att.score.wrongAnswers, 0);
    const totalQuestions = totalCorrect + totalWrong + attempts.reduce((sum, att) => sum + att.score.unattempted, 0);
    
    const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Subject-wise aggregation
    const subjectStats = {};
    attempts.forEach(attempt => {
      attempt.analytics.subjectWiseAnalysis.forEach(subj => {
        if (!subjectStats[subj.subject]) {
          subjectStats[subj.subject] = {
            attempted: 0,
            correct: 0,
            wrong: 0
          };
        }
        subjectStats[subj.subject].attempted += subj.attempted;
        subjectStats[subj.subject].correct += subj.correct;
        subjectStats[subj.subject].wrong += subj.wrong;
      });
    });

    const subjectWise = Object.entries(subjectStats).map(([subject, data]) => ({
      subject,
      attempted: data.attempted,
      correct: data.correct,
      wrong: data.wrong,
      accuracy: data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0
    }));

    // Weak areas aggregation
    const weakTopicsMap = new Map();
    const weakChaptersMap = new Map();

    attempts.forEach(attempt => {
      attempt.analytics.weakTopics.forEach(topic => {
        weakTopicsMap.set(topic, (weakTopicsMap.get(topic) || 0) + 1);
      });
      attempt.analytics.weakChapters.forEach(chapter => {
        weakChaptersMap.set(chapter, (weakChaptersMap.get(chapter) || 0) + 1);
      });
    });

    const topWeakTopics = Array.from(weakTopicsMap.entries())
      .sort((a, b) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));

    const topWeakChapters = Array.from(weakChaptersMap.entries())
      .sort((a, b) => b - a)
      .slice(0, 10)
      .map(([chapter, count]) => ({ chapter, count }));

    res.status(200).json({
      success: true,
      analytics: {
        totalAttempts,
        overallAccuracy,
        totalCorrect,
        totalWrong,
        totalQuestions,
        subjectWise,
        topWeakTopics,
        topWeakChapters
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get progress over time
// @route   GET /api/analytics/progress
router.get('/progress', protect, async (req, res, next) => {
  try {
    const { attemptType, days = 30 } = req.query;
    const userId = req.user.id;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const filter = {
      user: userId,
      createdAt: { $gte: startDate }
    };

    if (attemptType) {
      filter.attemptType = attemptType;
    }

    const attempts = await Attempt.find(filter)
      .select('score totalTimeSpent completedAt attemptType')
      .sort({ completedAt: 1 });

    const progressData = attempts.map(att => ({
      date: att.completedAt,
      accuracy: att.score.accuracy,
      score: att.score.obtainedMarks,
      totalTime: att.totalTimeSpent,
      attemptType: att.attemptType
    }));

    res.status(200).json({
      success: true,
      count: progressData.length,
      progress: progressData
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
