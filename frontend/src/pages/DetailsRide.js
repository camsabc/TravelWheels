import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import ride1 from '../images/ride1.jpg';
import ride2 from '../images/ride2.jpg';
import ride3 from '../images/ride3.jpg';
import bg from '../images/bg.jpg';

function DetailsRide() {
  const [user, setUser] = useState(null);
  const [ride, setRide] = useState(null);
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
    pickupLocation: '',
    dropOffLocation: '',
    numOfPerson: '',
    vehicleName: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Vechicle Rental'
  });

  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

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
        if (email) {
          const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();
          if (userData.error) {
            setError(userData.error);
            return;
          }
          setUser(userData);
          setBookingDetails(prevDetails => ({
            ...prevDetails,
            firstname: userData.firstname,
            middlename: userData.middlename,
            lastname: userData.lastname,
            email: userData.email
          }));
        }

        const rideResponse = await fetch(`http://localhost:3000/api/rides/get-ride-by-id/${id}`);
        const rideData = await rideResponse.json();
        if (rideData.error) {
          setError(rideData.error);
          return;
        }
        setRide(rideData);
        setBookingDetails(prevDetails => ({
          ...prevDetails,
          vehicleName: rideData.name,
        }));

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, email]);

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



  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
<div
  className="d-flex flex-column min-vh-100"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: '#eee',
  }}
>



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
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email } })}>Services</span>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email } })}
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
      <MDBTypography 
        tag="h1" 
        className="text-center mb-3 mt-4" 
        style={{
            fontWeight: 'bolder', 
            color: 'white', 
            fontSize: '60px', 
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
        }}
        >
        CAR RENTALS
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
                        id="middleName"
                        name="middleName"
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
                        id="pickupLocation"
                        name="pickupLocation"
                        type="text"
                        placeholder="Pickup Location"
                        value={bookingDetails.pickupLocation}
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
                        id="dropOffLocation"
                        name="dropOffLocation"
                        type="text"
                        placeholder="Dropoff Location"
                        value={bookingDetails.dropOffLocation}
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
                        id="numOfPerson"
                        name="numOfPerson"
                        type="number"
                        placeholder="Number of Person"
                        value={bookingDetails.numOfPerson}
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
                        id="vehicleName"
                        name="vehicleName"
                        type="text"
                        value={"VEHICLE: " + bookingDetails.vehicleName}
                        onChange={handleChange}
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

            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default DetailsRide;
