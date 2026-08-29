function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Invalid data provided' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'A record with this value already exists' });
  }

  res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = { notFound, errorHandler };