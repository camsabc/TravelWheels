const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
