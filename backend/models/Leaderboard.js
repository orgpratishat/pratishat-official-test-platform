const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
    unique: true
  },
  testType: {
    type: String,
    enum: ['DPP_TEST', 'NEET_MOCK'],
    required: true
  },
  entries: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attempt'
    },
    score: Number,
    accuracy: Number,
    totalTime: Number,
    rank: Number
  }],
  generatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for test
leaderboardSchema.index({ test: 1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
