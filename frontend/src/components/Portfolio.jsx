import React from 'react';

const Portfolio = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Total Value</h3>
          <p className="text-2xl font-bold text-gray-800">$124,532.89</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Today's Gain/Loss</h3>
          <p className="text-2xl font-bold text-green-500">+$1,234.56</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Total Return</h3>
          <p className="text-2xl font-bold text-green-500">+12.4%</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Portfolio Breakdown</h3>
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Pie Chart Placeholder (Consumer, Tech, Finance, Healthcare, Others)</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;