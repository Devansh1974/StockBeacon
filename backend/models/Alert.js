const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticker: { type: String, required: true },
  name: { type: String }, // Optional: Name of company
  targetPrice: { type: Number, required: true },
  condition: { type: String, enum: ['Above', 'Below'], required: true },
  status: { type: String, enum: ['Active', 'Triggered'], default: 'Active' },
  triggeredAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);
