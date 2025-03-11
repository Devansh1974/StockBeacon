import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <span className="text-xl font-bold text-blue-600">Stock</span>
        <span className="text-xl font-bold text-gray-800">Beacon</span>
      </div>

      {/* Navigation Links, Search, and Sign In */}
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-800 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="hover:text-gray-800 transition-colors duration-200">
              Your Portfolio
            </Link>
          </li>
          <li>
            <Link to="/alerts" className="hover:text-gray-800 transition-colors duration-200">
              Keep Alert
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-gray-800 transition-colors duration-200">
              News
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search stocks..."
            className="bg-gray-100 text-gray-800 text-sm p-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <span className="absolute right-3 top-2 text-gray-500">🔍</span>
        </div>

        {/* Sign In Button */}
        <Link to="/login">
          <button className="bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-200">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;