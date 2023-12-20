import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/form.css';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault()
    //console.log("Hi beautiful!")
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
  
    if (password === confirmPassword) {
      // Additional client-side validation (e.g., password strength) can be added here
  
      // Send the registration data to the server for server-side validation and hashing
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Registration successful, you can proceed with user authentication
           
            setUser({ name, email, phoneNumber: data.phoneNumber, userId: data.userId,});
             // Store the token in localStorage
            localStorage.setItem('token', data.token);
            alert("Registered successfully");
            console.log(data.userId);
          } else {
            // Handle registration error (e.g., display an error message to the user)
            alert('Registration failed: ' + data.message);
          }
        })
        .catch((error) => {
          alert('Error registering user: ' + error);
        });
    } else {
      // Handle client-side validation error
      console.log("Password and confirm password don't match.");
    }
  };

  return (
    <div className="login-container"> {/* Use the same CSS class */}
    <form onSubmit={(e)=>handleRegister(e)} method="post">
      <h2>Register</h2>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label>Phone Number: </label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label>Confirm Password: </label>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <br />
      <button type="submit" onClick={(e)=>handleRegister(e)} >Register</button>
      <p>
        Already have an account? <Link to="/login" class="link1">Login</Link>
      </p>
      </form>
    </div>
    
  );
};

export default Register;