// const mongoose = require('mongoose');

// const rankRangeSchema = new mongoose.Schema({
//   year: {
//     type: Number,
//     required: true
//   },
//   marksRangeStart: {
//     type: Number,
//     required: true
//   },
//   marksRangeEnd: {
//     type: Number,
//     required: true
//   },
//   rankRangeStart: {
//     type: Number,
//     required: true
//   },
//   rankRangeEnd: {
//     type: Number,
//     required: true
//   },
//   category: {
//     type: String,
//     enum: ['General', 'OBC', 'SC', 'ST'],
//     default: 'General'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Composite index for rank prediction
// rankRangeSchema.index({ 
//   year: 1, 
//   marksRangeStart: 1, 
//   marksRangeEnd: 1,
//   category: 1 
// });

// module.exports = mongoose.model('RankRange', rankRangeSchema);



const mongoose = require('mongoose');

const rankEntrySchema = new mongoose.Schema({
  marks: {
    type: Number,
    required: true,
    min: 1,
    max: 720
  },
  rank: {
    type: Number,
    required: true
  }
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rankEntries: [rankEntrySchema]
});

const rankRangeSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100
  },
  categories: [categorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique year-category combinations
rankRangeSchema.index({ year: 1 }, { unique: true });

// Update the updatedAt field before saving
rankRangeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('RankRange', rankRangeSchema);
