// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialHandle: {
    type: String,
    required: true,
  },
  images: [String], // Array of image paths
});

module.exports = mongoose.model('User', UserSchema);
