const TravelController = require('../controllers/travelController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Changed to public/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for profile update
router.post('/api/profile/update/:id', upload.single('profileImage'), TravelController.updateProfile);

module.exports = router;