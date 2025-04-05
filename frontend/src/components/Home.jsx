import React, { useEffect, useRef, useState } from "react";
import AIChatbot from "./AIChatbot";

const Home = () => {
  const tradingViewContainer = useRef(null);
  const chartContainer = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState("BSE:SENSEX");

  useEffect(() => {
    if (!tradingViewContainer.current) return;
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

  useEffect(() => {
    if (!chartContainer.current || !selectedIndex) return;

    setTimeout(() => {
      chartContainer.current.innerHTML = "";

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
    }, 500);

    return () => {
      if (chartContainer.current) chartContainer.current.innerHTML = "";
    };
  }, [selectedIndex]);

  return (
    <div className="container mx-auto p-4 relative">
      {/* Ticker Widget */}
      <div
        ref={tradingViewContainer}
        className="tradingview-widget-container mb-6"
      ></div>

      {/* Index Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          { label: "NIFTY 50", value: "NSE:NIFTY" },
          { label: "SENSEX", value: "BSE:SENSEX" },
          { label: "BANK NIFTY", value: "NSE:BANKNIFTY" },
        ].map((index) => (
          <button
            key={index.value}
            onClick={() => setSelectedIndex(index.value)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              selectedIndex === index.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {index.label}
          </button>
        ))}
      </div>

      {/* Chart Widget */}
      <div
        ref={chartContainer}
        className="tradingview-widget-container mb-6"
      ></div>

      {/* Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Home;
