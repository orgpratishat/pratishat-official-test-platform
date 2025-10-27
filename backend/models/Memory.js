// const mongoose = require('mongoose');

// const memorySchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   question: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Question',
//     required: true
//   },
//   test: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Test'
//   },
//   attempt: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Attempt',
//     required: true
//   },
//   attemptType: {
//     type: String,
//     enum: ['DPP_TEST', 'NEET_MOCK'],
//     required: true
//   },
//   userAnswer: Number,
//   correctAnswer: Number,
//   attemptNumber: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Indexes for faster queries
// memorySchema.index({ user: 1, question: 1 });
// memorySchema.index({ user: 1, attemptType: 1 });

// module.exports = mongoose.model('Memory', memorySchema);



const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  },
  attempt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attempt',
    required: true
  },
  attemptType: {
    type: String,
    enum: ['DPP_TEST', 'NEET_MOCK'],
    required: true
  },
  userAnswer: Number,
  correctAnswer: Number,
  attemptNumber: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound unique index to ensure one memory record per user per question
memorySchema.index({ user: 1, question: 1 }, { unique: true });

// Other indexes for faster queries
memorySchema.index({ user: 1, attemptType: 1 });
memorySchema.index({ user: 1, createdAt: -1 });
memorySchema.index({ question: 1 });

module.exports = mongoose.model('Memory', memorySchema);