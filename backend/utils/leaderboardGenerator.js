const Leaderboard = require('../models/Leaderboard');
const Test = require('../models/Test');

// Update leaderboard with new attempt
exports.updateLeaderboard = async (testId, userId, attemptId, score, accuracy, totalTime) => {
  try {
    const test = await Test.findById(testId);
    
    if (!test) return;

    let leaderboard = await Leaderboard.findOne({ test: testId });

    if (!leaderboard) {
      // Create new leaderboard
      leaderboard = await Leaderboard.create({
        test: testId,
        testType: test.type,
        entries: []
      });
    }

    // Add new entry
    leaderboard.entries.push({
      user: userId,
      attempt: attemptId,
      score,
      accuracy,
      totalTime,
      rank: 0 // Will be calculated next
    });

    // Sort entries by score (descending), then by time (ascending)
    leaderboard.entries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.totalTime - b.totalTime;
    });

    // Assign ranks
    leaderboard.entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    leaderboard.updatedAt = Date.now();
    await leaderboard.save();

    return leaderboard;
  } catch (error) {
    console.error('Leaderboard update error:', error);
  }
};

// Get leaderboard for a test
exports.getLeaderboard = async (testId, limit = 100) => {
  try {
    const leaderboard = await Leaderboard.findOne({ test: testId })
      .populate('entries.user', 'username profile.fullName profile.avatar')
      .populate('test', 'name type');

    if (!leaderboard) {
      return null;
    }

    // Limit entries if specified
    if (limit > 0) {
      leaderboard.entries = leaderboard.entries.slice(0, limit);
    }

    return leaderboard;
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return null;
  }
};
