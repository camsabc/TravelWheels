import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import inquirybg from '../images/inquirybg.jpg';
import map from '../images/map.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

function Inquiry() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Inquiry submitted successfully!');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();

          if (userData.error) {
            setError(userData.error);
          } else {
            setUser(userData);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

if (loading) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h3>Loading...</h3>
    </div>
  );
}

if (error) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h3>{error}</h3>
    </div>
  );
}

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}
    >
      {/* Header Section */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/home-user', { state: { email: user.email }})} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services', { state: { email: user.email }})}>Services</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/inquiry')}
                    style={{ color: 'rgb(255, 165, 0)' }} 
                >
                    Inquiry
                </MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email }})}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {user.firstname}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      <MDBTypography 
        tag="h1" 
        className="text-center mt-5" 
        style={{
            fontWeight: 'bolder', 
            color: 'white', 
            fontSize: '60px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'  
        }}
    >
        CONTACT US
    </MDBTypography>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-4">
        <div className="d-flex justify-content-center">
          <MDBCard style={{ maxWidth: '1200px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
            <MDBCardBody>
              <div className="d-flex justify-content-between mb-4">
                <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', color: 'black' }}>
                  <FaPhone style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} /> GLOBE  0915-262-3898 <br/> GLOBE  0927-893-0271 <br/> GLOBE  0994-639-6953
                </div>
                <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', color: 'black' }}>
                  <FaEnvelope style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} /> info@traveltayoph.com
                </div>
                <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', color: 'black' }}>
                  <FaFacebook style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} /> TravelTayo Car Rental and Tours
                </div>
                <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', color: 'black' }}>
                  <FaInstagram style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} /> Travel Tayo PH
                </div>
              </div>
              {/* Additional text and image below the row */}
              <MDBCardText className="text-center mb-4 mt-5">
                <span style={{ color: 'black', fontWeight: 'bold', marginRight: '5px' }}>
                    ADDRESS
                </span>
                <span style={{ color: 'rgb(255, 165, 0)' }}>
                    {' '}
                    Office Unit 2, Hersyl Building, Blk 5 Lot 25 Phase4, Golden City Subdivision, Brgy. Dila, Santa Rosa, Philippines
                </span>
              </MDBCardText>

              <div className="d-flex justify-content-center mb-4">
                <MDBCardImage src={map} style={{ maxWidth: '100%', height: 'auto' }} alt="Additional Info" />
              </div>

              {/* Contact Form Section */}
              <div className="text-center mt-5">
                <MDBTypography tag="h3" style={{ color: 'rgb(250, 165, 0)', fontWeight: 'bolder' }}>
                  SEND AN INQUIRY
                </MDBTypography>

                {/* Email Address Input */}
                <div className="mb-1">  {/* Add this div for new row */}
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    style={{
                      border: '2px solid rgb(250, 165, 0)',
                      borderRadius: '20px', 
                      boxShadow: 'none',
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%', 
                      maxWidth: '600px', 
                      margin: '10px auto',
                      textAlign: 'center'
                    }}
                  />
                </div>

                {/* Inquiry Textarea */}
                <div className="mb-3"> 
                  <textarea
                    placeholder="Your inquiry here..."
                    rows="4"
                    required
                    style={{
                      border: '2px solid rgb(250, 165, 0)',
                      borderRadius: '20px', 
                      boxShadow: 'none',
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%', 
                      maxWidth: '600px', 
                      margin: '10px auto',
                      textAlign: 'center'
                    }}
                  ></textarea>
                </div>

                <button 
                    type="button" 
                    style={{ 
                        fontWeight: 'bold',
                        width: '20%', 
                        borderRadius: '30px', 
                        backgroundColor: 'rgb(255, 165, 0)', 
                        border: 'none', 
                        padding: '7px 10px',
                        color: 'white'
                    }}
                    onClick={handleSubmit} 
                >
                    Send
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Inquiry;
