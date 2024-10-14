import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import SideNavbar from '../components/SideNavbar'; 
import BookingDetails from '../components/BookingDetails';

function Admin() {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate(); 

  const [currentContent, setCurrentContent] = useState('Quotation Management');
  const [bookingFilter, setBookingFilter] = useState('All Bookings');
  const [bookings, setBookings] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookings/get-all-bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchQuotations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/quotations/get-all-quotations');
        const data = await response.json();
        setQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    if (currentContent === 'Booking Management') {
      fetchBookings();
    } else if (currentContent === 'Quotation Management') {
      fetchQuotations();
    }
  }, [currentContent]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const filterBookings = (filter) => {
    switch (filter) {
      case 'Pending':
        return bookings.filter(booking => booking.status === 'Pending');
      case 'Confirmed':
        return bookings.filter(booking => booking.status === 'Confirmed');
      case 'Payment Sent':
        return bookings.filter(booking => booking.status === 'Payment Sent');
      case 'Payment Confirmed':
        return bookings.filter(booking => booking.status === 'Payment Confirmed');
      case 'Rejected':
        return bookings.filter(booking => booking.status === 'Rejected');
      default:
        return bookings;
    }
  };

  const filterQuotations = (filter) => {
    switch (filter) {
      case 'Pending':
        return quotations.filter(quotation => quotation.status === 'Pending');
      case 'Email Sent':
        return quotations.filter(quotation => quotation.status === 'Email Sent');
      default:
        return quotations;
    }
  };

  const renderTable = (title, data, filterFunc, isQuotation = false) => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>{title}</h2>
      
      {/* Horizontal line above the navbar */}
      <div style={{
        borderTop: '2px solid rgb(255, 165, 0)',
        width: '100%',
        marginBottom: '0',
        zIndex: '1'
      }}></div>
      
      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>

          {/* Filter links */}
          {isQuotation ? ['All Quotations', 'Pending', 'Email Sent'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold', 
                  borderBottom: 'none', 
                  borderRadius: '0', 
                  textAlign: 'center',
                  padding: '10px 0', 
                  display: 'block', 
                  width: '100%', 
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          )) : ['All Bookings', 'Pending', 'Confirmed', 'Payment Sent', 'Payment Confirmed', 'Rejected'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold', 
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block', 
                  width: '100%', 
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      {/* Horizontal line below the navbar */}
      <div style={{
        borderBottom: '2px solid rgb(255, 165, 0)',
        width: '100%',
        marginTop: '0',
        zIndex: '1'
      }}></div>

      <div className="mt-3 text-center">

        {/* Render the filtered data in a table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Service Type</th>
                <th style={{ fontWeight: 'bold' }}>Booking #</th>
                <th style={{ fontWeight: 'bold' }}>Name</th>
                <th style={{ fontWeight: 'bold' }}>Date</th>
                <th style={{ fontWeight: 'bold' }}>Status</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
            {filterFunc().length > 0 ? (
              filterFunc().map((item, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 'bold' }}>{item.type}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.num}</td>
                  <td style={{ fontWeight: 'bold' }}>{`${item.firstname} ${item.middlename} ${item.lastname}`}</td>
                  <td style={{ fontWeight: 'bold' }}>{`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.status}</td>
                  <td>
                    <MDBBtn color="primary" size="sm" onClick={() => setSelectedBooking(item)}>More Details</MDBBtn>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedBooking) {
      return (
        <BookingDetails
          booking={selectedBooking}
          onBack={() => setSelectedBooking(null)}
        />
      );
    }

    switch (currentContent) {
      case 'Booking Management':
        return renderTable('BOOKING MANAGEMENT', bookings, () => filterBookings(bookingFilter));
      case 'Quotation Management':
        return renderTable('QUOTATION MANAGEMENT', quotations, () => filterQuotations(bookingFilter), true);
      default:
        return <div className="text-center">Select an option from the menu</div>;
    }
  };

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#fff' }}>

      {/* Header Section */}
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0, borderBottom: '2px solid rgb(240, 240, 240)' }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/login')} 
  />

          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <span
                style={{
                  margin: '0 15px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {name}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <div className="d-flex flex-grow-1 mt-3">

        {/* Side Navbar */}
        <SideNavbar setCurrentContent={setCurrentContent}/>

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column p-3" style={{ backgroundColor: '#fff' }}>
          <div className="w-100 h-100" style={{ backgroundColor: '#fff' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
