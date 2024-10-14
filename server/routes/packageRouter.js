/* Import statement for modules */
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

/* Provides routing for the ride functions */
router.get('/get-all-packs', packageController.getAllPackages);
router.get('/get-pack-by-id/:id', packageController.getPackById);

module.exports = router;
