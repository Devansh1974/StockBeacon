import React, { useState } from 'react';

const AIChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Fixed AI Chatbot Icon (Larger Size) */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg hover:bg-gray-700 transition-colors duration-200 z-50"
        aria-label="Open AI Chat"
      >
        🤖
      </button>

      {/* Toggleable Chat Sidebar (Wider) */}
      {isChatOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50 transition-transform duration-300">
          <button
            onClick={toggleChat}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            aria-label="Close Chat"
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Assistant</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Hello! How can I assist you with StockBeacon?</p>
            <p className="text-gray-600">Ask me about stock trends, portfolio tips, or anything!</p>
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;