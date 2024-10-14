const mongoose = require('mongoose');

const PackageSchema = mongoose.Schema({
    num: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const PackageModel = mongoose.model('Package', PackageSchema);

module.exports = PackageModel;
