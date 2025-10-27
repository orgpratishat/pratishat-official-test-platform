const mongoose = require('mongoose');

const changeLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
    required: true
  },
  collection: {
    type: String,
    required: true
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  changes: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for queries
changeLogSchema.index({ admin: 1, timestamp: -1 });
changeLogSchema.index({ collection: 1, documentId: 1 });

module.exports = mongoose.model('ChangeLog', changeLogSchema);
