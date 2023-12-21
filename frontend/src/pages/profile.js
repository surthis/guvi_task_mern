// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

const Profile = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Include this code to get the token from localStorage
  const token = localStorage.getItem('token');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    // Make a PUT or PATCH request to the server with the updated user data
    onUpdate(editedUser);
    setEditing(false);
  };
  
  

  // Use useEffect to fetch the user data when the component mounts
  useEffect(() => {
    // Make a GET request to the /api/profile endpoint with the token in the request headers
    axios.get('/api/profile', {
      headers: {
        Authorization: `JWT ${token}`,
      }
    })
      .then((response) => {
        // Handle the response and update the user's data
        const userData = response.data.user;
        setEditedUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [token]);
  return (   <div className="profile-container">
  <h2>Profile</h2>
  {isEditing ? (
    <div>
      <label>Name: </label>
      <input
        type="text"
        value={editedUser.name}
        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
      />
      <br />
      <label>Email: </label>
      <input
        type="email"
        value={editedUser.email}
        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
      />
      <br />
      <label>Phone Number: </label>
      <input
        type="tel"
        value={editedUser.phoneNumber}
        onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
      />
      <br />
      <label>Age: </label>
      <input
        type="number"
        value={editedUser.age}
        onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
      />
      <br />
      <label>Gender: </label>
      <select
        value={editedUser.gender}
        onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <label>Date of Birth: </label>
      <input
        type="date"
        value={editedUser.dob}
        onChange={(e) => setEditedUser({ ...editedUser, dob: e.target.value })}
      />
      <br />
      <button onClick={handleUpdate}>Save</button>
    </div>
  ) : (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Date of Birth: {user.dob}</p>
      <pre><button onClick={handleEdit}>Edit</button> <button onClick={onDelete}>Delete</button></pre>
    </div>
  )}
</div>
);
  
};

export default Profile;
