import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
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

function PassportDetails() {
  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState(passportbg);
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

    gender: '',
    civilStatus: '',
    birthDate: '',
    countryBirth: '',
    provinceBirth: '',
    municipalityBirth: '',

    firstnameFather: '',
    middlenameFather: '',
    lastnameFather: '',
    countryCitizenshipFather: '',

    firstnameMother: '',
    middlenameMother: '',
    lastnameMother: '',
    countryCitizenshipMother: '',

    firstnameSpouse: '',
    middlenameSpouse: '',
    lastnameSpouse: '',

    applicationType: '',

    oldPassportNumber: '',
    dateIssued: '',
    issuingAuthority: '',

    foreignPassportHolder: '',
    emergencyContactPerson: '',
    contactNumberForeign: '',

    province: '',
    city: '',
    occuputation: '',
    officeNumber: '',
    officeDetails: '',

    fullAddress: '',
    landmark: '',

    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Passport Appointment'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
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
  
    <div className="d-flex flex-column min-vh-100"  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}>
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
        PASSPORT APPOINTMENT
      </MDBTypography>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center"
     
      >
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
              </MDBRow>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>General Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    placeholder="Gender"
                    value={bookingDetails.gender}
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
                    id="civilStatus"
                    name="civilStatus"
                    type="text"
                    placeholder="Civil Status"
                    value={bookingDetails.civilStatus}
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
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    placeholder="Date of Birth"
                    value={bookingDetails.birthDate}
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
                    id="countryBirth"
                    name="countryBirth"
                    type="text"
                    placeholder="Country Birth"
                    value={bookingDetails.countryBirth}
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
                    id="provinceBirth"
                    name="provinceBirth"
                    type="text"
                    placeholder="Province Birth"
                    value={bookingDetails.provinceBirth}
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
                    id="municipalityBirth"
                    name="municipalityBirth"
                    type="text"
                    placeholder="Municipality Birth"
                    value={bookingDetails.municipalityBirth}
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

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Father Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                  <input
                    id="lastnameFather"
                    name="lastnameFather"
                    type="text"
                    placeholder="Last Name"
                    value={bookingDetails.lastnameFather}
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
                    id="firstnameFather"
                    name="firstnameFather"
                    type="text"
                    placeholder="First Name"
                    value={bookingDetails.firstnameFather}
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
                    id="middlenameFather"
                    name="middlenameFather"
                    type="text"
                    placeholder="Middle Name"
                    value={bookingDetails.middlenameFather}
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
                    id="countryCitizenshipFather"
                    name="countryCitizenshipFather"
                    type="text"
                    placeholder="Country Citizenship"
                    value={bookingDetails.countryCitizenshipFather}
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



              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Mother Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                  <input
                    id="lastnameMother"
                    name="lastnameMother"
                    type="text"
                    placeholder="Last Name"
                    value={bookingDetails.lastnameMother}
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
                    id="firstnameMother"
                    name="firstnameMother"
                    type="text"
                    placeholder="First Name"
                    value={bookingDetails.firstnameMother}
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
                    id="middlenameMother"
                    name="middlenameMother"
                    type="text"
                    placeholder="Middle Name"
                    value={bookingDetails.middlenameMother}
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
                    id="countryCitizenshipMother"
                    name="countryCitizenshipMother"
                    type="text"
                    placeholder="Country Citizenship"
                    value={bookingDetails.countryCitizenshipMother}
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




               <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Spouse Information</MDBTypography>

                <MDBRow>
                <MDBCol md="6">
                    <input
                    id="lastnameSpouse"
                    name="lastnameSpouse"
                    type="text"
                    placeholder="Last Name"
                    value={bookingDetails.lastnameSpouse}
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
                <MDBCol md="6">
                    <input
                    id="firstnameSpouse"
                    name="firstnameSpouse"
                    type="text"
                    placeholder="First Name"
                    value={bookingDetails.firstnameSpouse}
                    onChange={handleChange}
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
                id="middlenameSpouse"
                name="middlenameSpouse"
                type="text"
                placeholder="Middle Name"
                value={bookingDetails.middlenameSpouse}
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














            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Application Type</MDBTypography>

            <MDBRow>
            <MDBCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  name="applicationType"
                  value="newPassport"
                  checked={bookingDetails.applicationType === 'newPassport'}
                  onChange={handleChange}
                  style={{
                    accentColor: 'rgb(255, 165, 0)', 
                    marginRight: '8px'
                  }}
                />
                New Passport
              </label>
            </MDBCol>
            <MDBCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="applicationType"
                  value="renewalPassport"
                  checked={bookingDetails.applicationType === 'renewalPassport'}
                  onChange={handleChange}
                  style={{
                    accentColor: 'rgb(255, 165, 0)',  
                    marginRight: '8px'
                  }}
                />
                Renewal Passport
              </label>
            </MDBCol>
          </MDBRow>




            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>If Renewal, fill out details below:</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
                <input
                id="oldPassportNumber"
                name="oldPassportNumber"
                type="text"
                placeholder="Old Passport Number"
                value={bookingDetails.oldPassportNumber}
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
            <MDBCol md="6">
                <input
                id="dateIssued"
                name="dateIssued"
                type="date"
                placeholder="Date Issued"
                value={bookingDetails.dateIssued}
                onChange={handleChange}
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
                id="issuingAuthority"
                name="issuingAuthority"
                type="text"
                placeholder="Issuing Authority"
                value={bookingDetails.issuingAuthority}
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


            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>If Foreigner, fill out details below:</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
                <input
                id="foreignPassportHolder"
                name="foreignPassportHolder"
                type="text"
                placeholder="Foreign Passport Holder"
                value={bookingDetails.foreignPassportHolder}
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
            <MDBCol md="6">
                <input
                id="emergencyContactPerson"
                name="emergencyContactPerson"
                type="text"
                placeholder="Emergency Contact person"
                value={bookingDetails.emergencyContactPerson}
                onChange={handleChange}
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
                id="contactNumberForeign"
                name="contactNumberForeign"
                type="text"
                placeholder="Contact Number"
                value={bookingDetails.contactNumberForeign}
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



            <MDBTypography tag="h6" className="text-start mt-4 mb-3" style={{fontWeight: 'bold'}}>Complete Address</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
                <input
                id="province"
                name="province"
                type="text"
                placeholder="Province"
                value={bookingDetails.province}
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
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={bookingDetails.city}
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
                id="occuputation"
                name="occuputation"
                type="text"
                placeholder="Occupation"
                value={bookingDetails.occuputation}
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
                id="officeNumber"
                name="officeNumber"
                type="text"
                placeholder="Office Number"
                value={bookingDetails.officeNumber}
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
                id="officeDetails"
                name="officeDetails"
                type="text"
                placeholder="Office Details"
                value={bookingDetails.officeDetails}
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



            <MDBTypography tag="h6" className="text-start mt-4 mb-3" style={{fontWeight: 'bold'}}>Courier Delivery Address</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
                <input
                id="fullAddress"
                name="fullAddress"
                type="text"
                placeholder="Full Address"
                value={bookingDetails.fullAddress}
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
                id="landmark"
                name="landmark"
                type="text"
                placeholder="Landmark"
                value={bookingDetails.landmark}
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
                <MDBCol md="6" className="d-flex align-items-center justify-content-end">
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        style={{ 
                        width: '60%', 
                        borderRadius: '30px', 
                        backgroundColor: 'rgb(255, 165, 0)', 
                        border: 'none', 
                        padding: '10px 20px',
                        fontWeight: 'bold'
                        }}
                        onClick={handleBookingSubmit} 
                    >
                        BOOK NOW
                    </button>
                </MDBCol>


                </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
    </>
  );
}

export default PassportDetails;
