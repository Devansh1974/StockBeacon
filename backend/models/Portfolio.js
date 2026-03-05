const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  holdings: [{
    ticker: { type: String, required: true },
    shares: { type: Number, required: true, min: 0.0001 },
    avgPrice: { type: Number, required: true, min: 0 }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
