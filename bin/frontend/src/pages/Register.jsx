import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import {Link} from 'react-router-dom';


function Register() {
    const [form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        role:'user'
    });

    const handleChange=(e) => {
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8081/api/users/register',form);
            alert('User Registered: '+res.data.name);
        }catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert('Registration failed: ' + err.response.data.message);
            } else {
                alert('Registration failed: ' + err.message);
            }
        }
    };

    return (
  <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>

    <p style={{marginTop: '1rem', textAlign: 'center'}}>
        Already have an account..? <Link to="/login">Login</Link>
    </p>
  </div>
);

}

export default Register;