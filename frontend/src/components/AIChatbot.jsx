import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';

const AIChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about the stock market.', timestamp: new Date().toISOString() }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastBotMessageIdx, setLastBotMessageIdx] = useState(0);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { from: 'user', text: userInput, timestamp: new Date().toISOString() }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:6900/api/chat', { query: userInput }, { withCredentials: true });
      const aiReply = response.data.reply;

      setMessages([
        ...newMessages,
        { from: 'bot', text: aiReply, timestamp: new Date().toISOString() }
      ]);
      setLastBotMessageIdx(newMessages.length);
    } catch (error) {
      setMessages([
        ...newMessages,
        { from: 'bot', text: 'Error getting AI response.', timestamp: new Date().toISOString() }
      ]);
    }

    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setMessages([...messages, {
      from: 'user',
      text: `Uploaded: ${file.name}`,
      timestamp: new Date().toISOString()
    }]);

    try {
      const response = await axios.post('http://localhost:6900/api/analyze-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text: response.data.analysis || 'File analysis complete.',
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text: 'Error analyzing file.',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const renderMessage = (msg, idx) => {
    const isBot = msg.from === 'bot';
    const isLatestBotMsg = isBot && idx === lastBotMessageIdx;

    return (
      <div key={idx} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center">
          {isBot && <img src="/bot-avatar.png" alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
          <div className={`p-3 rounded-lg max-w-md break-words ${isBot ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white text-right'}`}>
            {isLatestBotMsg ? (
              <Typewriter words={[msg.text]} loop={1} typeSpeed={40} deleteSpeed={0} cursor cursorStyle="_" />
            ) : (
              msg.text
            )}
          </div>
          {!isBot && <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full ml-2" />}
        </div>
        <div className="text-xs text-gray-400 mt-1 pr-2">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg hover:bg-indigo-700 z-50"
      >
        🤖
      </button>

      {isChatOpen && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[400px] lg:w-[480px] xl:w-[500px] bg-white shadow-lg p-4 z-50 flex flex-col">
          <button
            onClick={toggleChat}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold mb-3 mt-10">StockBot</h3>

          <div className="flex-1 overflow-y-auto space-y-3 mb-2 pr-1">
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            {loading && <div className="text-gray-500 text-sm">Analyzing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Ask about stocks..."
              className="flex-1 border p-2 rounded-md"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>

          <label className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer">
            <input type="file" onChange={handleFileUpload} className="hidden" />
            Upload Image/Document
          </label>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
