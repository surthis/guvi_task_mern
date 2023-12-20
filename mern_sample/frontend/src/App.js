import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Register from './pages/registration';
import Booking from './pages/about'; 
import './App.css';

function App() {
  const [user, setUser] = useState(null); // Store user data if logged in

  // Define the handleDelete function
  const handleDelete = () => {
    // Implement the logic to handle user deletion
    // For example, you can make an API request to delete the user account
    console.log('Delete user logic goes here');
  };

  // Define the handleUpdate function
  const handleUpdate = (updatedUserData) => {
    // Implement the logic to handle user update
    // For example, you can update the user state with the new data
    console.log('Update user logic goes here', updatedUserData);
    setUser(updatedUserData);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/profile" element={user ? <Profile user={user} onDelete={handleDelete} onUpdate={handleUpdate} /> : <Login />} />
          <Route path="/login" element={user ? <Profile user={user} onDelete={handleDelete} onUpdate={handleUpdate} /> : <Login setUser={setUser} />} />
          <Route path="/register" element={user ? <Profile user={user} onDelete={handleDelete} onUpdate={handleUpdate} /> : <Register setUser={setUser} />} />
         <Route path="/about" element={user ? <Booking user={user}/> : <Login setUser={setUser} />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
