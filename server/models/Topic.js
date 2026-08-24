const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Current Affairs', 'Abstract', 'Case Study', 'Social Issues'],
  },
  description: {
    type: String,
    required: true,
  },
  aiGenerated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Topic', topicSchema);