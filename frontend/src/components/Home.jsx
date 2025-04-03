import React, { useEffect, useRef, useState } from "react";
import AIChatbot from "./AIChatbot";

const Home = () => {
  const tradingViewContainer = useRef(null);
  const chartContainer = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState("BSE:SENSEX"); // ✅ Sensex as default

  // ✅ Load TradingView Ticker Widget (Only Once)
  useEffect(() => {
    if (!tradingViewContainer.current) return;

    // ✅ Clear previous scripts
    tradingViewContainer.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: "NIFTY 50", proName: "NSE:NIFTY" },
        { description: "SENSEX", proName: "BSE:SENSEX" },
        { description: "BANK NIFTY", proName: "NSE:BANKNIFTY" },
        { description: "Reliance", proName: "NSE:RELIANCE" },
        { description: "TCS", proName: "NSE:TCS" },
        { description: "Infosys", proName: "NSE:INFY" },
        { description: "HDFC Bank", proName: "NSE:HDFCBANK" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    });

    tradingViewContainer.current.appendChild(script);
  }, []);

  // ✅ Load Chart Widget & Prevent Blank Screen
  useEffect(() => {
    if (!chartContainer.current || !selectedIndex) return;

    // ✅ Delay to allow TradingView to load properly
    setTimeout(() => {
      chartContainer.current.innerHTML = ""; // Clear previous chart

      const chartScript = document.createElement("script");
      chartScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      chartScript.async = true;
      chartScript.innerHTML = JSON.stringify({
        symbol: selectedIndex,
        width: "100%",
        height: "500",
        theme: "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_top_toolbar: true,
        hide_legend: false,
        save_image: false,
      });

      chartContainer.current.appendChild(chartScript);
    }, 500); // ✅ Small delay prevents blank screen

    return () => {
      if (chartContainer.current) chartContainer.current.innerHTML = ""; // Cleanup old charts
    };
  }, [selectedIndex]);

  return (
    <div className="container mx-auto p-4 relative">
      {/* ✅ TradingView Ticker Widget */}
      <div className="tradingview-widget-container mb-4" ref={tradingViewContainer}></div>

      {/* ✅ Live Index Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${selectedIndex === "NSE:NIFTY" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setSelectedIndex("NSE:NIFTY")}
        >
          NIFTY 50
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedIndex === "BSE:SENSEX" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setSelectedIndex("BSE:SENSEX")}
        >
          SENSEX
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedIndex === "NSE:BANKNIFTY" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setSelectedIndex("NSE:BANKNIFTY")}
        >
          BANK NIFTY
        </button>
      </div>

      {/* ✅ TradingView Chart Widget */}
      <div className="tradingview-widget-container" ref={chartContainer}></div>

      {/* ✅ AI Chatbot Component */}
      <AIChatbot />
    </div>
  );
};

export default Home;
