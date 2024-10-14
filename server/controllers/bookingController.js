const BookingModel = require('../models/Booking');

/* This function retrieves all bookings in the database */
const getAllBookings = (req, res) => {
    BookingModel.find({})
        .then(bookings => res.json(bookings))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch bookings' });
        });
};

/* This function retrieves bookings using a unique email */
const getBookingByEmail = (req, res) => {
    const email = req.params.email;

    BookingModel.find({ email })
        .then(bookings => {
            if (bookings.length === 0) {
                return res.json({ });
            }
            res.json(bookings);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch bookings by email' });
        });
};

/* This function creates a booking to be stored in the database */
const createBooking = (req, res) => {
    const {
        firstname, middlename, lastname, email, contactNumber, startDate, endDate,
        pickupLocation, dropOffLocation, numOfPerson, vehicleName, remarks, status, type
    } = req.body;

    /* Generates a random nine-digit number */
    const generateRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000);

    const newBooking = new BookingModel({
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        num: generateRandomNumber(), 
        type,
        db: 'booking'
    });

    newBooking.save()
        .then(savedBooking => res.status(201).json(savedBooking))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create booking' });
        });
};

/* This function retrieves one booking using a unique id */
const getBookingById = (req, res) => {
    const id = req.params.id;

    BookingModel.findById(id)
        .then(booking => {
            if (!booking) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            res.json(booking);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch booking by ID' });
        });
};

/* Changes the status of a particular booking using unique id */
const changeStatus = (req, res) => {
    const { bookingId, status } = req.body;

    BookingModel.findByIdAndUpdate(bookingId, { status }, { new: true })
        .then(updatedBooking => {
            if (!updatedBooking) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            res.json(updatedBooking);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change status' });
        });
};

module.exports = {
    getAllBookings,
    getBookingByEmail,
    createBooking,
    getBookingById,
    changeStatus 
};

