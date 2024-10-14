const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    pickupLocation: {
        type: String,
        required: false
    },
    dropOffLocation: {
        type: String,
        required: false
    },
    numOfPerson: {
        type: Number,
        required: false
    },
    vehicleName: {
        type: String,
        required: false
    },
    remarks: {
        type: String
    },
    status: {
        type: String
    },
    num: {
        type: Number,
    },
    type: {
        type: String
    },
    db: {
        type: String
    }
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
