import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';

function Quotation() {
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]);
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
            return fetch(`http://localhost:3000/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
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
  }, [email]);

  const handleDetailsClick = (quotationId, index) => {
    navigate('/details-quotation', { state: { id: quotationId, email: user.email, index } });
  };

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
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email }})}>Services</span>
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
      <MDBContainer className="flex-grow-1 py-5">
        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', paddingBottom: '10px', color: 'rgb(61, 132, 185)' }}>QUOTATIONS</h2>
          <hr style={{ width: '100%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        {quotations.length > 0 ? (
          <MDBRow>
            {quotations.map((quotation, index) => (
              <MDBCol md="6" lg="4" className="mb-4" key={quotation.id || `fallback-${Math.random()}`}>
                <MDBCard style={{ minHeight: '175px', position: 'relative', backgroundColor: 'rgb(255, 222, 89)' }}>
                  <MDBCardBody>
                    <MDBTypography tag="h3" style={{ fontWeight: 'bolder', textAlign: 'center', marginBottom: '1rem', color: 'white' }}>
                      QUOTATION #{index + 1}
                    </MDBTypography>

                    <MDBTypography tag="h6" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                      Quotation Details
                    </MDBTypography>

                    <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                      Date: {new Date(quotation.date).toLocaleDateString()} <br />
                      Amount: {quotation.amount} <br />
                    </MDBTypography>

                    <MDBTypography tag="h6" style={{ textAlign: 'start' }}>
                      <span style={{ fontWeight: 'bold' }}>Status:</span> {quotation.status}
                    </MDBTypography>

                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MDBBtn
                        rounded
                        size="sm"
                        style={{
                          backgroundColor: 'white',
                          width: '200px',
                          height: '40px',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                        onClick={() => handleDetailsClick(quotation._id, index)}
                      >
                        MORE DETAILS
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ) : (
          <div className="text-center" style={{ padding: '20px', fontSize: '1.25rem', fontWeight: 'bold' }}>No quotations found.</div>
        )}
      </MDBContainer>
    </div>
  );
}

export default Quotation;
