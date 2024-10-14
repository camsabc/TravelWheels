const mongoose = require('mongoose');

const RideSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true
    }
});

const RideModel = mongoose.model('Ride', RideSchema);

module.exports = RideModel;
