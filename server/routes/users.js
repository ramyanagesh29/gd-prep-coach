const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Attempt = require('../models/Attempt');
const protect = require('../middleware/auth');
const { calculateStreak, calculateWeekProgress } = require('../utils/streak');

// GET /api/users/dashboard
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const attempts = await Attempt.find({ userId: req.userId })
      .populate('topicId', 'title')
      .sort({ createdAt: -1 });

    const attemptDates = attempts.map((a) => a.createdAt);
    const streak = calculateStreak(attemptDates);
    const { weekProgress, behindPace } = calculateWeekProgress(attemptDates, user.weeklyGoal);

    const recentAttempts = attempts.slice(0, 5).map((a) => ({
      _id: a._id,
      topicTitle: a.topicId?.title || 'Unknown topic',
      score: a.score,
      createdAt: a.createdAt,
    }));

    res.status(200).json({
      streak,
      weeklyGoal: user.weeklyGoal,
      weekProgress,
      behindPace,
      recentAttempts,
    });
  } catch (err) {
    console.error('Dashboard fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// PUT /api/users/goal
router.put('/goal', protect, async (req, res) => {
  try {
    const { weeklyGoal } = req.body;

    if (!Number.isInteger(weeklyGoal) || weeklyGoal < 1 || weeklyGoal > 14) {
      return res.status(400).json({ error: 'weeklyGoal must be a whole number between 1 and 14' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { weeklyGoal },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ weeklyGoal: user.weeklyGoal });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

module.exports = router;