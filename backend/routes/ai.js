const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');
const knowledgeBase = require('../data/knowledgeBase');

// 🔌 Initialize Gemini Generative AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧠 In-Memory Conversation Context Store
const chatSessions = new Map();
const SESSION_EXPIRY = 30 * 60 * 1000; // 30 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Clean up expired sessions periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of chatSessions.entries()) {
    if (now - session.lastActive > SESSION_EXPIRY) {
      chatSessions.delete(sessionId);
    }
  }
}, CLEANUP_INTERVAL);

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

// 📂 Advanced System Prompt for Gemini AI Fallback Tasks
const systemPrompt = `
You are the official StockBeacon AI Assistant, a professional, helpful, and friendly SaaS support assistant.
Your job is to answer general stock market, investing, and financial education questions (e.g. explaining concepts like PE ratio, SIP vs Lump Sum, diversification, value investing, market capitalization).

For your awareness, StockBeacon-specific company features are handled by a local intent router, but for context:
- StockBeacon is a fintech platform designed to simplify stock investing and analysis.
- Creator & Developer: Devansh Singh.

RULES OF CONDUCT:
1. Answer stock market, investing, and financial education questions.
2. Maintain a highly professional, helpful, and friendly SaaS support tone.
3. Prefer bullet-point responses for readability.
4. Keep answers concise, direct, and useful.
5. Avoid hallucinating or giving specific buy/sell recommendations or direct financial advice.
`;

