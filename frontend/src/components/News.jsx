import React from 'react';

const MarketNews = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      {/* Top Navigation */}
      <div className="flex items-center border-b pb-4 mb-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <span className="text-indigo-600 font-bold text-2xl">lo</span>
            <span className="text-indigo-600 font-bold text-2xl">go</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-4">News</a>
            <a href="#" className="text-gray-500 font-medium">Markets</a>
            <a href="#" className="text-gray-500 font-medium">Portfolio</a>
            <a href="#" className="text-gray-500 font-medium">Watchlist</a>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Market News Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Market News</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 text-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* News Categories */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full">All News</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">Dividends</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">AGM Updates</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">Quarterly Results</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">M&A</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">Market Updates</button>
        <button className="px-4 py-2 bg-white text-gray-700 text-sm rounded-full border">IPO News</button>
      </div>

      {/* Featured News */}
      <div className="relative rounded-lg overflow-hidden mb-6 h-64">
        <img 
          src="/api/placeholder/800/400" 
          alt="Trading floor with multiple screens showing market data" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="inline-block bg-blue-500 text-xs px-2 py-1 rounded mb-2">Breaking News</div>
          <h2 className="text-xl font-bold mb-1">Federal Reserve Announces Unexpected Rate Cut</h2>
          <p className="text-sm opacity-90">Markets respond positively as Fed implements emergency measures to support economic growth</p>
        </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* News Item 1 */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Quarterly Results</span>
              <div className="flex space-x-2">
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">Apple Reports Record Q4 Earnings</h3>
            <p className="text-gray-700 mb-2">Tech giant exceeds market expectations with $90.1B revenue in Q4, driven by strong iPhone sales and services growth.</p>
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2 hours ago · 5 min read</span>
            </div>
          </div>

          {/* News Item 2 */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Dividends</span>
              <div className="flex space-x-2">
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">Microsoft Announces Special Dividend</h3>
            <p className="text-gray-700 mb-2">Microsoft declares special dividend of $3 per share, returning $25 billion to shareholders.</p>
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>4 hours ago · 3 min read</span>
            </div>
          </div>

          {/* News Item 3 */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">M&A</span>
              <div className="flex space-x-2">
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">Amazon Acquires AI Startup</h3>
            <p className="text-gray-700 mb-2">E-commerce giant expands AI capabilities with $1.2B acquisition of emerging tech startup.</p>
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>6 hours ago · 4 min read</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Trending Topics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium mr-3">01</div>
                <div>
                  <h4 className="font-medium text-gray-800">Tech Sector Rally</h4>
                  <p className="text-xs text-gray-500">2.5k readers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium mr-3">02</div>
                <div>
                  <h4 className="font-medium text-gray-800">Crypto Market Update</h4>
                  <p className="text-xs text-gray-500">1.8k readers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium mr-3">03</div>
                <div>
                  <h4 className="font-medium text-gray-800">Oil Price Surge</h4>
                  <p className="text-xs text-gray-500">1.2k readers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-gray-500">Today's Mood</p>
                  <p className="text-lg font-semibold text-green-500">Bullish</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Positive</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Negative</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNews;