import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';

const AIChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // 📝 Professional Welcome Message (Feature 6 & 7)
  const welcomeMessage = `👋 Welcome to StockBeacon!

I can help with:

📈 Stock Market Insights
🔔 AI Stock Alerts
💼 Portfolio Tracking
📰 Market News
🎯 Trivia Rewards
🏢 About StockBeacon

Try asking:

• What is StockBeacon?
• How do AI Alerts work?
• Who founded StockBeacon?`;

  const [messages, setMessages] = useState([
    { from: 'bot', text: welcomeMessage, timestamp: new Date().toISOString() }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastBotMessageIdx, setLastBotMessageIdx] = useState(0);
  const messagesEndRef = useRef(null);

  // 🎯 Conversation Starter Cards (Feature 7)
  const starterCards = [
    { icon: "📈", title: "Learn About Investing", description: "Explain PE Ratio", query: "Explain PE Ratio" },
    { icon: "🔔", title: "Explore AI Alerts", description: "How alerts work", query: "How do AI Alerts work?" },
    { icon: "💼", title: "Portfolio Tracker", description: "Track your portfolio", query: "How can I track my portfolio?" },
    { icon: "🎯", title: "Trivia Rewards", description: "Earn coins and learn", query: "How do Trivia rewards work?" },
    { icon: "🏢", title: "About StockBeacon", description: "What is StockBeacon?", query: "What is StockBeacon?" }
  ];

  // 🏷️ Suggested Question Chips (Feature 8)
  const suggestedChips = [
    "What is StockBeacon?",
    "How do AI Alerts work?",
    "Who founded StockBeacon?",
    "How does Trivia work?",
    "Explain PE Ratio"
  ];

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // ✉️ Send message handler supporting direct input and chips/cards
  const handleSend = async (customText = null) => {
    const textToSend = customText || userInput;
    if (!textToSend.trim()) return;

    // Create the message flow state
    const newMessages = [...messages, { from: 'user', text: textToSend, timestamp: new Date().toISOString() }];
    setMessages(newMessages);
    
    // Clear the message input if it wasn't a chip/card click
    if (!customText) {
      setUserInput('');
    }
    
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:6900'}/api/chat`, 
        { query: textToSend }, 
        { withCredentials: true }
      );
      const aiReply = response.data.reply;

      setMessages([
        ...newMessages,
        { from: 'bot', text: aiReply, timestamp: new Date().toISOString() }
      ]);
      setLastBotMessageIdx(newMessages.length);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages([
        ...newMessages,
        { from: 'bot', text: 'Error getting AI response. Please try again.', timestamp: new Date().toISOString() }
      ]);
    }

    setLoading(false);
  };

  const renderMessage = (msg, idx) => {
    const isBot = msg.from === 'bot';
    const isLatestBotMsg = isBot && idx === lastBotMessageIdx;

    return (
      <div key={idx} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
        <div className="flex items-start">
          {isBot && <img src="/bot-avatar.png" alt="Bot" className="w-8 h-8 rounded-full mr-2 mt-1 shadow-sm" />}
          <div className={`p-3 rounded-lg max-w-[80%] break-words text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
            isBot 
              ? 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200' 
              : 'bg-indigo-600 text-white rounded-tr-none'
          }`}>
            {isLatestBotMsg ? (
              <Typewriter words={[msg.text]} loop={1} typeSpeed={20} deleteSpeed={0} cursor cursorStyle="_" />
            ) : (
              msg.text
            )}
          </div>
          {!isBot && <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full ml-2 mt-1 shadow-sm" />}
        </div>
        <div className={`text-[10px] text-gray-400 mt-1 ${isBot ? 'pl-10' : 'pr-10'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 z-50 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        aria-label="Toggle StockBeacon AI Assistant"
      >
        🤖
      </button>

      {isChatOpen && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[420px] lg:w-[460px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-150 transition-all duration-300 animate-slide-in">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-indigo-50/50 mt-12">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">StockBeacon Assistant</h3>
                <p className="text-[10px] text-green-600 font-medium flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1 animate-pulse"></span>
                  Active
                </p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-450 hover:text-gray-700 text-xl p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Chat History Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            
            {/* 🎯 Starter Cards (Moved ABOVE the welcome message - Feature 7) */}
            {messages.length === 1 && (
              <div className="mb-2">
                <div className="grid grid-cols-2 gap-2 mt-2 px-10">
                  {starterCards.map((card, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSend(card.query)}
                      className={`p-3 border border-gray-255 border-gray-200 rounded-xl hover:bg-indigo-50/60 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex flex-col items-start bg-white text-left active:scale-98 ${
                        cIdx === 4 ? 'col-span-2' : ''
                      }`}
                      disabled={loading}
                    >
                      <span className="text-lg mb-1">{card.icon}</span>
                      <span className="text-xs font-semibold text-gray-800">{card.title}</span>
                      <span className="text-[9px] text-gray-400 mt-0.5 font-medium">{card.description}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100 my-4 mx-10"></div>
              </div>
            )}

            {messages.map((msg, idx) => renderMessage(msg, idx))}
            
            {/* Thinking / Loading indicator */}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs pl-10 py-1">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="font-medium text-[10px]">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Footer Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white">
            {/* 🏷️ Suggestion Chips (Shown above input only when chat is active - Feature 8) */}
            {messages.length > 1 && (
              <div 
                className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {suggestedChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="flex-shrink-0 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 hover:scale-102 transition-all cursor-pointer whitespace-nowrap active:scale-98"
                    disabled={loading}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask about stocks or StockBeacon..."
                className="flex-1 border border-gray-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                className="bg-indigo-600 text-white text-sm px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 font-semibold cursor-pointer active:scale-98"
                disabled={loading || !userInput.trim()}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatbot;
