const mongoose = require('mongoose');
/* const nodemailer = require('nodemailer'); */

// Load environment variables
require('dotenv').config();

// Email configuration
/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}); */

/* transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to take messages');
    }
});
 */
// MongoDB configuration
mongoose.connect('mongodb://localhost:27017/TravelWheels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Established a connection to the database'))
.catch(err => console.log('Something went wrong when connecting to the database ', err));

/* module.exports = transporter; */ // Export email transporter for use in other modules if needed