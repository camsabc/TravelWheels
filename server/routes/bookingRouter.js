/* Import statement for modules */
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

/* Provides routing for the booking functions */
router.get('/get-all-bookings', bookingController.getAllBookings);
router.get('/get-all-bookings-by-email/:email', bookingController.getBookingByEmail);
router.get('/get-booking-by-id/:id', bookingController.getBookingById);
router.post('/create-booking', bookingController.createBooking);

router.post('/change-status', bookingController.changeStatus);

module.exports = router;
