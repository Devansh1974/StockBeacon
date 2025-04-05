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
      <div className="tradingview-widget-container mb-4" ref={tradingViewContainer}></div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedIndex === "NSE:NIFTY" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedIndex("NSE:NIFTY")}
        >
          NIFTY 50
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedIndex === "BSE:SENSEX" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedIndex("BSE:SENSEX")}
        >
          SENSEX
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedIndex === "NSE:BANKNIFTY" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedIndex("NSE:BANKNIFTY")}
        >
          BANK NIFTY
        </button>
      </div>

      <div className="tradingview-widget-container" ref={chartContainer}></div>

      <AIChatbot />
    </div>
  );
};

export default Home;