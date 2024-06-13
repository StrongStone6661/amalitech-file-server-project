import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit =async(e) => {
    const token = localStorage.getItem('token')
    if (!token) {
      Swal.fire('Error', 'You are not authorized. Please login.', 'error');
      navigate('/');
      return;
    }
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3001/api/forget-password',{email},{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200){
          Swal.fire("Check your email for the reset link!")  
        }
        
    }catch(error){
        console.log(error)
    }
    console.log('Email submitted:', email);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Forgot password?</h1>
        <p className={styles.instruction}>
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit" className={styles.button}>
            Send password reset link
          </button>
        </form>
        <a onClick={()=>navigate('/')} className={styles.goBack}>
          Go back
        </a>
      </div>
    </div>
  );
};

export default Forgotpassword;
