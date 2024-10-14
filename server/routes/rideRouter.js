/* Import statement for modules */
const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

/* Provides routing for the ride functions */
router.get('/get-all-rides', rideController.getAllRides);
router.get('/get-ride-by-id/:id', rideController.getRideById);
router.post('/create-ride', rideController.createRide);

module.exports = router;
