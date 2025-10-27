const mongoose = require('mongoose');

const dppSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'DPP title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['Physics', 'Chemistry', 'Biology']
  },
  chapter: {
    type: String,
    required: [true, 'Chapter is required'],
    trim: true
  },
  topics: [{
    type: String,
    trim: true
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }],
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  totalMarks: {
    type: Number,
    required: true
  },
  markingScheme: {
    positiveMarks: {
      type: Number,
      default: 4
    },
    negativeMarks: {
      type: Number,
      default: 1
    }
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
dppSchema.index({ subject: 1, chapter: 1 });
dppSchema.index({ isActive: 1 });

module.exports = mongoose.model('DPP', dppSchema);