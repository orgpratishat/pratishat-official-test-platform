const mongoose = require('mongoose');

const pyqSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  examName: {
    type: String,
    default: 'NEET'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }],
  totalMarks: Number,
  duration: Number,
  markingScheme: {
    positiveMarks: Number,
    negativeMarks: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for year
pyqSchema.index({ year: -1 });

module.exports = mongoose.model('PYQ', pyqSchema);
