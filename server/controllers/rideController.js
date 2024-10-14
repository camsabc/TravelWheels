const RideModel = require('../models/Ride');

/* This function retrieves all rides in the database */
const getAllRides = (req, res) => {
    RideModel.find({})
        .then(rides => res.json(rides))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch rides' });
        });
};

/* This function creates a ride to be stored in the database */
const createRide = (req, res) => {
    const { name, type, seat } = req.body;

    const newRide = new RideModel({
        name,
        type,
        seat
    });

    newRide.save()
        .then(savedRide => res.status(201).json(savedRide))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create ride' });
        });
};

/* This function retrieves one ride using a unique id */
const getRideById = (req, res) => {
    const { id } = req.params;

    RideModel.findById(id)
        .then(ride => {
            if (!ride) {
                return res.status(404).json({ error: 'Ride not found' });
            }
            res.json(ride);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch ride' });
        });
};

module.exports = {
    getAllRides,
    createRide,
    getRideById 
};
