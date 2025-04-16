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
    minlength: 6,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePic: {
    type: String,
  },
  
  triviaResults: [ // 🔗 Stores references to trivia results
    {
      type: Schema.Types.ObjectId,
      ref: 'TriviaResult',
    }
  ],

  totalCoins: {
    type: Number,
    default: 0, // This will store the cumulative total coins of the user
  },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
