const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store the images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Naming convention for image
  },
});

const upload = multer({ storage });

// Route to handle user submission with multiple image uploads
router.post('/submit', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const imagePaths = req.files.map(file => file.filename); // Extract image filenames

    // Create a new User with image paths
    const newUser = new User({
      name,
      socialHandle,
      images: imagePaths, // Store the image filenames in MongoDB
    });

    await newUser.save();
    res.status(201).json({ message: 'Submission successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
});

module.exports = router;
