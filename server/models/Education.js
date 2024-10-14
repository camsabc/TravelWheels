const mongoose = require('mongoose');

const EducationSchema = mongoose.Schema({
    num: {
        type: String,
        required: true
    },
    pax: {
        type: String,
        required: true
    },
});

const EducationModel = mongoose.model('Education', EducationSchema);

module.exports = EducationModel;
