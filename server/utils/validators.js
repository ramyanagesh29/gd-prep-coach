const mongoose = require('mongoose');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const MAX_RESPONSE_LENGTH = 3000;

function isValidResponseText(text) {
  return typeof text === 'string' && text.trim().length > 0 && text.trim().length <= MAX_RESPONSE_LENGTH;
}

module.exports = { isValidEmail, isValidObjectId, isValidResponseText, MAX_RESPONSE_LENGTH };