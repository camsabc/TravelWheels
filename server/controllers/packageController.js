const PackageModel = require('../models/Package');

/* This function retrieves all packs in the database */
const getAllPackages = (req, res) => {
    PackageModel.find({})
        .then(packs => res.json(packs))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch packs' });
        });
};


/* This function retrieves one pack using a unique id */
const getPackById = (req, res) => {
    const { id } = req.params;

    PackageModel.findById(id)
        .then(pack => {
            if (!pack) {
                return res.status(404).json({ error: 'Pack not found' });
            }
            res.json(pack);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch pack' });
        });
};

module.exports = {
    getAllPackages,
    getPackById 
};
