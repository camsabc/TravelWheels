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

import pack1 from '../../images/pack1.jpg';
import pack2 from '../../images/pack2.jpg';
import pack3 from '../../images/pack3.jpg';
import pack4 from '../../images/pack4.jpg';
import pack5 from '../../images/pack5.jpg';
import pack6 from '../../images/pack6.jpg';

function ServicesPackGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);

  const [packs, setPacks] = useState([]);

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
  
  

  const getImageForPack = (picsValue) => {
    switch (picsValue) {
      case 1:
        return pack1;
      case 2:
        return pack2;
      case 3:
        return pack3;
      case 4:
        return pack4;
      case 5:
        return pack5;
      case 6:
        return pack6;
    default:
        return null; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const packsResponse = await fetch(`http://localhost:3000/api/packs/get-all-packs`);
                const packsData = await packsResponse.json();
                if (packsData.error) {
                    setError(packsData.error);
                } else {
        
                    setPacks(packsData);
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
            TOUR PACKAGES
          </MDBTypography>

          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '10px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

         <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            DOMESTIC TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(0, 3).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
          </MDBCard>



          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '20px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

            <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            INTERNATIONAL TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(3, 6).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
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

export default ServicesPackGuest;
