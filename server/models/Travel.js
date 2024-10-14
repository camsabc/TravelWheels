const mongoose = require('mongoose');
const TravelSchema = new mongoose.Schema({    
    t_fname: {
        type: String
    },
    t_lname: {
        type: String
    },
   
    t_email: {
        type: String
    },
    t_password: {
        type: String
    },
    t_password2: {
        type: String
    },
    t_verified: {
        type: Boolean, default: false
    },
    profileImage: String // Add this line

});
const TravelModel = mongoose.model('Travel', TravelSchema);
module.exports = TravelModel;