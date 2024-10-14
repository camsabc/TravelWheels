const EducationModel = require('../models/Education');

/* This function retrieves all educs in the database */
const getAllEducations = (req, res) => {
    EducationModel.find({})
        .then(educs => res.json(educs))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch educs' });
        });
};


/* This function retrieves one educ using a unique id */
const getEducById = (req, res) => {
    const { id } = req.params;

    EducationModel.findById(id)
        .then(educ => {
            if (!educ) {
                return res.status(404).json({ error: 'Educ not found' });
            }
            res.json(educ);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch educ' });
        });
};

module.exports = {
    getAllEducations,
    getEducById 
};
