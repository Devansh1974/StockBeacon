const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are an AI financial assistant. Only answer queries related to the stock market, including:
- NIFTY, SENSEX, or BANKNIFTY
- investment tips
- trending stocks
- PE ratio, valuations, price movements, etc.
- Give Point wise response as much as possible not more that 3 points.

If the question is not stock-related, politely reply: "I can only assist with stock market-related topics."
`;

// 🔒 Rate Limiter Middleware
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    reply: 'Too many requests. Please wait a minute before trying again.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// 🧠 AI Chat Route with Rate Limiting
router.post('/chat', chatLimiter, async (req, res) => {
  const { query } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(`${systemPrompt}\nUser: ${query}`);
    const aiReply = result.response.text();

    res.json({ reply: aiReply });

  } catch (error) {
    console.error('Gemini AI Error:', error.message || error);
    res.status(500).json({ reply: 'Error getting AI response.' });
  }
});

module.exports = router;
