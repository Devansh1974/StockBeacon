import React, { useState } from 'react';

const ManageStockAlerts = () => {
  const [activeAlerts] = useState([
    {
      id: 1,
      ticker: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      targetPrice: '₹2,800.00',
      condition: 'Above',
      currentPrice: '₹2,785.45',
      created: '2 days ago'
    },
    {
      id: 2,
      ticker: 'TCS',
      name: 'Tata Consultancy Services Ltd.',
      targetPrice: '₹3,900.00',
      condition: 'Below',
      currentPrice: '₹3,925.30',
      created: '5 days ago'
    },
    {
      id: 3,
      ticker: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd.',
      targetPrice: '₹1,200.00',
      condition: 'Above',
      currentPrice: '₹1,185.65',
      created: '1 day ago'
    }
  ]);

  const [alertHistory] = useState([
    {
      id: 4,
      ticker: 'HDFCBANK',
      name: 'HDFC Bank Ltd.',
      condition: 'Above ₹1,650.00',
      created: 'Jan 15, 2024',
      triggered: 'Jan 18, 2024',
      status: 'Triggered'
    },
    {
      id: 5,
      ticker: 'INFY',
      name: 'Infosys Ltd.',
      condition: 'Below ₹1,540.00',
      created: 'Jan 10, 2024',
      triggered: 'Jan 16, 2024',
      status: 'Expired'
    }
  ]);

  return (
    <div className="bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-2">Manage Stock Alerts</h1>
      <p className="text-gray-600 mb-4">Monitor and manage your stock price alerts in one place</p>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Active Alerts</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="text-gray-700">🔔</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Triggered Today</p>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="text-green-500">✓</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-2xl font-bold">89%</p>
          </div>
          <div className="text-yellow-500">📊</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Alerts</p>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="text-purple-500">🔄</div>
        </div>
      </div>

      {/* Active Alerts Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Alerts</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm">
              Filter
            </button>
            <button className="px-3 py-1 bg-black text-white rounded-md text-sm">
              New Alert
            </button>
          </div>
        </div>

        {/* Alert Cards */}
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`bg-white rounded-lg shadow-sm ${alert.ticker === 'RELIANCE' ? 'border-2 border-blue-500' : ''}`}>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                    <h3 className="ml-2 text-lg font-semibold">{alert.ticker}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400">✏️</button>
                    <button className="text-gray-400">🗑️</button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{alert.name}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex justify-between text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Target Price</p>
                  <p className="font-medium">{alert.condition} {alert.targetPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Current Price</p>
                  <p className="font-medium">{alert.currentPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Created</p>
                  <p className="font-medium">{alert.created}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Alert History</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Triggered</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statusz</th>
              </tr>
            </thead>
            <tbody>
              {alertHistory.map((alert) => (
                <tr key={alert.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{alert.ticker}</div>
                    <div className="text-sm text-gray-500">{alert.name}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{alert.condition}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{alert.created}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{alert.triggered}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.status === 'Triggered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStockAlerts;