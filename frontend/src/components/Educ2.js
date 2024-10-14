import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBFooter,
} from 'mdb-react-ui-kit';

import flightsbg from '../images/flightsbg.jpg';
import pic from '../images/pic.png';
import passportbg from '../images/passportbg.jpg';
import visabg from '../images/visabg.jpg';
import logo from '../images/header.jpg';
import ride1 from '../images/ride1.jpg';
import ride2 from '../images/ride2.jpg';
import ride3 from '../images/ride3.jpg';

function Educ2() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(pic);

  // Form states
  const [bookingDetails, setBookingDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    preferredHotel: '',
    budgetRange: '',
    numOfPerson: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Hotel Reservation'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    alert('Booking created successfully!');
  };

  const handleQuotationSubmit = async (e) => {
    e.preventDefault();
    alert('Quotation request submitted successfully!');
  };

  // Helper to get image for each ride
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

  // User and ride data states
  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  const { email } = location.state || {};

  // Fetch user and ride data
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
          setError('Failed to fetch data.');
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
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage src={logo} style={{ width: '200px' }} alt="Header Logo" />
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
                <MDBNavbarLink onClick={() => navigate('/promos')}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry')}>Inquiry</MDBNavbarLink>
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
                Hi, Anthony
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>
      {/* END OF HEADER */}

      {/* Main Content */}
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
        <MDBTypography
          tag="h1"
          className="text-center mt-5"
          style={{
            fontWeight: 'bolder',
            color: 'white',
            fontSize: '60px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          RIDE
        </MDBTypography>

        {/* Rides Section */}
        <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff' }}>
          <MDBRow>
            {rides.map((ride) => (
              <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={ride._id}>
                <div
                  onClick={() => navigate(`/educ1/${ride._id}`, { state: { email: user?.email, rideName: ride.name } })}
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
      </div>
    </>
  );
}

export default Educ2;
