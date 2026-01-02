// const mongoose = require('mongoose');

// const attemptSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   attemptType: {
//     type: String,
//     enum: ['DPP_TEST', 'NEET_MOCK', 'PYQ', 'DPP', 'CHAPTERWISE'],
//     required: true
//   },
//   test: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Test'
//   },
//   questions: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Question'
//   }],
//   responses: [{
//     question: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Question'
//     },
//     selectedOption: Number,
//     isCorrect: Boolean,
//     timeSpent: Number,
//     isMarkedForReview: {
//       type: Boolean,
//       default: false
//     }
//   }],
//   score: {
//     totalMarks: Number,
//     obtainedMarks: Number,
//     correctAnswers: Number,
//     wrongAnswers: Number,
//     unattempted: Number,
//     accuracy: Number
//   },
//   totalTimeSpent: Number,
//   attemptNumber: {
//     type: Number,
//     required: true
//   },
//   isFirstAttempt: {
//     type: Boolean,
//     default: true
//   },
//   analytics: {
//     weakSubjects: [String],
//     strongSubjects: [String],
//     weakTopics: [String],
//     strongTopics: [String],
//     weakChapters: [String],
//     strongChapters: [String],
//     subjectWiseAnalysis: [{
//       subject: String,
//       attempted: Number,
//       correct: Number,
//       wrong: Number,
//       accuracy: Number
//     }]
//   },
//   predictedRank: Number,
//   completedAt: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: { createdAt: true, updatedAt: false }
// });

// // Indexes for faster queries
// attemptSchema.index({ user: 1, attemptType: 1 });
// attemptSchema.index({ test: 1, user: 1 });

// module.exports = mongoose.model('Attempt', attemptSchema);






const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attemptType: {
    type: String,
    enum: ['DPP_TEST', 'NEET_MOCK', 'PYQ', 'DPP', 'CHAPTERWISE'],
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  responses: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    selectedOption: Number,
    isCorrect: Boolean,
    timeSpent: Number,
    isMarkedForReview: {
      type: Boolean,
      default: false
    }
  }],
  score: {
    totalMarks: Number,
    obtainedMarks: Number,
    correctAnswers: Number,
    wrongAnswers: Number,
    unattempted: Number,
    accuracy: Number
  },
  totalTimeSpent: Number,
  attemptNumber: {
    type: Number,
    required: true
  },
  isFirstAttempt: {
    type: Boolean,
    default: true
  },
  analytics: {
    weakSubjects: [String],
    strongSubjects: [String],
    weakTopics: [String],
    strongTopics: [String],
    weakChapters: [String],
    strongChapters: [String],
    subjectWiseAnalysis: [{
      subject: String,
      totalQuestions: Number,
      attempted: Number,
      correct: Number,
      wrong: Number,
      unattempted: Number,
      totalTimeSpent: Number,
      accuracy: Number,
      averageTimeSpent: Number
    }],
    // NEW: Add chapterWiseAnalysis
    chapterWiseAnalysis: [{
      chapter: String,
      subject: String,
      totalQuestions: Number,
      attempted: Number,
      correct: Number,
      wrong: Number,
      unattempted: Number,
      totalTimeSpent: Number,
      accuracy: Number,
      averageTimeSpent: Number
    }]
  },
  predictedRank: Number,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

// Indexes for faster queries
attemptSchema.index({ user: 1, attemptType: 1 });
attemptSchema.index({ test: 1, user: 1 });

module.exports = mongoose.model('Attempt', attemptSchema);