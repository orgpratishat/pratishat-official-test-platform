const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getLeaderboard } = require('../utils/leaderboardGenerator');

// @desc    Get leaderboard for a test
// @route   GET /api/leaderboard/test/:testId
router.get('/test/:testId', protect, async (req, res, next) => {
  try {
    const { limit = 100 } = req.query;
    const leaderboard = await getLeaderboard(req.params.testId, parseInt(limit));

    if (!leaderboard) {
      return res.status(404).json({
        success: false,
        message: 'Leaderboard not found'
      });
    }

    // Find user's rank
    const userEntry = leaderboard.entries.find(
      entry => entry.user._id.toString() === req.user.id
    );

    res.status(200).json({
      success: true,
      leaderboard: {
        test: leaderboard.test,
        testType: leaderboard.testType,
        entries: leaderboard.entries,
        userRank: userEntry?.rank || null
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
