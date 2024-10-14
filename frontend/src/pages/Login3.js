import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login1.css';  // Import the CSS file here

import headerImage from '../images/header.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Check for empty inputs
    if (!email && !password) {
      setError('All inputs are required');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email is invalid');
      return;
    }

    // Validate password complexity
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordValidationRegex.test(password)) {
      setError('Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.status === 200) {
        alert('Login successful!');
        navigate(`/home-user`, { state: { email: email } });
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
          }
          setLoading(false);  
        })
        .catch(err => {
          console.error('Error fetching user:', err);
          setError('Failed to fetch user data.');
          setLoading(false);
        });
    } else {
      setLoading(false);  
    }
  }, [email]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="input-field full-width-emails"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field full-width-emails"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}

        <div className='fp'>        
          <a href="/forgot" className='fp'>Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Sign in</button>

        <p className='ps'>
          Don't have an account yet? <a href="/SignUp" className="href">Sign Up.</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
