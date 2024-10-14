import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login1.css';  // Import the CSS file here

import headerImage from '../images/header.jpg';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // To retrieve email from the state

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is valid
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/request-otp', { email });

      if (response.status === 201) {
        alert('OTP sent successfully!');
        // Navigate to OTP verification page or other action
        navigate('/otp', { state: { email } });
      } else {
        setError('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while sending the OTP.');
    }
  };

  return (
    <div className="login-container">
      <form className="otp-form" onSubmit={handleOtpSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>
        
        <h2>Forgot Password</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="text"
          placeholder="Enter Email"
          className="input-field full-width-emails"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');  // Clear error on input change
          }}
        />
        
        <div className='fbtns'>
          <button type="submit" className="otp-button">Send Code</button>
        </div>
      
      </form>
    </div>
  );
};

export default Forgot;
