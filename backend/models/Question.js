// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   subject: {
//     type: String,
//     required: [true, 'Subject is required'],
//     enum: ['Physics', 'Chemistry', 'Biology']
//   },
//   chapter: {
//     type: String,
//     required: [true, 'Chapter is required']
//   },
//   // topic: {
//   //   type: String,
//   //   required: [true, 'Topic is required']
//   // },
//    topics: {
//     type: [String],
//     required: [true, 'At least one topic is required'],
//     validate: {
//       validator: function(topics) {
//         return topics && topics.length > 0;
//       },
//       message: 'At least one topic is required'
//     }
//   },
//   difficulty: {
//     type: String,
//     enum: ['Easy', 'Medium', 'Hard'],
//     required: [true, 'Difficulty level is required']
//   },
//   questionText: {
//     type: String,
//     required: [true, 'Question text is required']
//   },
//   questionImage: {
//     type: String
//   },
//   options: [{
//     optionText: {
//       type: String,
//       required: true
//     },
//     optionImage: String,
//     isCorrect: {
//       type: Boolean,
//       required: true,
//       default: false
//     }
//   }],
//   hint: {
//     text: String,
//     image: String
//   },
//   approach: {
//     text: String,
//     image: String
//   },
//   solution: [{
//     stepNumber: Number,
//     stepText: String,
//     stepImage: String
//   }],
//   year: {
//     type: Number
//   },
//    exam: {
//     type: String
//   },
//   analytics: {
//     averageTime: {
//       type: Number,
//       default: 0
//     },
//     bestTime: {
//       type: Number,
//       default: 0
//     },
//     worstTime: {
//       type: Number,
//       default: 0
//     },
//     totalAttempts: {
//       type: Number,
//       default: 0
//     }
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

// // Indexes for faster queries
// questionSchema.index({ subject: 1, chapter: 1, topic: 1 });
// questionSchema.index({ year: 1 });
// questionSchema.index({ difficulty: 1 });

// module.exports = mongoose.model('Question', questionSchema);


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['Physics', 'Chemistry', 'Biology']
  },
  chapter: {
    type: String,
    required: [true, 'Chapter is required']
  },
  topics: {
    type: [String],
    required: [true, 'At least one topic is required'],
    validate: {
      validator: function(topics) {
        return topics && topics.length > 0;
      },
      message: 'At least one topic is required'
    }
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty level is required']
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  questionImage: {
    type: String
  },
  options: [{
    optionText: {
      type: String,
      required: true
    },
    optionImage: String,
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    }
  }],
  hint: {
    text: String,
    image: String
  },
  approach: {
    text: String,
    image: String
  },
  solution: [{
    stepNumber: Number,
    stepText: String,
    stepImage: String
  }],
  year: {
    type: Number
  },
  exam: {
    type: String
  },
  // Created by field referencing your User model
  createdBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References your User model
      required: [true, 'User ID is required']
    },
    username: { // Using 'username' to match your User model field
      type: String,
      required: [true, 'Username is required']
    }
    // Note: Using 'username' instead of 'userName' to match your User model
  },
  analytics: {
    averageTime: {
      type: Number,
      default: 0
    },
    bestTime: {
      type: Number,
      default: 0
    },
    worstTime: {
      type: Number,
      default: 0
    },
    totalAttempts: {
      type: Number,
      default: 0
    }
  },
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

// Indexes for faster queries
questionSchema.index({ subject: 1, chapter: 1, topics: 1 });
questionSchema.index({ topics: 1 });
questionSchema.index({ year: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ 'createdBy.userId': 1 }); // Index for user queries

module.exports = mongoose.model('Question', questionSchema);