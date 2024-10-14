import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import headerImage from '../images/header.jpg';
import './Signup3.css'; 

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type, firstname } = location.state || {};  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is empty
    if (!otp) {
      setErrors({ otp: 'Enter 6-digit code' });
      return; // Prevent submission if OTP is empty
    }

    // Check if OTP is exactly 6 digits
    if (otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits long' });
      return; // Prevent submission if OTP is not 6 digits
    }

    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { email, otp });

      if (response.status === 200) {
        alert('OTP verified successfully!');
        if (type === 'user') {
          navigate(`/profile`, { state: { email } });
        } else {
          navigate(`/admin`, { state: { name: firstname } });
        }
      }
    } catch (error) {
      setErrors({ otp: 'Invalid or expired OTP' });
    }
  };

  return (
    <div className="signup-container"> {/* Reusing signup-container for layout */}
      <form className="signup-form" onSubmit={handleOtpSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>

        <input
          type="text"
          placeholder="Enter OTP"
          className="input-field full-width-email" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {errors.otp && <p className="error-message">{errors.otp}</p>}

        <button type="submit" className="signup-button full-width">Verify OTP</button>
      </form>
    </div>
  );
};

export default Otp;
