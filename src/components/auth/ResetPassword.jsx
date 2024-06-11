import React, { useEffect, useState } from 'react';
import styles from './ResetPassword.module.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [urlToken, setUrlToken] = useState('');

  const { token } = useParams();

  useEffect(() => {
    console.log(token);
  }, [token]);


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (password === confirmPassword) {
       const response = await axios.post(`http://localhost:3001/api/reset-password/${token}`, { password });
       Swal.fire(response.data.message)
      } else {
        Swal.fire("Password do no match!!")
      }
    }catch(error){
      console.error(error,'did not set ooo');
    }
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
        <a href="#" className={styles.goBack}>
          Go back
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
