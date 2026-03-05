const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all alerts for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// Create new alert
router.post('/', authMiddleware, async (req, res) => {
  const { ticker, name, targetPrice, condition } = req.body;
  
  if (!ticker || !targetPrice || !condition) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const newAlert = new Alert({
      user: req.user.id,
      ticker: ticker.toUpperCase(),
      name: name || ticker.toUpperCase(),
      targetPrice: Number(targetPrice),
      condition // 'Above' or 'Below'
    });

    await newAlert.save();
    res.json({ message: "Alert created successfully", alert: newAlert });
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert" });
  }
});

// Delete alert
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const alert = await Alert.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!alert) return res.status(404).json({ msg: "Alert not found" });
    
    res.json({ message: "Alert deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete alert" });
  }
});

module.exports = router;
