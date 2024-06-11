/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
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
try{
      await axios.post('http://localhost:3001/api/login', {email,password})
      .then(response => {
        console.log(response.data);
        Swal.fire(response.data.message)
      })  
    }catch(err){
      console.log(err)
    }
  };


    return (
        <div className='login' >
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
      <div className="forgot-password"><a onClick={()=>navigate('/password-forget')}>Forgot your Password?</a></div>
    </form>
        </div>
        </div>
    );
}

export default Login;
