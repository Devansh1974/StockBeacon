import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaCheckCircle, FaBell, FaChartLine } from 'react-icons/fa';

const KeepAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlert, setNewAlert] = useState({ ticker: '', targetPrice: '', condition: 'Above' });
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6900';

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/alerts`, { withCredentials: true });
      setAlerts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/alerts`, newAlert, { withCredentials: true });
      setShowAddModal(false);
      setNewAlert({ ticker: '', targetPrice: '', condition: 'Above' });
      fetchAlerts();
    } catch (err) {
      console.error(err);
      alert("Failed to create alert.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this alert?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/alerts/${id}`, { withCredentials: true });
        fetchAlerts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading Alerts...</div>;

  const activeAlerts = alerts.filter(a => a.status === 'Active');
  const triggeredAlerts = alerts.filter(a => a.status === 'Triggered');
  const triggeredToday = triggeredAlerts.filter(a => new Date(a.triggeredAt).toDateString() === new Date().toDateString());

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Stock Alerts</h2>
          <p className="text-gray-500 font-medium">Get notified when stocks cross your target prices</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <FaPlus size={14} /> New Alert
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Active Alerts</p>
            <p className="text-3xl font-extrabold text-gray-900">{activeAlerts.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <FaBell size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Triggered Today</p>
            <p className="text-3xl font-extrabold text-gray-900">{triggeredToday.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <FaCheckCircle size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Triggered</p>
            <p className="text-3xl font-extrabold text-gray-900">{triggeredAlerts.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
            <FaChartLine size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Alerts</p>
            <p className="text-3xl font-extrabold text-gray-900">{alerts.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
            <span className="font-bold text-xl">#</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Alerts List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 ml-1">Watching ({activeAlerts.length})</h3>
          
          {activeAlerts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3"><FaBell size={24}/></div>
              <p className="text-gray-500 font-medium">No active alerts.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map(alert => (
                <div key={alert._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden transition-all hover:shadow-md">
                  <div className={`absolute top-0 left-0 w-1 h-full ${alert.condition === 'Above' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="pl-3">
                      <h4 className="font-extrabold text-lg text-gray-900 leading-tight">{alert.ticker}</h4>
                      <p className="text-xs text-gray-500 font-medium">{new Date(alert.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(alert._id)}
                      className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="ml-3 bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">
                      Drops {alert.condition}
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(alert.targetPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Triggered History */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 ml-1">Alert History</h3>
          
          {triggeredAlerts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-400 mb-3"><FaCheckCircle size={28}/></div>
              <p className="text-gray-500 font-medium">No alerts have triggered yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Triggered On</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {triggeredAlerts.map(alert => (
                      <tr key={alert._id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{alert.ticker}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-700">
                            {alert.condition} {formatCurrency(alert.targetPrice)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {new Date(alert.triggeredAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-700 border border-green-200">
                            Triggered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button 
                            onClick={() => handleDelete(alert._id)}
                            className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 mt-2">Create Price Alert</h3>
            <form onSubmit={handleCreateAlert} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ticker Symbol</label>
                <input 
                  type="text" 
                  placeholder="e.g. RELIANCE.NS" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium"
                  value={newAlert.ticker}
                  onChange={(e) => setNewAlert({...newAlert, ticker: e.target.value.toUpperCase()})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Condition</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900"
                    value={newAlert.condition}
                    onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                  >
                    <option value="Above">Goes Above</option>
                    <option value="Below">Drops Below</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Target Price</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="2500" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-xl mt-4 border border-indigo-100">
                <p className="text-xs text-indigo-800 font-medium flex gap-2">
                  <FaBell className="mt-0.5 text-indigo-500 flex-shrink-0" />
                  We will check prices automatically and notify you here when the condition is met.
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-2">
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
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default KeepAlert;