// 🧠 AI Chat Route (Hybrid Local Knowledge Router + Gemini Fallback with Memory)
router.post('/chat', chatLimiter, async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ reply: 'Query is required.' });
  }

  try {
    // 1. Identify or create chat session ID cookie
    let sessionId = req.cookies.stockbeacon_chat_session;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    // 2. Set or refresh session cookie expiration (30 minutes of inactivity)
    res.cookie('stockbeacon_chat_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: SESSION_EXPIRY
    });

    // 3. Retrieve or initialize the in-memory chat session history
    let session = chatSessions.get(sessionId);
    if (!session) {
      session = { history: [], lastActive: Date.now() };
      chatSessions.set(sessionId, session);
    } else {
      session.lastActive = Date.now();
    }

    const normalizedQuery = query.toLowerCase().trim();
    let localResponse = null;

    // ==========================================
    // 🎯 INTENT DETECTION LAYER (Feature 2)
    // ==========================================

    // A. Founder & Owner Details
    if (
      normalizedQuery.includes('founder') ||
      normalizedQuery.includes('founded') ||
      normalizedQuery.includes('creator') ||
      normalizedQuery.includes('created') ||
      normalizedQuery.includes('create') ||
      normalizedQuery.includes('owner') ||
      normalizedQuery.includes('owns') ||
      normalizedQuery.includes('own') ||
      normalizedQuery.includes('developer') ||
      normalizedQuery.includes('developed') ||
      normalizedQuery.includes('built') ||
      normalizedQuery.includes('made') ||
      normalizedQuery.includes('make') ||
      normalizedQuery.includes('devansh') ||
      normalizedQuery.includes('linkedin') ||
      normalizedQuery.includes('mail') ||
      normalizedQuery.includes('email') ||
      normalizedQuery.includes('contact')
    ) {
      localResponse = `👋 **Meet the Founder**:\n\n` +
                      `* **Name**: ${knowledgeBase.platform.founder.name}\n` +
                      `* **Role**: ${knowledgeBase.platform.founder.role}\n` +
                      `* **LinkedIn**: [Devansh's Profile](${knowledgeBase.platform.founder.linkedin})\n` +
                      `* **Email**: ${knowledgeBase.platform.founder.email}\n\n` +
                      `${knowledgeBase.platform.founder.description}`;
    }
    // B. Mission, Vision, Overview or About StockBeacon
    else if (
      normalizedQuery.includes('what is stockbeacon') ||
      normalizedQuery.includes('about stockbeacon') ||
      (normalizedQuery.includes('what') && normalizedQuery.includes('stockbeacon')) ||
      normalizedQuery.includes('mission') ||
      normalizedQuery.includes('vision') ||
      normalizedQuery.includes('company overview')
    ) {
      localResponse = `🏢 **About StockBeacon**:\n\n` +
                      `${knowledgeBase.platform.overview}\n\n` +
                      `* **Mission**: ${knowledgeBase.platform.mission}\n` +
                      `* **Vision**: ${knowledgeBase.platform.vision}\n\n` +
                      `${knowledgeBase.platform.companyOverview}`;
    }
    // C. AI Alerts
    else if (
      normalizedQuery.includes('ai alert') ||
      normalizedQuery.includes('alert') ||
      normalizedQuery.includes('notification')
    ) {
      const alertService = knowledgeBase.services.find(s => s.id === 'ai_alerts');
      localResponse = `🔔 **${alertService.name}**:\n\n` +
                      `${alertService.description}\n\n` +
                      `**Key Details**:\n` +
                      alertService.details.map(d => `* ${d}`).join('\n');
    }
    // D. Portfolio Tracker
    else if (
      normalizedQuery.includes('portfolio') ||
      normalizedQuery.includes('track') ||
      normalizedQuery.includes('holding') ||
      normalizedQuery.includes('investment') ||
      normalizedQuery.includes('watchlist')
    ) {
      const portfolioService = knowledgeBase.services.find(s => s.id === 'portfolio_tracking');
      localResponse = `💼 **${portfolioService.name}**:\n\n` +
                      `${portfolioService.description}\n\n` +
                      `**Key Details**:\n` +
                      portfolioService.details.map(d => `* ${d}`).join('\n');
    }
    // E. Market News
    else if (
      normalizedQuery.includes('news') ||
      normalizedQuery.includes('feed') ||
      normalizedQuery.includes('headline') ||
      normalizedQuery.includes('update')
    ) {
      const newsService = knowledgeBase.services.find(s => s.id === 'market_news');
      localResponse = `📰 **${newsService.name}**:\n\n` +
                      `${newsService.description}\n\n` +
                      `**Key Details**:\n` +
                      newsService.details.map(d => `* ${d}`).join('\n');
    }
    // F. Trivia Rewards / Coins
    else if (
      normalizedQuery.includes('trivia') ||
      normalizedQuery.includes('coin') ||
      normalizedQuery.includes('reward') ||
      normalizedQuery.includes('quiz') ||
      normalizedQuery.includes('game') ||
      normalizedQuery.includes('beginner')
    ) {
      const triviaService = knowledgeBase.services.find(s => s.id === 'trivia_rewards');
      localResponse = `🎯 **${triviaService.name}**:\n\n` +
                      `${triviaService.description}\n\n` +
                      `**How it works**:\n` +
                      triviaService.details.map(d => `* ${d}`).join('\n');
    }
    // G. Services & Features list
    else if (
      normalizedQuery.includes('services') ||
      normalizedQuery.includes('features') ||
      normalizedQuery.includes('provide') ||
      normalizedQuery.includes('offer')
    ) {
      localResponse = `✨ **StockBeacon Services & Features**:\n\n` +
                      `Here are the core capabilities available on the platform:\n\n` +
                      knowledgeBase.services.map(s => `* **${s.name}**: ${s.description}`).join('\n');
    }
    // H. Premium Plans / Pricing
    else if (
      normalizedQuery.includes('premium') ||
      normalizedQuery.includes('price') ||
      normalizedQuery.includes('pricing') ||
      normalizedQuery.includes('cost') ||
      normalizedQuery.includes('pay') ||
      normalizedQuery.includes('charge') ||
      normalizedQuery.includes('subscription')
    ) {
      const premiumService = knowledgeBase.services.find(s => s.id === 'premium');
      localResponse = `💎 **Premium & Pricing**:\n\n` +
                      `${knowledgeBase.features.premium.status}\n\n` +
                      `**Upcoming Tiers**:\n` +
                      premiumService.details.map(d => `* ${d}`).join('\n');
    }
    // I. Chatbot Capabilities / Help
    else if (
      normalizedQuery.includes('what can you do') ||
      normalizedQuery.includes('what do you do') ||
      normalizedQuery.includes('how can you help') ||
      normalizedQuery.includes('what are you') ||
      normalizedQuery.includes('who are you') ||
      normalizedQuery === 'help' ||
      normalizedQuery === 'chatbot'
    ) {
      localResponse = knowledgeBase.chatbot.capabilities;
    }

    // ==========================================
    // ↩️ INTENT MATCHED -> RETURN LOCAL RESPONSE
    // ==========================================
    if (localResponse !== null) {
      // Add interaction to context history
      session.history.push({ role: 'user', text: query });
      session.history.push({ role: 'model', text: localResponse });

      // Keep within capacity limit (15 exchanges / 30 total items)
      if (session.history.length > 30) {
        session.history = session.history.slice(session.history.length - 30);
      }

      return res.json({ reply: localResponse });
    }

    // ==========================================
    // 🌐 INTENT NOT MATCHED -> GEMINI AI FALLBACK
    // ==========================================
    try {
      // Map stored history to Gemini format
      const geminiHistory = session.history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: systemPrompt
      });

      const chat = model.startChat({
        history: geminiHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(query);
      const aiReply = result.response.text();

      // Update session history
      session.history.push({ role: 'user', text: query });
      session.history.push({ role: 'model', text: aiReply });

      if (session.history.length > 30) {
        session.history = session.history.slice(session.history.length - 30);
      }

      return res.json({ reply: aiReply });

    } catch (apiError) {
      // Handle Gemini failures gracefully (Feature 5)
      console.error('Gemini API Failure:', apiError.message || apiError);

      const errorFallback = `⚠️ AI insights are temporarily unavailable right now.

I can still help with:

• StockBeacon Features
• Portfolio Tracking
• AI Alerts
• Trivia Rewards
• Founder Information
• Platform Overview`;

      return res.json({ reply: errorFallback });
    }

  } catch (error) {
    console.error('General chatbot error:', error.message || error);
    res.status(500).json({ reply: 'An error occurred while handling your chat message.' });
  }
});

module.exports = router;
