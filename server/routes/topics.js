const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const protect = require('../middleware/auth');

// GET /api/topics - list all topics, optional category filter
router.get('/', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const topics = await Topic.find(filter).sort({ createdAt: -1 });
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

// GET /api/topics/:id - get single topic
router.get('/:id', protect, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.status(200).json(topic);
  } catch (err) {
    res.status(404).json({ error: 'Topic not found' });
  }
});

module.exports = router;