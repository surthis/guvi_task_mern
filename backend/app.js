const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/userModel');
require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');
// Get MongoDB connection URL from .env
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});
app.post('/api/register', async (req, res) => {
  console.log('Received a registration request');
  const userData = req.body;
  console.log('Received data:', userData);

  try {
    // Check if the user already exists (you can also validate user data here)
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("user exists!");
      res.json({ success: false, message: 'User already exists.' });
    } else {
      // Create a new user instance
      const newUser = new User(userData);
      console.log("success!");
      // Save the user to the database
      await newUser.save();

      // Generate a JWT token
      const token = generateToken(newUser); // Call your token generation function

      // Send the token in the response along with a success message
      res.json({ success: true, message: 'Registration successful', token,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      age: newUser.age,             // Include the new fields
      gender: newUser.gender,       // Include the new fields
      dob: newUser.dob,  });
      console.log(token);
      console.log(newUser.phoneNumber);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});



// Add this route after your registration route in app.js

app.get('/api/register/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send the user details in the response
    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        age: user.age,
        gender: user.gender,
        dob: user.dob,
      },
    });
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ success: false, message: 'Error retrieving user details' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    // Check if the provided password matches the stored password (you should use a secure password hashing library)
    if (user.password !== password) {
      res.status(401).json({ success: false, message: 'Password incorrect' });
      return;
    }

    // Generate a JWT token and send it in the response
    const token = generateToken(user);

    // If both email and password are correct, return a success response
    res.status(200).json({ success: true,  message: 'Login successful',   token, name: user.name,   phoneNumber: user.phoneNumber, });
    // console.log(user.name);
    console.log(user.phoneNumber);
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});



// const crypto = require('crypto');

// Generate a random key with 256 bits (32 bytes)
const secretKey = process.env.REACT_APP_SECRET_KEY ;

console.log('Generated JWT Secret Key:', secretKey);
const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  console.log('Token generated:', token);
  return token;
}

// Verify the JWT token in your routes
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(403).json({ message: 'Authorization header is missing' });
  }

  const tokenParts = authorizationHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Invalid authorization header format' });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};


// Use verifyToken middleware in your profile route
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    // You can access the authenticated user's ID as req.userId
    // Fetch user details using the ID from the database and send the response
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile data retrieved successfully',
      user: {
        name: user.name,
        email: user.email,
        // Add other user details you want to display
      },
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ success: false, message: 'Error fetching profile data' });
  }
});

app.put('/api/profile', verifyToken, async (req, res) => {
  const userId = req.userId;
  const updatedUserData = req.body;

  try {
    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: updatedUserData.name,
          email: updatedUserData.email,
          phoneNumber: updatedUserData.phoneNumber,
          age: updatedUserData.age,       // Include the new fields
          gender: updatedUserData.gender, // Include the new fields
          dob: updatedUserData.dob,       // Include the new fields
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        age: updatedUser.age,            // Include the new fields
        gender: updatedUser.gender,      // Include the new fields
        dob: updatedUser.dob,            // Include the new fields
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});


const port=process.env.PORT;

app.listen(port, () => {
  console.log('Server is running on port 5000');
});
