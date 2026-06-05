/**
 * StockBeacon AI Assistant Knowledge Base
 * Defines structured information about StockBeacon for the hybrid AI chatbot.
 */

const knowledgeBase = {
  platform: {
    name: "StockBeacon",
    tagline: "Smarter Investing, Simplified",
    overview: "StockBeacon is a state-of-the-art fintech platform and stock assistant designed to simplify stock investing and analysis. It empowers retail investors with institutional-grade tools, real-time data, and personalized insights.",
    mission: "Help investors learn, track, and make smarter market decisions through modern technology and AI-powered insights.",
    vision: "To empower retail investors with professional-grade tools, making financial markets accessible, structured, and understandable to everyone.",
    companyOverview: "StockBeacon is a cutting-edge web application tailored to bridging the gap between complex financial analysis and daily retail investing.",
    founder: {
      name: "Devansh Singh",
      role: "Founder & Lead Developer",
      linkedin: "https://linkedin.com/in/devanshsingh2006",
      email: "devanshsingh1974@gmail.com",
      description: "Devansh Singh is the founder and developer of StockBeacon. He created the platform to bridge the gap between complex financial data and everyday retail investors."
    },
    owner: {
      name: "Devansh Singh"
    }
  },
  services: [
    {
      id: "ai_alerts",
      name: "AI Stock Alerts",
      description: "Real-time stock price movement and trend alerts powered by Gemini AI, helping users stay ahead of market shifts.",
      details: [
        "Price-based alerts: Track standard thresholds and dynamic percentage moves.",
        "Market monitoring: Continuous scanning of market data for anomalies and breakouts.",
        "User notifications: Automated in-app messages notifying users of critical events.",
        "Custom alert setup: Allow users to specify target prices and custom parameters for personalized alerts."
      ]
    },
    {
      id: "portfolio_tracking",
      name: "Portfolio Tracking",
      description: "A simple yet powerful tool to track your investment portfolios with real-time performance analytics.",
      details: [
        "Portfolio monitoring: Continuous update of overall asset values and distributions.",
        "Holdings tracking: Clean interface logging average purchase prices, quantities, and current values.",
        "Investment management: Seamless adding, editing, and deleting of transacted stocks.",
        "Performance visibility: Visualized charts illustrating gains, losses, and historical growth."
      ]
    },
    {
      id: "market_news",
      name: "Market News",
      description: "Curated, up-to-the-minute stock market news and financial updates to help users make informed decisions.",
      details: [
        "Market updates: Daily overview of major indices, top gainers, and top losers.",
        "Financial news: Timely reports covering corporate announcements, earnings, and macro events.",
        "Educational insights: Explanations of how news events impact stock market dynamics."
      ]
    },
    {
      id: "trivia_rewards",
      name: "Trivia Rewards",
      description: "StockBeacon Trivia is an interactive learning feature where users answer stock market and investing questions. Users can improve financial knowledge while earning reward coins and engaging with educational content.",
      details: [
        "What is Trivia: A gamified terminal presenting multiple-choice questions on stock market fundamentals.",
        "Why it exists: To make financial literacy engaging, accessible, and rewarding.",
        "How users earn coins: Correct answers grant users coins that are added to their profiles.",
        "Difficulty levels: Offers quizzes spanning Beginner, Intermediate, and Advanced tiers.",
        "Learning-focused design: Answers include detailed explanations of concepts to reinforce learning.",
        "Reward system: Tracks coins and logs them on a virtual coin display widget.",
        "Benefits for beginners: Simplifies complex financial terms into bite-sized trivia, building confidence before trading."
      ]
    },
    {
      id: "stock_education",
      name: "Stock Education",
      description: "Structured explanations of key financial definitions, ratios (like PE Ratio), and investing concepts."
    },
    {
      id: "market_insights",
      name: "Market Insights",
      description: "Deeper analytics and data visualizers interpreting active stock charts."
    },
    {
      id: "premium",
      name: "Future Premium Features",
      description: "Upcoming options that will offer institutional-grade capabilities to users.",
      details: [
        "Advanced AI analytics: Automated predictive alerts and news sentiment filters.",
        "Unlimited portfolio tracking: Watchlists and portfolios without caps.",
        "Custom notification systems: Integrated SMS and Email alerts."
      ]
    }
  ],
  features: {
    premium: {
      status: "Currently, StockBeacon services are completely free during our launch/beta phase. We plan to introduce premium tiers soon, which will include advanced AI analytics, unlimited portfolio tracking, and custom notification systems.",
      details: "Premium plans are currently in development and will offer deeper analytics, priority AI responses, and an ad-free experience."
    }
  },
  chatbot: {
    capabilities: "🤖 **What I can do for you**:\n\n" +
                  "I am your official StockBeacon Assistant. Here is how I can help:\n\n" +
                  "* **📈 Stock Market Insights**: Ask me general investing questions (e.g. 'Explain PE Ratio' or 'What is market capitalization?').\n" +
                  "* **🔔 AI Stock Alerts**: Explanations of price-based alerts, market monitoring, and user notification configurations.\n" +
                  "* **💼 Portfolio Tracker**: Insights on portfolio monitoring, holding tracking, and performance visibility.\n" +
                  "* **📰 Market News**: Information on how stock updates and corporate news are structured.\n" +
                  "* **🎯 Trivia Rewards**: Rules and rewards, earning coins, quiz difficulty levels, and beginner guidelines.\n" +
                  "* **🏢 About StockBeacon**: Access details on company mission, vision, premium launch plans, and founder info."
  }
};

module.exports = knowledgeBase;
