const { getLivePrice } = require('./priceCache');
const Alert = require('../models/Alert');

const checkAlerts = async () => {
  try {
    // Find all active alerts
    const activeAlerts = await Alert.find({ status: 'Active' });
    if (activeAlerts.length === 0) return;

    // We can group alerts by ticker to reduce API calls
    const uniqueTickers = [...new Set(activeAlerts.map(a => a.ticker))];
    
    const prices = {};
    for (const ticker of uniqueTickers) {
      const livePrice = await getLivePrice(ticker);
      if (livePrice) prices[ticker] = livePrice;
    }

    // Evaluate conditions
    for (const alert of activeAlerts) {
      const currentPrice = prices[alert.ticker];
      if (!currentPrice) continue;

      let triggered = false;
      if (alert.condition === 'Above' && currentPrice >= alert.targetPrice) {
        triggered = true;
      } else if (alert.condition === 'Below' && currentPrice <= alert.targetPrice) {
        triggered = true;
      }

      if (triggered) {
        alert.status = 'Triggered';
        alert.triggeredAt = new Date();
        await alert.save();
        console.log(`🔔 Alert Triggered for ${alert.user}: ${alert.ticker} passed ${alert.targetPrice} (${alert.condition} condition)`);
      }
    }
  } catch (error) {
    console.error("Alert Checker Error:", error);
  }
};

// Start the checker job (runs every 5 minutes)
const startAlertChecker = () => {
  console.log("⏱️ Starting Alert Checker Background Job (Runs every 5 mins)...");
  setInterval(checkAlerts, 5 * 60 * 1000); 
};

module.exports = startAlertChecker;
