const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware'); // Import middleware

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password: await bcrypt.hash(password, 10), email });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed. See server logs." });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. See server logs." });
  }
});

// Get all users (Protected Route)
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ error: "Failed to retrieve user. See server logs." });
  }
});

// Update user details (Protected Route)
router.put('/users/:id', authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Ensure the logged-in user is updating their own profile
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized to update this user's details" });
    }

    // Update username and email (if provided)
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'User details updated successfully', user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Failed to update user. See server logs." });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;