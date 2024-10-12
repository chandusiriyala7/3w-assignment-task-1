// controllers/userController.js

const User = require('../models/User');

// Handle user submission
exports.submitUser = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map((file) => file.path);  // Get image paths from multer

    const user = new User({
      name,
      socialHandle,
      images,
    });

    await user.save();

    res.status(201).json({ message: "User submission successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
