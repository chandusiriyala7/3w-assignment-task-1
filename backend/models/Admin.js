const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String // Should be hashed in real application
});

module.exports = mongoose.model('Admin', adminSchema);
