import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import flightsbg from '../images/flightsbg.jpg';
import logo from '../images/header.jpg';

function DetailsDomPack() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const { id } = useParams(); 
  const location = useLocation();
  const email = location.state?.email;
  const [user, setUser] = useState(null);
  const [pack, setPack] = useState(null);
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
    dropoffLocation: '',
    numOfPersons: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Flights',
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
      try {
        if (email) {
          const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();
          if (userData.error) {
            setError(userData.error);
            return;
          }
          setUser(userData);
        }

        const packResponse = await fetch(`http://localhost:3000/api/packs/get-pack-by-id/${id}`);
        const packData = await packResponse.json();
        if (packData.error) {
          setError(packData.error);
          return;
        }
        setPack(packData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, email]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h2" style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)' }}>
          Loading...
        </MDBTypography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h4" style={{ fontWeight: 'bold', color: 'red' }}>
          {error}
        </MDBTypography>
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
                  onClick={() => navigate('/services', { state: { email: user.email } })}
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

      {/* Main Content Section */}
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
            {pack.name} {pack.duration}
        </MDBTypography>

        <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">

          <MDBCard
            style={{
              maxWidth: '900px',
              width: '100%',
              marginBottom: '50px',
              backgroundColor: 'rgba(255, 255, 255)',
              padding: '20px',
              borderRadius: '15px',
            }}
          >

            {pack.num === "1" && (
                <div>
                    <MDBTypography tag="h5" className="text-start mb-1 mt-3" style={{paddingLeft: "20px"}}>
                        PACKAGE INCLUSIONS
                    </MDBTypography>
                    <ul style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px"}}>
                        <li> 3D2N HOTEL ACCOMMODATION </li>
                        <li> DAILY BREAKFAST </li>
                        <li> ROUNDTRIP AIRPORT TRANSFER </li>
                        <li> PERMIT AND TAXES </li>
                        <li> ILOILO CITY TOUR </li>
                    </ul>
                </div>
            )}

            {pack.num === "2" && (
                <div>
                    <MDBTypography tag="h5" className="text-start mb-1 mt-3" style={{paddingLeft: "20px"}}>
                        PACKAGE INCLUSIONS
                    </MDBTypography>
                    <ul style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px"}}>
                        <li> 2D1N HOTEL ACCOMMODATION </li>
                        <li> DAILY BREAKFAST </li>
                        <li> ROUNDTRIP AIRPORT TRANSFER </li>
                        <li> PERMIT AND TAXES </li>
                        <li> BAGUIO CITY TOUR </li>
                    </ul>
                </div>
            )}

            {pack.num === "3" && (
                <div>
                    <MDBTypography tag="h5" className="text-start mb-1 mt-3" style={{paddingLeft: "20px"}}>
                        PACKAGE INCLUSIONS
                    </MDBTypography>
                    <ul style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px"}}>
                        <li> 3D2N HOTEL ACCOMMODATION </li>
                        <li> DAILY BREAKFAST </li>
                        <li> ROUNDTRIP AIRPORT TRANSFER </li>
                        <li> PERMIT AND TAXES </li>
                        <li> BICOL CITY TOUR </li>
                    </ul>
                </div>
            )}



            <MDBCardBody>
              <MDBTypography tag="h5" className="text-center mb-4">
                Kindly complete the details below:
              </MDBTypography>
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
            value={pack.duration + pack.name}
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

<MDBCol md="6" className="d-flex align-items-center">

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

    </MDBCol>

    </MDBRow>

</form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
}

export default DetailsDomPack;
