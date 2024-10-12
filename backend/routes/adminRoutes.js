const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();

// Get all user submissions without authentication
router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
