// const mongoose = require('mongoose');

// const testSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Test name is required']
//   },
//   type: {
//     type: String,
//     enum: ['DPP_TEST', 'NEET_MOCK'],
//     required: [true, 'Test type is required']
//   },
//   scheduledDate: {
//     type: Date,
//     required: [true, 'Scheduled date is required']
//   },
//   startTime: {
//     type: Date,
//     required: [true, 'Start time is required']
//   },
//   endTime: {
//     type: Date,
//     required: [true, 'End time is required']
//   },
//   duration: {
//     type: Number,
//     required: [true, 'Duration is required (in minutes)']
//   },
//   questions: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Question',
//     required: true
//   }],
//   markingScheme: {
//     totalMarks: {
//       type: Number,
//       required: true
//     },
//     positiveMarks: {
//       type: Number,
//       required: true
//     },
//     negativeMarks: {
//       type: Number,
//       required: true,
//       default: 0
//     }
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Index for faster queries
// testSchema.index({ type: 1, scheduledDate: 1 });

// module.exports = mongoose.model('Test', testSchema);



const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Test name is required']
  },
  type: {
    type: String,
    enum: ['DPP_TEST', 'NEET_MOCK'],
    required: [true, 'Test type is required']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required (in minutes)']
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }],
  markingScheme: {
    totalMarks: {
      type: Number,
      required: true
    },
    positiveMarks: {
      type: Number,
      required: true
    },
    negativeMarks: {
      type: Number,
      required: true,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // NEW: Server timer fields
  serverTimerEnabled: {
    type: Boolean,
    default: true
  },
  testSessions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ['active', 'completed', 'auto-submitted'],
      default: 'active'
    },
    lastSavedAnswers: Object,
    lastActivity: Date
  }],
  createdAt: {
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

// Index for faster queries
testSchema.index({ type: 1, scheduledDate: 1 });

module.exports = mongoose.model('Test', testSchema);