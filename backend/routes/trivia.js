const express = require('express');
const router = express.Router();
const TriviaResult = require('../models/TriviaResults');
const User = require('../models/User');

// Save a trivia result WITHOUT auth middleware
router.post('/trivia/result', async (req, res) => {
  try {
    const { userId, score, coinsEarned, difficulty } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new trivia result and store the earned coins
    const newResult = new TriviaResult({
      user: userId,
      score,
      coinsEarned,
      difficulty,
    });

    await newResult.save();

    // Link the result to the user
    user.triviaResults.push(newResult._id);

    // Update the user's total coins by adding the newly earned coins
    user.totalCoins += coinsEarned;

    // Save the updated user with the new total coins
    await user.save();

    res.status(201).json({ message: 'Trivia result saved successfully' });
  } catch (err) {
    console.error('Trivia result save error:', err);
    res.status(500).json({ error: 'Failed to save trivia result' });
  }
});

module.exports = router;
