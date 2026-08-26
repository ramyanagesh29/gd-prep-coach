const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  responseText: {
    type: String,
    required: true,
    minlength: 1,
  },
  inputMethod: {
    type: String,
    required: true,
    enum: ['text', 'voice'],
  },
  score: {
    type: Number,
    default: null,
    min: 0,
    max: 100,
  },
  feedback: {
    clarity: { type: String, default: null },
    structure: { type: String, default: null },
    relevance: { type: String, default: null },
    assertiveness: { type: String, default: null },
    overallFeedback: { type: String, default: null },
    improvementTips: { type: [String], default: [] },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model('Attempt', attemptSchema);