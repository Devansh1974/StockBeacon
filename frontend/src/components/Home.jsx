import React, { useState } from 'react';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="container mx-auto p-4 relative">
      {/* Stock Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">NIFTY 50</h3>
          <p className="text-2xl font-bold text-gray-800">21,894.55</p>
          <p className="text-green-500 text-sm">+1.2%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">BANK NIFTY</h3>
          <p className="text-2xl font-bold text-gray-800">46,123.45</p>
          <p className="text-green-500 text-sm">+1.5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">SENSEX</h3>
          <p className="text-2xl font-bold text-gray-800">72,562.89</p>
          <p className="text-red-500 text-sm">-0.3%</p>
        </div>
      </div>

      {/* Stock Performance and Market Mood */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Stock Performance</h3>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Graph Placeholder</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Market Mood Index</h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-16 bg-gray-100 rounded mb-2"></div>
            <p className="text-sm text-gray-600">Fear & Greed Index</p>
            <p className="text-lg font-bold text-green-500">65 - Greed</p>
          </div>
        </div>
      </div>

      {/* Trending stocks */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Trending Today</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Reliance</p>
              <p className="text-sm text-gray-600">RELIANCE</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹2,842.63</p>
              <p className="text-green-500 text-sm">+2.4%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Tata Consultancy Services</p>
              <p className="text-sm text-gray-600">TCS</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹3,876.17</p>
              <p className="text-green-500 text-sm">+1.8%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">HDFC Bank Ltd.</p>
              <p className="text-sm text-gray-600">HDFC</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹1,642.65</p>
              <p className="text-red-500 text-sm">-0.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Gainers</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Infosys</p>
              <p className="text-sm text-gray-600">INFY</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹1,450.20</p>
              <p className="text-green-500 text-sm">+3.1%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">ICICI Bank</p>
              <p className="text-sm text-gray-600">ICICI</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹1,120.75</p>
              <p className="text-green-500 text-sm">+2.7%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">HCL Technologies</p>
              <p className="text-sm text-gray-600">HCL</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹1,300.90</p>
              <p className="text-green-500 text-sm">+2.0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Losers</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Axis Bank</p>
              <p className="text-sm text-gray-600">AXIS</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹950.45</p>
              <p className="text-red-500 text-sm">-1.8%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Kotak Mahindra Bank</p>
              <p className="text-sm text-gray-600">KOTAK</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹1,720.30</p>
              <p className="text-red-500 text-sm">-1.2%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Bajaj Finance</p>
              <p className="text-sm text-gray-600">BAJAJF</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹6,500.15</p>
              <p className="text-red-500 text-sm">-0.9%</p>
            </div>
          </div>
        </div>
      </div>

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
            <p className="text-gray-600">Hello! How can I assist you with StockBeacon I?</p>
            <p className="text-gray-600">Ask me about stock trends, portfolio tips, or anything!</p>
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;