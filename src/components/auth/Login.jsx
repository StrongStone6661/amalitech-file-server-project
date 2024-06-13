/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/feedpage');
      }

    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        Swal.fire(err.response.data.message);
      } else if (err.request) {
        // The request was made but no response was received
        Swal.fire('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
          <p style={{ margin: '0px' }}>Login</p>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className='btn-wrapper'>
            <button type="submit" className="activebtn">Login</button>
            <button type="button" className="nonactive" onClick={() => navigate('/signup')}>Sign up</button>
          </div> 
          <div className="forgot-password">
            <a onClick={() => navigate('/password-forget')}>Forgot your Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
