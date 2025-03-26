const mongoose = require('mongoose');

const CacheSchema = new mongoose.Schema({
  tosKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.CACHE_EXPIRATION_DAYS * 24 * 60 * 60 // Convert days to seconds
  }
});

module.exports = mongoose.model('Cache', CacheSchema);