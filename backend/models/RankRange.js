const mongoose = require('mongoose');

const rankRangeSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  marksRangeStart: {
    type: Number,
    required: true
  },
  marksRangeEnd: {
    type: Number,
    required: true
  },
  rankRangeStart: {
    type: Number,
    required: true
  },
  rankRangeEnd: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST'],
    default: 'General'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Composite index for rank prediction
rankRangeSchema.index({ 
  year: 1, 
  marksRangeStart: 1, 
  marksRangeEnd: 1,
  category: 1 
});

module.exports = mongoose.model('RankRange', rankRangeSchema);
