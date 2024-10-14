import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn
} from 'mdb-react-ui-kit';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBFooter,
} from 'mdb-react-ui-kit';

import flightsbg from '../images/flightsbg.jpg';
import hotelbg from '../images/hotelbg.jpg';
import passportbg from '../images/passportbg.jpg';
import visabg from '../images/visabg.jpg';
import logo from '../images/header.jpg';

function FlightsDetails() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [bookingDetails, setBookingDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    airportDeparture: '',
    airportArrival: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Flights'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/bookings/create-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
            return;
        }

        alert('Booking created successfully!');
        navigate('/profile', { state: { email: user.email } });
    } catch (err) {
        console.error('Error creating booking:', err);
        setError('Failed to create booking.');
    }
};

const handleQuotationSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/quotations/create-quotation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
            return;
        }

        alert('Quotation request submitted successfully!');
        navigate('/profile', { state: { email: user.email } });
    } catch (err) {
        console.error('Error creating quotation:', err);
        setError('Failed to submit quotation request.');
    }
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

  // Conditional rendering based on loading state
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
    <>
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

        <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
          <MDBNavbarLink 
              onClick={() => navigate('/services', { state: { email: user.email }})}
              style={{ color: 'rgb(255, 165, 0)' }}  
          >
              Services
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/inquiry')}>Inquiry</MDBNavbarLink>
        </MDBNavbarItem>
        <span
          onClick={() => navigate('/profile', { state: { email: user.email } })}
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
    <div className="d-flex flex-column min-vh-100" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}>
      {/* Main Content Section */}
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
            FLIGHT BOOKING
      </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-center mb-5">Kindly complete the details below:</MDBTypography>
            <form>

            <MDBTypography tag="h6" className="text-start mb-3" style={{fontWeight: 'bold'}}>General Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                    <input
                        id="lastname"
                        name="lastname"  
                        type="text"
                        placeholder="Last Name"
                        value={bookingDetails.lastname}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)', 
                            borderRadius: '15px', 
                            boxShadow: 'none', 
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%',
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        value={bookingDetails.firstname}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none', 
                            padding: '10px',
                            backgroundColor: 'transparent',
                            width: '100%',
                        }}
                    />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                    <input
                        id="middlename"
                        name="middlename" 
                        type="text"
                        placeholder="Middle Name"
                        value={bookingDetails.middlename}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none', 
                            padding: '10px', 
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <input
                        id="email"
                        name="email"  
                        type="email"
                        placeholder="Email"
                        value={bookingDetails.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px',
                            boxShadow: 'none',
                            padding: '10px', 
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                    <input
                        id="contactNumber"
                        name="contactNumber" 
                        type="text"
                        placeholder="Contact Number"
                        value={bookingDetails.contactNumber}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>

                <MDBCol md="6" className="text-end">
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        style={{ 
                            fontWeight: 'bold',
                            width: '30%', 
                            borderRadius: '30px', 
                            backgroundColor: 'rgb(255, 165, 0)', 
                            border: 'none', 
                            padding: '10px 20px' 
                        }}
                        onClick={() => {}} 
                    >
                        ADD PAX
                    </button>
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Travel Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                    <input
                        id="startDate"
                        name="startDate" 
                        type="date"
                        placeholder="Start Date"
                        value={bookingDetails.startDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <input
                        id="endDate"
                        name="endDate" 
                        type="date"
                        placeholder="End Date"
                        value={bookingDetails.endDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                    <input
                        id="airportDeparture"
                        name="airportDeparture" 
                        type="text"
                        placeholder="Airport Departure"
                        value={bookingDetails.airportDeparture}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <input
                        id="airportArrival"
                        name="airportArrival" 
                        type="text"
                        placeholder="Airport Arrival"
                        value={bookingDetails.airportArrival}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '10px',
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                    />
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Other remarks/requests:</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                    <input
                    id="remarks"
                    name="remarks"
                    type="text"
                    value={bookingDetails.remarks}
                    placeholder='Remarks'
                    onChange={handleChange}
                    className="form-control"
                    style={{
                        border: '2px solid rgb(250, 207, 32)',
                        borderRadius: '15px', 
                        boxShadow: 'none',
                        padding: '15px', 
                        backgroundColor: 'transparent', 
                        width: '100%', 
                        marginBottom: '10px'
                    }}
                    />
                </MDBCol>
                <MDBCol md="6" className="d-flex align-items-center">
                <button 
                type="button" 
                className="btn btn-primary"
                style={{ 
                    marginRight: '10px', 
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px',
                    fontWeight: 'bold',
                }}
                onClick={handleBookingSubmit} 
            >
                BOOK NOW
            </button>

            <button 
                type="button" 
                className="btn btn-primary"
                style={{ 
                    fontWeight: 'bold',
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
                onClick={handleQuotationSubmit} 
            >
                REQUEST QUOTATION
            </button>

                </MDBCol>

                </MDBRow>

                <MDBRow className='mt-4' style={{paddingLeft: '50px'}}>
                    Note: When requesting quotation, no need to input details of companion. It’s only needed when booking. 
                </MDBRow>

            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
    </>
  );
}

export default FlightsDetails;
