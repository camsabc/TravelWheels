import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar  } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Modal from '../components/Modal'; 

import { useLocation, useNavigate } from 'react-router-dom';
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
  MDBCol,
  MDBFooter
} from 'mdb-react-ui-kit';

import promoImage1 from '../images/h1.png';
import promoImage2 from '../images/h2.png';
import promoImage3 from '../images/h3.png';
import f1 from '../images/f1.png';
import f2 from '../images/f2.png';
import f3 from '../images/f3.png';

import logo from '../images/header.jpg';
import bg from '../images/bg.png';

const HomepageUser = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    {/* HEADER */}
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

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                      onClick={() => navigate('/services', { state: { email: user.email }})}
                      style={{ margin: '0 25px' }}
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
                Hi, {user.firstname}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>



      <div className="d-flex flex-column min-vh-100">
        <img className='logo' src={bg} alt="Logo"  />

        <MDBTypography 
            tag="h1" 
            className="mt-3" 
            style={{
                fontWeight: '600', 
                color: 'black', 
                fontSize: '20px', 
                marginLeft: '20px'
            }}
            >
            SCHEDULE YOUR NEXT ADVENTURE
        </MDBTypography>



        <div 
    className="my-1" 
    style={{  
        width: '98%',  // Set the desired width
        marginLeft: '-10' // Centers the div horizontally
    }}
>
    <MDBRow className="align-items-center">
        {/* Column for the text with no left padding */}
        <MDBCol size="7" > {/* Adjust size based on the layout you want */}
            <MDBTypography 
                tag="h1" 
                className="mt-2" 
                style={{
                    fontWeight: '600', 
                    color: 'black', 
                    fontSize: '30px', 
                    marginLeft: '30px'
                }}
            >
                WHAT'S THE NEXT DESTINATION?
            </MDBTypography>
        </MDBCol>
        
        {/* Column for the button */}
        <MDBCol size="4" className="d-flex justify-content-end"> {/* Adjust size based on the layout you want */}
            <button 
                type="button" 
                className="btn btn-primary"
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '30%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                VIEW ALL
            </button>
        </MDBCol>
    </MDBRow>
</div>

 
 {/* ROWS FOR DESTINATION */}

 <div className="my-4">
        <MDBRow>
          {/* Column 1 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={promoImage1}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px'  }} 
        />
        {/* Overlay text */}
        <h3 className="position-absolute bottom-0 start-0 m-3 text-white" 
        style={{ fontWeight: 'bold', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', borderRadius: '5px' }}>
            DAVAO
        </h3>
    </div>
</MDBCol>



          {/* Column 2 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={promoImage2}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px'  }} 
        />
        {/* Overlay text */}
        <h3 className="position-absolute bottom-0 start-0 m-3 text-white" 
        style={{ fontWeight: 'bold', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', borderRadius: '5px' }}>
            BORACAY
        </h3>
    </div>
</MDBCol>


          {/* Column 3 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={promoImage3}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px'  }} 
        />
        {/* Overlay text */}
        <h3 className="position-absolute bottom-0 start-0 m-3 text-white" 
        style={{ fontWeight: 'bold', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', borderRadius: '5px' }}>
            TAIWAN
        </h3>
    </div>
    </MDBCol>
    </MDBRow>
    </div>

    <div 
    className="my-1" 
    style={{  
        width: '98%',  // Set the desired width
        marginLeft: '-10' // Centers the div horizontally
    }}
>
    <MDBRow className="align-items-center">
        {/* Column for the text with no left padding */}
        <MDBCol size="7" > {/* Adjust size based on the layout you want */}
            <MDBTypography 
                tag="h1" 
                className="mt-2" 
                style={{
                    fontWeight: 'bolder', 
                    color: 'rgb(255, 165, 0)', 
                    fontSize: '30px', 
                    marginLeft: '30px'
                }}
            >
                CLIENT'S FEEDBACK
            </MDBTypography>
        </MDBCol>
        
        {/* Column for the button */}
        <MDBCol size="4" className="d-flex justify-content-end"> {/* Adjust size based on the layout you want */}
            <button 
                type="button" 
                className="btn btn-primary"
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '30%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                VIEW ALL
            </button>
        </MDBCol>
    </MDBRow>
</div>

 
 {/* ROWS FOR DESTINATION */}

 <div className="my-4">
        <MDBRow>

          {/* Column 1 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={f1}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} 
        />
    </div>
    {/* 5-star rating below the picture */}
<div className="mt-3 d-flex justify-content-center">
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
</div>
</MDBCol>




          {/* Column 2 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={f2}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} 
        />
    </div>
    {/* 5-star rating below the picture */}
<div className="mt-3 d-flex justify-content-center">
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
</div>
</MDBCol>



          {/* Column 3 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center position-relative">
    {/* Container for the image and text */}
    <div className="position-relative" style={{ width: '450px', height: '450px' }}>
        <MDBCardImage
            src={f3}
            alt="Promo 1"
            className="img-fluid position-absolute bottom-0 start-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} 
        />
    </div>
    {/* 5-star rating below the picture */}
<div className="mt-3 d-flex justify-content-center">
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
    <i className="fas fa-star text-warning" style={{ fontSize: '2rem' }}></i>
</div>
</MDBCol>

    </MDBRow>
    </div>
      </div>

      {/* Footer Section */}
      <MDBFooter bgColor="light" className="text-start text-lg-left mt-auto">
        <div className="container text-left text-md-left">
            <div className="row mt-2 mb-2">
            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className="text-uppercase mb-4 font-weight-bold" style={{fontWeight: 'bold'}}>FOLLOW US</h5>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Hours:</h6>
                <p>
                    Monday - Saturday: 8AM - 7 PM
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Address: </h6>
                <p>
                    Office Unit 2, Hersyl Building, Blk 5 Lot 25 Phase4, Golden City Subdivision, Brgy. Dila, Santa Rosa, Philippines
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4">ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4">CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4">FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>
    </>
  );
};

export default HomepageUser;
