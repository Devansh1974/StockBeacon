import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDetails = localStorage.getItem("user");

    if (token && userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user details:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTimeout(() => navigate("/login"), 200);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Your Portfolio" },
    { path: "/alerts", label: "Keep Alert" },
    { path: "/trivia", label: "Trivia" },
    { path: "/news", label: "News" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-3xl font-bold text-indigo-600">Stock Beacon</div>

        {/* Hamburger Icon (mobile) */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${
                currentPath === path ? "text-indigo-600 font-semibold" : "text-gray-700"
              } hover:text-indigo-600`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <FaUserCircle className="text-2xl text-indigo-600" />
                <span className="text-gray-700 text-sm font-medium">
                  {user.username || (user.email ? user.email.split('@')[0] : 'User')}
                </span>
              </div>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-gray-800 truncate">{user.username || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-3 mt-4 px-2">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${
                currentPath === path ? "text-indigo-600 font-semibold" : "text-gray-700"
              } hover:text-indigo-600`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col items-start border-t border-gray-100 pt-3 mt-3">
              <div className="flex items-center gap-3 mt-2 px-2">
                <FaUserCircle className="text-3xl text-indigo-600" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">{user.username || 'User'}</span>
                  <span className="text-gray-500 text-xs">{user.email}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-sm font-medium text-red-500 hover:text-red-700 mt-4 px-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mt-2"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
