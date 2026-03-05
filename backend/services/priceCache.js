const NodeCache = require('node-cache');
const yahooFinance = require('yahoo-finance2').default;

// Cache prices for 3 minutes (180 seconds)
const priceCache = new NodeCache({ stdTTL: 180, checkperiod: 180 }); 

// Fallbacks if absolutely rate-limited
const fallbackPrices = {
  'RELIANCE.NS': 2853.45,
  'TCS.NS': 3911.20,
  'HDFCBANK.NS': 1618.35,
  'INFY.NS': 1520.10,
  'RELIANCE.BO': 2845.50
};

const getLivePrice = async (ticker) => {
  // 1. Check Cache
  const cachedPrice = priceCache.get(ticker);
  if (cachedPrice) return cachedPrice;

  // 2. Fetch from Yahoo Finance
  try {
    // Add artificial delay up to 1s to prevent burst requests
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000)); 
    
    // Suppress survey notices to clean up logs
    yahooFinance.suppressNotices(['yahooSurvey']);

    const quote = await yahooFinance.quote(ticker);
    const price = quote.regularMarketPrice;
    
    // Cache the successful fetch
    if (price) {
      priceCache.set(ticker, price);
      return price;
    }
    return null;
  } catch (err) {
    console.error(`⚠️ Failed to fetch live price for ${ticker}: ${err.message}`);
    // If rate limited, use fallback if available so the UI doesn't break
    if (fallbackPrices[ticker]) return fallbackPrices[ticker];
    return null; // The caller should handle fallback (e.g., using avgPrice)
  }
};

module.exports = { getLivePrice };
