import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaPlus, FaTrash } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ ticker: '', shares: '', avgPrice: '' });
  const [selectedTicker, setSelectedTicker] = useState(null);
  const tvContainer = useRef(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6900';

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/portfolio`, { withCredentials: true });
      setPortfolioData(res.data);
      if (res.data.holdings && res.data.holdings.length > 0 && !selectedTicker) {
        setSelectedTicker(res.data.holdings[0].ticker);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // TradingView Widget logic
  useEffect(() => {
    if (!tvContainer.current || !selectedTicker) return;
    
    // Prevent duplicate injection in strict mode
    if (tvContainer.current.querySelector('script')) return;
    
    tvContainer.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: selectedTicker,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "1M",
      colorTheme: "light",
      isTransparent: true,
      autosize: true,
      largeChartUrl: ""
    });

    tvContainer.current.appendChild(script);
    
    return () => {
      // Cleanup for hot reloads / strict mode
      if (tvContainer.current) tvContainer.current.innerHTML = "";
    };
  }, [selectedTicker]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/portfolio/add`, newTx, { withCredentials: true });
      setShowAddModal(false);
      setNewTx({ ticker: '', shares: '', avgPrice: '' });
      setSelectedTicker(newTx.ticker.toUpperCase()); // Point chart to new asset
      fetchPortfolio();
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this holding?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/portfolio/remove/${id}`, { withCredentials: true });
         // Reset selected ticker if we just deleted it
        setSelectedTicker(null);
        fetchPortfolio();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading Portfolio metrics...</div>;

  const { holdings, totalValue, totalInvested, totalGainLoss, totalReturn } = portfolioData || { holdings: [] };

  const isPositive = totalGainLoss >= 0;

  // Chart Data
  const chartData = {
    labels: holdings.map(h => h.ticker),
    datasets: [{
      data: holdings.map(h => h.currentValue),
      backgroundColor: ['#4f46e5', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      borderWidth: 0,
    }]
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Portfolio</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <FaPlus size={14} /> Add Holding
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2 relative z-10">Total Value</h3>
          <p className="text-3xl font-bold text-gray-900 relative z-10">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}></div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2 relative z-10">Total Gain/Loss</h3>
          <p className={`text-3xl font-bold relative z-10 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive && totalGainLoss > 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}></div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2 relative z-10">Total Return</h3>
          <p className={`text-3xl font-bold relative z-10 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive && totalReturn > 0 ? '+' : ''}{totalReturn?.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Holdings List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 ml-1">Your Assets</h3>
          {holdings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-2">📈</div>
              <p className="text-gray-500 font-medium">No holdings yet. Add your first stock to start tracking!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price / Avg</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Holdings</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">P&L</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {holdings.map((h) => {
                      const isProfitable = h.gainLoss >= 0;
                      return (
                        <tr 
                          key={h._id} 
                          className={`hover:bg-gray-50 transition-colors cursor-pointer group ${selectedTicker === h.ticker ? 'bg-indigo-50/50' : ''}`}
                          onClick={() => setSelectedTicker(h.ticker)}
                        >
                          <td className="px-6 py-5 whitespace-nowrap relative">
                            {selectedTicker === h.ticker && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-md"></div>
                            )}
                            <div className="font-bold text-gray-900">{h.ticker}</div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-gray-900 font-semibold">{formatCurrency(h.currentPrice)}</div>
                            <div className="text-xs text-gray-500 mt-1 font-medium">Avg {formatCurrency(h.avgPrice)}</div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-gray-900 font-semibold">{formatCurrency(h.currentValue)}</div>
                            <div className="text-xs text-gray-500 mt-1 font-medium">{h.shares} Shares</div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className={`font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                              {isProfitable && h.gainLoss > 0 ? '+' : ''}{formatCurrency(h.gainLoss)}
                            </div>
                            <div className={`text-xs mt-1 font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                              {isProfitable && h.gainLossPercent > 0 ? '+' : ''}{h.gainLossPercent?.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-right">
                            <button 
                              onClick={(e) => handleDelete(h._id, e)} 
                              className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all font-bold"
                              title="Delete Holding"
                            >
                              <FaTrash size={14}/>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel (Pie Chart & Mini Chart) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Allocation</h3>
            {holdings.length > 0 ? (
              <div className="h-48 md:h-56 flex justify-center pb-2">
                <Pie 
                  data={chartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8 } }
                    }
                  }} 
                />
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-sm text-gray-400 font-medium">
                Add assets to see allocation
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Live Trend {selectedTicker ? `(${selectedTicker})` : ''}</h3>
            <div className="h-64 rounded-xl overflow-hidden bg-gray-50" ref={tvContainer}>
              {!selectedTicker && (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                  Select an asset to view chart
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 mt-2">New Transaction</h3>
            <form onSubmit={handleAddTransaction} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ticker Symbol</label>
                <input 
                  type="text" 
                  placeholder="e.g. RELIANCE.NS" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium"
                  value={newTx.ticker}
                  onChange={(e) => setNewTx({...newTx, ticker: e.target.value.toUpperCase()})}
                  required
                />
                <p className="text-xs text-gray-500 mt-2 font-medium">Add .NS for NSE or .BO for BSE (e.g. TCS.NS)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Shares</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="10" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium"
                    value={newTx.shares}
                    onChange={(e) => setNewTx({...newTx, shares: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Avg Buy Price</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="2500" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium"
                    value={newTx.avgPrice}
                    onChange={(e) => setNewTx({...newTx, avgPrice: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;