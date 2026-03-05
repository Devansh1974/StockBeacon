const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middlewares/authMiddleware');
const { getLivePrice } = require('../services/priceCache');

// Get Portfolio & calculate live metrics
router.get('/', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio || portfolio.holdings.length === 0) {
      return res.json({ holdings: [], totalValue: 0, totalInvested: 0, totalGainLoss: 0, totalReturn: 0 });
    }

    let totalInvested = 0;
    let totalValue = 0;

    const holdingsWithLivePrice = await Promise.all(
      portfolio.holdings.map(async (holding) => {
        try {
          // Fetch live data (uses cache silently)
          const livePrice = await getLivePrice(holding.ticker);
          const currentPrice = livePrice || holding.avgPrice;
          
          const invested = holding.shares * holding.avgPrice;
          const currentValue = holding.shares * currentPrice;
          
          totalInvested += invested;
          totalValue += currentValue;

          return {
            ...holding._doc,
            currentPrice,
            currentValue,
            investedValue: invested,
            gainLoss: currentValue - invested,
            gainLossPercent: ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100
          };
        } catch (err) {
          console.error(`Error fetching price for ${holding.ticker}:`, err.message);
          return null;
        }
      })
    );

    const validHoldings = holdingsWithLivePrice.filter(h => h !== null);
    const totalGainLoss = totalValue - totalInvested;
    const totalReturn = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    res.json({
      holdings: validHoldings,
      totalValue,
      totalInvested,
      totalGainLoss,
      totalReturn
    });
  } catch (err) {
    console.error("Portfolio Error:", err);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

// Add Transaction
router.post('/add', authMiddleware, async (req, res) => {
  const { ticker, shares, avgPrice } = req.body;
  
  if (!ticker || !shares || !avgPrice) {
    return res.status(400).json({ msg: "Please provide all transaction details" });
  }

  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id, holdings: [] });
    }

    const existingIndex = portfolio.holdings.findIndex(h => h.ticker === ticker.toUpperCase());
    
    if (existingIndex > -1) {
      const current = portfolio.holdings[existingIndex];
      const newTotalShares = current.shares + Number(shares);
      const newAvgPrice = ((current.shares * current.avgPrice) + (Number(shares) * Number(avgPrice))) / newTotalShares;
      
      portfolio.holdings[existingIndex].shares = newTotalShares;
      portfolio.holdings[existingIndex].avgPrice = newAvgPrice;
    } else {
      portfolio.holdings.push({ ticker: ticker.toUpperCase(), shares: Number(shares), avgPrice: Number(avgPrice) });
    }

    await portfolio.save();
    res.json({ message: "Transaction added successfully", portfolio });
  } catch (err) {
    console.error("Add Transaction Error:", err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// Remove Holding
router.delete('/remove/:id', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) return res.status(404).json({ msg: "Portfolio not found" });

    portfolio.holdings = portfolio.holdings.filter(h => h._id.toString() !== req.params.id);
    await portfolio.save();

    res.json({ message: "Holding removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove holding" });
  }
});

module.exports = router;
