import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
          <li className="relative">
            <Link to="/" className={`hover:text-gray-800 transition-colors duration-200 ${currentPath === '/' ? 'text-gray-800' : ''}`}>
              Home
              {currentPath === '/' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
            </Link>
          </li>
          <li className="relative">
            <Link to="/portfolio" className={`hover:text-gray-800 transition-colors duration-200 ${currentPath === '/portfolio' ? 'text-gray-800' : ''}`}>
              Your Portfolio
              {currentPath === '/portfolio' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
            </Link>
          </li>
          <li className="relative">
            <Link to="/alerts" className={`hover:text-gray-800 transition-colors duration-200 ${currentPath === '/alerts' ? 'text-gray-800' : ''}`}>
              Keep Alert
              {currentPath === '/alerts' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
            </Link>
          </li>
          <li className="relative">
            <Link to="/trivia" className={`hover:text-gray-800 transition-colors duration-200 ${currentPath === '/trivia' ? 'text-gray-800' : ''}`}>
              Trivia
              {currentPath === '/trivia' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
            </Link>
          </li>
          <li className="relative">
            <Link to="/news" className={`hover:text-gray-800 transition-colors duration-200 ${currentPath === '/news' ? 'text-gray-800' : ''}`}>
              News
              {currentPath === '/news' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search stocks..."
            className="bg-gray-100 text-gray-800 text-sm p-2 pl-4 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <span className="absolute right-3 top-2 text-gray-500">🔍</span>
        </div>

        {/* Sign In Button */}
        <Link to="/login">
          <button className="bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-200">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;