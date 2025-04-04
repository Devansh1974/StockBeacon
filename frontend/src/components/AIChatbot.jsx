import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';

const AIChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about the stock market 📈' }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastBotMessageIdx, setLastBotMessageIdx] = useState(0);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { from: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:6900/api/chat', { query: userInput }, {
        withCredentials: true,
      });

      const aiReply = response.data.reply;
      setMessages([...newMessages, { from: 'bot', text: aiReply }]);
      setLastBotMessageIdx(newMessages.length); // Index where bot replied
    } catch (error) {
      setMessages([...newMessages, { from: 'bot', text: 'Error getting AI response.' }]);
      console.error('AI Chat Error:', error);
    }

    setLoading(false);
  };

  const renderMessage = (msg, idx) => {
    const isBot = msg.from === 'bot';
    const isLatestBotMsg = isBot && idx === lastBotMessageIdx;

    return (
      <div
        key={idx}
        className={`p-2 rounded max-w-xs ${
          isBot
            ? 'bg-gray-200 text-black'
            : 'bg-blue-600 text-white text-right ml-auto'
        }`}
      >
        {isLatestBotMsg ? (
          <Typewriter
            words={[msg.text]}
            loop={1}
            typeSpeed={40}
            deleteSpeed={0}
            cursor
            cursorStyle="_"
          />
        ) : (
          msg.text
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg hover:bg-gray-700 z-50"
      >
        🤖
      </button>

      {isChatOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 flex flex-col">
          <button
            onClick={toggleChat}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold mb-2 mt-8">📊 StockBot</h3>

          <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-1">
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            {loading && <div className="text-gray-500 text-sm">Analyzing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Ask about stocks..."
              className="flex-1 border p-2 rounded-l"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-r"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
