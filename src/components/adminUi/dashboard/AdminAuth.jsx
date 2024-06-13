import React,{useState} from 'react';
import './adminauth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminAuth = () => {
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3001/admin/login',{password});
    
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
          }
    
        } catch (err) {
          if (err.response) {  
            Swal.fire(err.response.data.message);
          } else if (err.request) {
            Swal.fire('No response received from server');
          } else {
            Swal.fire('Error', err.message, 'error');
          }
        }
      };

      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };


  return (
    <div className="ad-auth-wrapper">
<div className="admin-auth-container">
      <div className="subscribe">
        <p>Admin Sign-in</p>
        <input 
          placeholder="Your Password" 
          className="subscribe-input" 
          name="password" 
          type="password" 
          onChange={handlePasswordChange}
          value={password}
        />
        <br />
        <div className="submit-btn" onClick={handleSubmit}>SUBMIT</div>
      </div>
    </div>

    </div>
      );
}

export default AdminAuth;
