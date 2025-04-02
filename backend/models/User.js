const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    minlength: 3 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  },
  password: {
    type: String,
    minlength: 6, // Password only required for manual signup
  },
  googleId: {
    type: String, // Stores Google's unique user ID
    unique: true,
    sparse: true, // Allows null values for manual users
  },
  profilePic: {
    type: String, // Stores profile picture URL from Google
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
