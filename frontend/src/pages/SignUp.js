// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Signup3.css'
import headerImage from '../images/header.jpg';

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = {};

    // Validate form fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      errors.general = 'All fields are required';
      formIsValid = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
      formIsValid = false;
    }
    if (password && !/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
      errors.password = 'Password must be at least 6 characters long and include both letters and numbers';
      formIsValid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }

    setErrors(errors);

    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:3000/signup', {
          firstname,
          lastname,
          email,
          password,
          type,
        });

        if (response.status === 201) {
          alert('User registered successfully! An OTP has been sent to your email.');
          navigate('/otp', { state: { email, type, firstname } }); 
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
          setErrors({ email: 'This email is already registered. Please use a different email.' });
        } else {
          console.error('Error during signup:', error);
          alert('An error occurred while submitting the form.');
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Logo" className="logo-image" />
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}

        <div className="input-group">
          <input
            type="text"
            placeholder="First name"
            className="input-field half-width"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            className="input-field half-width"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="input-field full-width-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="input-field half-width"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field half-width-signup"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button type="submit" className="signup-button full-width">Sign Up</button>

        <p className='ps'>
          Already have an account? <a href="/" className="href">Sign In.</a>
        </p>
        <p className='ps'>
          By clicking Sign Up, you agree to our <a href="/terms" className="href">Terms of Service</a> and <a href="/privacy" className="href">Privacy Statement</a>.
        </p>
      </form>
    </div>
  );
};

export default SignUp;
