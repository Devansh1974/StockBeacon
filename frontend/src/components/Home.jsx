import React, { useEffect, useRef } from 'react';
import AIChatbot from './AIChatbot';

const Home = () => {
  const tradingViewContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    if (tradingViewContainer.current) {
      tradingViewContainer.current.appendChild(script);
    }

    return () => {
      if (tradingViewContainer.current && script.parentNode) {
        tradingViewContainer.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4 relative">
      {/* TradingView Widget */}
      <div className="tradingview-widget-container" ref={tradingViewContainer}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
        <script
          type="application/json"
          className="tradingview-data-widget-embed"
        >
          {JSON.stringify({
            symbols: [
              {
                proName: 'FOREXCOM:SPXUSD',
                title: 'S&P 500 Index',
              },
              {
                proName: 'BITSTAMP:BTCUSD',
                title: 'Bitcoin',
              },
              {
                proName: 'BITSTAMP:ETHUSD',
                title: 'Ethereum',
              },
              {
                description: 'NIFTY50',
                proName: 'NSE:NIFTY',
              },
              {
                description: 'Sensex',
                proName: 'BSE:SENSEX',
              },
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: 'adaptive',
            colorTheme: 'light',
            locale: 'en',
          })}
        </script>
      </div>

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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Stock Performance
          </h3>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Graph Placeholder</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Market Mood Index
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-16 bg-gray-100 rounded mb-2"></div>
            <p className="text-sm text-gray-600">Fear & Greed Index</p>
            <p className="text-lg font-bold text-green-500">65 - Greed</p>
          </div>
        </div>
      </div>

      {/* Trending stocks */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Trending Today
        </h3>
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
              <p className="font-medium text-gray-800">
                Tata Consultancy Services
              </p>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Top Gainers
        </h3>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Top Losers
        </h3>
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
      
      {/* AI Chatbot Component */}
      <AIChatbot />
    </div>
  );
};

export default Home;