const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');
const Topic = require('../models/Topic');
const protect = require('../middleware/auth');
const analyzeResponse = require('../services/analyzeResponse');
const { isValidObjectId, isValidResponseText, MAX_RESPONSE_LENGTH } = require('../utils/validators');

// POST /api/attempts - submit a response, trigger AI analysis
router.post('/', protect, async (req, res, next) => {
  try {
    const { topicId, responseText, inputMethod } = req.body;

    if (!topicId || !isValidObjectId(topicId)) {
      return res.status(400).json({ error: 'A valid topicId is required' });
    }
    if (!isValidResponseText(responseText)) {
      return res.status(400).json({ error: `Response must be between 1 and ${MAX_RESPONSE_LENGTH} characters` });
    }
    if (!['text', 'voice'].includes(inputMethod)) {
      return res.status(400).json({ error: 'inputMethod must be "text" or "voice"' });
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    const attempt = await Attempt.create({
      userId: req.userId,
      topicId,
      responseText: responseText.trim(),
      inputMethod,
    });

    try {
      const analysis = await analyzeResponse(topic.title, topic.description, responseText.trim());
      attempt.score = analysis.score;
      attempt.feedback = {
        clarity: analysis.clarity,
        structure: analysis.structure,
        relevance: analysis.relevance,
        assertiveness: analysis.assertiveness,
        overallFeedback: analysis.overallFeedback,
        improvementTips: analysis.improvementTips,
      };
      await attempt.save();

      return res.status(201).json(attempt);
    } catch (aiError) {
      console.error('AI analysis failed:', aiError.message);
      return res.status(502).json({
        error: 'Analysis failed. Your response was saved — you can try analyzing it again.',
        attemptId: attempt._id,
      });
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/attempts/history - list logged-in user's past attempts
router.get('/history', protect, async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ userId: req.userId })
      .populate('topicId', 'title category')
      .sort({ createdAt: -1 })
      .limit(200);

    const formatted = attempts.map((a) => ({
      _id: a._id,
      topicId: a.topicId?._id,
      topicTitle: a.topicId?.title || 'Unknown topic',
      score: a.score,
      createdAt: a.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
});

// GET /api/attempts/:id - get full detail of one attempt
router.get('/:id', protect, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid attempt ID' });
    }

    const attempt = await Attempt.findById(req.params.id).populate('topicId', 'title category description');

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }
    if (attempt.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to view this attempt' });
    }

    res.status(200).json(attempt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;