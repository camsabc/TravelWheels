import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';

import {
  MDBContainer,
  MDBCard,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import flightsbg from '../../images/flightsbg.jpg';

import Modal from '../../components/Modal'; 



import ride1 from '../../images/ride1.jpg';
import ride2 from '../../images/ride2.jpg';
import ride3 from '../../images/ride3.jpg';


function ServicesRideGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);

  const [rides, setRides] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmLogin = () => {
    navigate('/login')
  };
  

  const getImageForRide = (picsValue) => {
    switch (picsValue) {
      case 1:
        return ride1;
      case 2:
        return ride2;
      case 3:
        return ride3;
      default:
        return null; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const ridesResponse = await fetch(`http://localhost:3000/api/rides/get-all-rides`);
                const ridesData = await ridesResponse.json();
                if (ridesData.error) {
                    setError(ridesData.error);
                } else {
                    setRides(ridesData);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch user or rides data.');
            } finally {
                setLoading(false);
            }
    };
    fetchData();
}, []);

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
    onClick={() => navigate('/')} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                      onClick={() => navigate('/services-guest')}
                      style={{ color: 'rgb(255, 165, 0)' }}
                  >
                      Services
                  </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={handleLoginClick}>Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={handleLoginClick}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => {}}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >

              Hi, Guest
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}

          <>
              <MDBTypography 
                tag="h1" 
                className="text-center mt-4" 
                style={{
                  fontWeight: 'bolder', 
                  color: 'white', 
                  fontSize: '60px',
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
                }}
                >
                CAR RENTAL
              </MDBTypography>
          
            <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff', marginTop: '10px', marginBottom: '20px' }}>
            <MDBRow>
              {rides.map((ride) => (
                <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={ride._id}>
                  <div
                    onClick={handleLoginClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <MDBCardImage
                      src={getImageForRide(ride.pics)}
                      position="top"
                      alt={ride.name}
                      style={{ height: '70%', width: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  <div className="d-flex flex-column mx-auto" style={{ width: '70%' }}>
                    <MDBTypography tag="h6" className="text-start mt-3" style={{ fontWeight: 'bold' }}>
                      {ride.name}
                    </MDBTypography>
                    <MDBTypography tag="p" className="text-start">
                      Type: {ride.type} <br />
                      Seats: {ride.seat}
                    </MDBTypography>
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBCard>
          </>

          <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
       />
    </div>
  );
}

export default ServicesRideGuest;
