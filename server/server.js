require('dotenv').config();

/* Import statement for modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Import Nodemailer
const crypto = require('crypto'); // For OTP generation

const UserModel = require('./models/User');

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(cors());

/* Connect to MongoDB */
mongoose.connect('mongodb://127.0.0.1:27017/TravelWheels', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

/* Nodemailer transporter setup */
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'cams.castro03@gmail.com', // Replace with your email
    pass: 'fobe homp ilhh uxvj' // Replace with your app-specific password
  }
});
//
/* Helper function to generate OTP */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

/* Routes */
const userRoutes = require('./routes/userRouter');
const bookingRoutes = require('./routes/bookingRouter');
const rideRoutes = require('./routes/rideRouter');
const quotationRoutes = require('./routes/quotationRouter');
const travelRoutes = require('./routes/travelRouter');
const educationRoutes = require('./routes/educationRouter');
const packageRoutes = require('./routes/packageRouter');

// Sign-up route with OTP
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, type } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      type,
      otp // Store OTP temporarily in the user's document
    });

    await newUser.save();

    const mailOptions = {
      from: 'cams.castro03@gmail.com',  // Replace with your email
      to: email,
      subject: 'Verify your account - OTP',
      text: `Hi ${firstname},\n\nYour OTP code is ${otp}. \n\nBest regards,\nYour Travel Tayo Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).send('User registered, but OTP email could not be sent');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send('User registered successfully! Please check your email for OTP.');
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send('Server error');
  }
});

// OTP verification route
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;


  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    console.log(user.otp)
    console.log(otp)

    // Check if OTP is valid and not expired
    if (user.otp === otp) {
      user.isVerified = true; // Set the user as verified
      user.otp = undefined; // Remove the OTP after verification
      user.otpExpires = undefined;
      await user.save();
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid or expired OTP');
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

/* API Routes */
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/travels', travelRoutes);  // Adding travel routes
app.use('/api/educs', educationRoutes); 
app.use('/api/packs', packageRoutes); 

/* Start the server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
