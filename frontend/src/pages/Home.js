import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg'

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {

        if(data.type == "user") { navigate(`/profile`, { state: { email: data.email }}); }
        else{ navigate(`/admin`, { state: { name: data.firstname }}); }

      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <MDBCardImage src={logo} style={{ width: '300px', paddingTop: '50px' }} alt="Header Logo" />
      </div>
      <MDBInput
        wrapperClass='mt-5 mb-3'
        label='Email address'
        id='form1'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Password'
        id='form2'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className="text-danger mb-3">{error}</div>}

      <MDBBtn className="mb-4" onClick={handleSignIn}>Sign on</MDBBtn>

    </MDBContainer>
  );
}

export default Home;
