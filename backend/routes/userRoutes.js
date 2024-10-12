// routes/userRoutes.js

const express = require('express');
const multer = require('multer');
const { submitUser } = require('../controllers/userContoller');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route to handle user submission
router.post('/submit', upload.array('images', 10), submitUser);

module.exports = router;
