import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaRobot, FaBell, FaGraduationCap } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-center px-4 py-12 rounded-2xl shadow-sm border border-indigo-100">
      
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
        Smarter Investing <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
          Starts Here.
        </span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Track real-time market indices, analyze your portfolio, and leverage our 
        AI-powered Stock Assistant to navigate the financial world with confidence.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center max-w-md">
        <Link 
          to="/signup" 
          className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Make Account
        </Link>
        <Link 
          to="/login" 
          className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-600 border-2 border-indigo-100 rounded-lg font-semibold text-lg shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-all transform hover:-translate-y-0.5"
        >
          Login
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full text-left">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            <FaChartLine />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Live Markets</h3>
          <p className="text-gray-600 flex-grow">Track real-time data for NIFTY, SENSEX, and BANK NIFTY to stay ahead.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            <FaRobot />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">AI Chatbot</h3>
          <p className="text-gray-600 flex-grow">Ask complex stock questions and get instant, intelligent analysis from our AI.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            <FaBell />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Alerts</h3>
          <p className="text-gray-600 flex-grow">Set custom thresholds and receive instant notifications for your favorite stocks.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            <FaGraduationCap />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Learn & Earn</h3>
          <p className="text-gray-600 flex-grow">Participate in interactve trivia to build a strong foundation playfully.</p>
        </div>

      </div>

    </div>
  );
};

export default Landing;
