import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBFooter,
  MDBCard
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import subheaderImage from '../images/servicesbg.jpg';
import servicesImage1 from '../images/services1.jpg';
import servicesImage2 from '../images/services2.jpg';
import servicesImage3 from '../images/services3.jpg';
import servicesImage4 from '../images/services4.jpg';
import servicesImage5 from '../images/services5.jpg';
import servicesImage6 from '../images/services6.jpg';
import servicesImage7 from '../images/services7.jpg';
import servicesImage8 from '../images/services8.jpg';
import servicesImage9 from '../images/services9.jpg';
import servicesImage10 from '../images/services10.jpg';

import flightsbg from '../images/flightsbg.jpg';
import hotelbg from '../images/hotelbg.jpg';
import passportbg from '../images/passportbg.jpg';
import visabg from '../images/visabg.jpg';

import FlightsDetails from '../components/FlightsDetails';
import HotelDetails from '../components/HotelDetails';
import PassportDetails from '../components/PassportDetails';
import VisaDetails from '../components/VisaDetails';
import ride1 from '../images/ride1.jpg';
import ride2 from '../images/ride2.jpg';
import ride3 from '../images/ride3.jpg';
function ServicesMain() {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('Flights'); 
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);


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
        } else {
            setLoading(false);
        }
    };
    fetchData();
}, [email]);


  // const [flightbg, setFlightbg] = useState(flightsbg);
  // const [hotelbg, setHotelbg] = useState(hotelbg);
  // const [passportbg, setPassportbg] = useState(passportbg);
  // const [visabg, setVisabg] = useState(visabg);

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Header Section */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
  src={logo}
  style={{ width: '200px', cursor: 'pointer' }}  // Added cursor style to indicate it's clickable
  alt="Header Logo"
  onClick={() => navigate('/home-user', { state: { email: user.email }})} 
/>
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/services')}
                    style={{ color: 'rgb(255, 165, 0)' }}  
                >
                    Services
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
               <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
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
                Hi, {user ? user.firstname : 'Guest'}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Subheader Section */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          backgroundImage: `url(${subheaderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          I TRAVELLED WITH TRAVELTAYO
        </div>
      </div>

      {/* Main Content Section: Row of Images with 3 Columns */}
      <MDBContainer className="my-4">
        <MDBRow>
          {/* Column 1 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage1}
              alt="Service 1"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }}
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-portal', { state: { serviceName: 'Tour', email: user.email } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                TOUR PACKAGES
            </button>
          </MDBCol>

          {/* Column 2 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage2}
              alt="Service 2"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/hotel', { state: { email: user.email } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                HOTEL BOOKING
            </button>
          </MDBCol>

          {/* Column 3 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage3}
              alt="Service 3"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/passport', { state: { backgroundImage: passportbg, email: user.email  } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                PASSPORT APPOINTMENT
            </button>
          </MDBCol>

          {/* Column 4 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage4}
              alt="Service 4"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/flight', { state: { serviceName: 'Flight Booking', email: user.email }})}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                FLIGHT BOOKING
            </button>
          </MDBCol>

          {/* Column 5 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage5}
              alt="Service 5"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-portal', { state: { serviceName: 'Ride', email: user.email } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                CAR RENTAL
            </button>
          </MDBCol>

          {/* Column 6 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage6}
              alt="Service 6"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/transfers', { state: { serviceName: 'Airport Transfers' } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                AIRPORT TRANSFERS
            </button>
          </MDBCol>

          {/* Column 7 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage10}
              alt="Service 7"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/visa', { state: { serviceName: 'Visa Services', email: user.email } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                VISA SERVICES
            </button>
          </MDBCol>

          {/* Column 8 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage9}
              alt="Service 8"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/travel', { state: { serviceName: 'Travel Insurance' } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                TRAVEL INSURANCE
            </button>
          </MDBCol>

          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
  <MDBCardImage
    src={servicesImage8}
    alt="Service 9"
    className="img-fluid"
    style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
  />
  <button 
    type="button" 
    className="btn btn-primary"
    onClick={() => navigate('/services-portal', { state: { serviceName: 'Educational Tour', email: user.email } })}
    style={{ 
      fontWeight: 'bold',
      fontSize: '14px', 
      width: '80%', 
      borderRadius: '30px', 
      backgroundColor: 'rgb(255, 165, 0)', 
      border: 'none', 
      padding: '10px 20px' 
    }}
  >
    EDUCATIONAL TOUR
  </button>
</MDBCol>

          {/* Column 10 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage7}
              alt="Service 10"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/mice', { state: { serviceName: 'Special Services', email: user.email } })}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                MICE
            </button>
          </MDBCol>

        </MDBRow>
      </MDBContainer>

      {/* Footer Section */}
      <MDBFooter bgColor="white" className="text-center text-lg-start mt-auto">
        <div className="text-center p-3">
          © 2024 TravelTayo. All rights reserved.
        </div>
      </MDBFooter>
    </div>
  );
}

export default ServicesMain;
