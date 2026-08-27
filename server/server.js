require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const topicsRouter = require('./routes/topics');
const authRouter = require('./routes/auth');
const attemptsRouter = require('./routes/attempts');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/attempts', attemptsRouter);
app.use('/api/users', usersRouter);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GD Prep Coach API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});