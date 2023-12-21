import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/form.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    // Make an API request to the server to validate the user's credentials
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Store user authentication state (e.g., a token) and set the user in the app
          localStorage.setItem('token', data.token);
          setUser({ email, isAuthenticated: true, token: data.token,
            name: data.name,
            phoneNumber: data.phoneNumber,}); // Include the token in user data
          console.log('Token:', data.token);
          console.log('Name:', data.name);
          console.log('Phone Number:', data.phoneNumber);
          console.log('Phone Number:', data.userId);
          alert("Login sucessfully");
        } else {
          // Handle login failure, show an error message, etc.
          alert('Login failed: ' + data.message);
        }
      })
      .catch((error) => {
        // Handle errors from the API request
        alert('Login error: ' + error);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={(e) => handleLogin(e)} method="post">
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={(e) => handleLogin(e)}>Login</button>
        <p >
          Don't have an account? <Link to="/register"class="link1">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
