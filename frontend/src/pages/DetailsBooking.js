import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBTypography,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../images/header.jpg';

function DetailsBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email, index } = location.state || {}; 
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) {
    
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);
         
            return fetch(`http://localhost:3000/api/bookings/get-all-bookings-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setBookings(data);
        
            if (id) {
              return fetch(`http://localhost:3000/api/bookings/get-booking-by-id/${id}`);
            }
          }
          setLoading(false);
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setBookingDetails(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, email]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#eee', fontFamily: "'Poppins', sans-serif" }}>
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
                <MDBNavbarLink>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Inquiry</MDBNavbarLink>
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
        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', paddingBottom: '10px', color: 'rgb(61, 132, 185)' }}>UPCOMING BOOKINGS</h2>
          <hr style={{ width: '100%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        {/* Booking Details Card */}
        {bookingDetails && (
          <MDBCard className="w-100" style={{ overflowX: 'auto', backgroundColor: 'rgb(255, 222, 89)' }}>
            <MDBCardBody>
              <MDBTypography tag="h2" className="text-center mb-4" style={{ fontWeight: 'bold', color: 'white' }}>
                BOOKING #{index + 1}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                VEHICLE RENTAL
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                LAST NAME: {bookingDetails.lastname} <br />
                FIRST NAME: {bookingDetails.firstname} <br />
                MIDDLE NAME: {bookingDetails.middlename} <br />
                EMAIL: {bookingDetails.email} <br />
                CONTACT NUMBER: {bookingDetails.contactNumber} <br />
              </MDBTypography>

              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                TRAVEL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                BOOKING START DATE: {new Date(bookingDetails.startDate).toLocaleDateString()} <br />
                BOOKING END DATE: {new Date(bookingDetails.endDate).toLocaleDateString()} <br />
                TIME OF PICKUP: {new Date(bookingDetails.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} <br />
                PICKUP LOCATION: {bookingDetails.pickupLocation} <br />
                DROP-OFF LOCATION: {bookingDetails.dropOffNumber} <br />
                VEHICLE NAME: {bookingDetails.vechicleName} <br />
                NUMBER OF PERSONS: {bookingDetails.numOfPerson} <br />
                REMARKS: {bookingDetails.remarks} <br />
                STATUS: {bookingDetails.status} <br />
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        )}

        {/* Floating Button */}
        <MDBBtn
            floating
            color="primary"
            className="position-fixed"
            style={{ bottom: '50px', right: '110px', borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'white' }} // Increased button size
            onClick={() => navigate(-1)}
        >
            <i className="fas fa-arrow-left" style={{ fontSize: '24px', color: 'rgb(255, 222, 89)' }}></i> 
        </MDBBtn>

      </MDBContainer>
    </div>
  );
}

export default DetailsBooking;
