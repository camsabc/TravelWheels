import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2 style={headerStyle}>You must be logged in to book or request quotations</h2>

        <div style={buttonContainerStyle}>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onConfirm}
            style={buttonStyle}
          >
            GO TO LOGIN
          </button>

          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onClose}
            style={{ ...buttonStyle, marginLeft: '10px' }} // Add margin for spacing
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better contrast
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000, // Ensures modal is on top
};

const modalStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: '300px', // Set a fixed width for the modal
};

const headerStyle = {
  marginBottom: '20px',
  color: '#333', // Slightly darker text color
  fontSize: '18px', // Increase font size for emphasis
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between', // Even spacing between buttons
};

const buttonStyle = {
  fontWeight: 'bold',
  fontSize: '14px',
  borderRadius: '30px',
  backgroundColor: 'rgb(255, 165, 0)',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer', // Pointer cursor for buttons
  transition: 'background-color 0.3s ease', // Transition effect for hover
};

export default Modal;
