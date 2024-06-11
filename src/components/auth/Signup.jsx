/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/signup', {
                email,
                password,
            });
            Swal.fire(response.data.message)
        } catch (error) {
            // handle error
            setError('Registration failed. Please try again.');
        }
    };
    return (
        <div className='login'>
        <div className="login-container">
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
            <p style={{ margin: '0px' }}>Register</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="input-group">
                <label htmlFor="email">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
            </div>
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
            <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                />
            </div>
            <div className='btn-wrapper'>
                <button type="submit" className="activebtn">Register</button>
                <button type="button" className="nonactive" onClick={() => navigate('/')}>Login</button>
            </div> 
        </form>
        </div>
        </div>
    );
}

export default Signup;
