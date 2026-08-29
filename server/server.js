require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const topicsRouter = require('./routes/topics');
const authRouter = require('./routes/auth');
const attemptsRouter = require('./routes/attempts');
const usersRouter = require('./routes/users');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Validate required environment variables before starting
const REQUIRED_ENV_VARS = ['MONGO_URI', 'JWT_SECRET', 'GEMINI_API_KEY'];
const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const app = express();

// Allowed origins for CORS — set FRONTEND_URL in production env vars
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json({ limit: '100kb' }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/attempts', attemptsRouter);
app.use('/api/users', usersRouter);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GD Prep Coach API is running' });
});

// 404 and global error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});