import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 

const iconMapping = {
  'Dashboard': 'tachometer-alt',
  'Booking Management': 'calendar-check',
  'User Account Management': 'users',
  'Content Management': 'file-alt',
  'Quotation Management': 'comment-dollar',
  'Promotional Management System': 'bullhorn',
  'Logout': 'sign-out-alt'
};

function SideNavbar({ setCurrentContent, currentContent }) {
  const navigate = useNavigate(); 

  const handleItemClick = (item) => {
    if (item === 'Logout') {
      navigate('/');
    } else {
      setCurrentContent(item);
    }
  };

  return (
    <MDBListGroup className="flex-column" style={{ width: '200px', backgroundColor: '#fff', flexShrink: 0 }}>
      {Object.keys(iconMapping).map((item) => (
        <MDBListGroupItem
          key={item}
          action
          onClick={() => handleItemClick(item)}
          style={{
            color: currentContent === item ? '#fff' : '#ffa500', 
            fontWeight: currentContent === item ? 'bold' : 'normal',
            backgroundColor: currentContent === item ? '#ffa500' : '#fff', 
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '7px 20px',
            gap: '10px'
          }}
        >
          <MDBIcon
            icon={iconMapping[item]}
            size="lg"
            style={{ color: currentContent === item ? '#fff' : '#ffa500', width: '24px' }} 
          />
          <span style={{ flex: 1, textAlign: 'center' }}>{item}</span>
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
}

export default SideNavbar;
