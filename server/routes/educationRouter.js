/* Import statement for modules */
const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

/* Provides routing for the ride functions */
router.get('/get-all-educs', educationController.getAllEducations);
router.get('/get-educ-by-id/:id', educationController.getEducById);

module.exports = router;
