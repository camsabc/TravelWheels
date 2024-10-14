import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

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

  const handleUpcomingBookingClick = () => {
    if (user) {
      navigate('/upcoming-booking', { state: { email: user.email } });
    }
  };

  const handleQuotationClick = () => {
    if (user) {
      navigate('/quotation', { state: { email: user.email } });
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#eee' }}>
      {/* Header Section */}
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/home-user', { state: { email: user.email }})}
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
            <MDBNavbarItem style={{ margin: '0 15px' }}>
              <span style={{ cursor: 'pointer' }} onClick={ () => navigate('/services', { state: { email: user.email }})}>Services</span>
            </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                  onClick={ () => navigate('/profile', { state: { email: user.email } })}
                  style={{
                    margin: '0 15px',
                    fontSize: '1rem',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  Hi, {user?.firstname}
                </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-5">
        <MDBRow className="h-100">



          {/* Main Card on the Left Side */}
          <MDBCol md="6" xl="4" className="mb-2">
            <MDBCard style={{ borderRadius: '15px', paddingBottom: '20px' }}>
              <MDBCardBody className="text-center" style={{ paddingBottom: '35px' }}>
                <div className="mt-3 mb-4">
                  <MDBIcon icon="circle-user" size="7x" style={{ color: 'rgb(84, 84, 84)' }} className="mb-1" />
                </div>
                <MDBTypography tag="h2" className="mb-3" style={{ fontWeight: 'bolder' }}>
                  {user?.firstname} {user?.lastname}
                </MDBTypography>
                <MDBTypography tag="h5" className="mb-4" style={{ fontWeight: 'bold' }}>
                  {user?.email}
                </MDBTypography>
                <MDBBtn rounded size="lg" onClick={() => navigate('/')} style={{ backgroundColor: 'rgb(255, 165, 0)', width: '200px', fontWeight: 'bold' }}>
                  Log Out
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Mini Cards on the Right Side */}
          <MDBCol md="6" xl="8">
            <MDBRow>
              {/* First Row */}
              <MDBCol md="6" lg="6" className="mb-4">
                <MDBCard style={{ minHeight: '175px', position: 'relative' }}>
                  <MDBCardBody className="d-flex flex-column align-items-center justify-content-center">
                    <MDBIcon icon="calendar-days" size="4x" style={{ color: 'rgb(148, 0, 211)' }} className="mb-3" />
                    <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>Past Transactions</MDBTypography>
                  </MDBCardBody>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '5px', 
                    backgroundColor: 'rgb(148, 0, 211)' 
                  }} />
                </MDBCard>
              </MDBCol>

              <MDBCol md="6" lg="6" className="mb-4">
                <MDBCard style={{ minHeight: '175px', position: 'relative' }} onClick={handleUpcomingBookingClick}>
                  <MDBCardBody className="d-flex flex-column align-items-center justify-content-center">
                    <MDBIcon icon="book" size="4x" style={{ color: 'rgb(61, 132, 185)' }} className="mb-3" />
                    <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>Upcoming Booking</MDBTypography>
                  </MDBCardBody>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '5px', 
                    backgroundColor: 'rgb(61, 132, 185)' 
                  }} />
                </MDBCard>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              {/* Second Row */}
              <MDBCol md="6" lg="6" className="mb-4">
                <MDBCard style={{ minHeight: '175px', position: 'relative' }}>
                  <MDBCardBody className="d-flex flex-column align-items-center justify-content-center">
                    <MDBIcon icon="user-pen" size="4x" style={{ color: 'rgb(14, 161, 72)' }} className="mb-3" />
                    <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>Edit Profile</MDBTypography>
                  </MDBCardBody>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '5px', 
                    backgroundColor: 'rgb(14, 161, 72)' 
                  }} />
                </MDBCard>
              </MDBCol>

              <MDBCol md="6" lg="6" className="mb-4">
                <MDBCard style={{ minHeight: '175px', position: 'relative' }} onClick={handleQuotationClick}>
                  <MDBCardBody className="d-flex flex-column align-items-center justify-content-center">
                    <MDBIcon icon="file-invoice-dollar" size="4x" style={{ color: 'rgb(255, 165, 0)' }} className="mb-3" />
                    <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>Quotations</MDBTypography>
                  </MDBCardBody>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '5px', 
                    backgroundColor: 'rgb(255, 165, 0)' 
                  }} />
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Profile;
