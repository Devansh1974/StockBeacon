import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user authentication on component mount
    const token = localStorage.getItem("token");
    const userDetails = localStorage.getItem("user");

    if (token && userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user details:", error);
        // Clear invalid token and user details
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Update state to trigger re-render

    // Navigate to login page after logout
    setTimeout(() => {
      navigate("/login");
    }, 200); // Delay of 200ms
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600">Stock Beacon</div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className={`${
            currentPath === "/" ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600`}
        >
          Home
        </Link>
        <Link
          to="/portfolio"
          className={`${
            currentPath === "/portfolio" ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600`}
        >
          Your Portfolio
        </Link>
        <Link
          to="/alerts"
          className={`${
            currentPath === "/alerts" ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600`}
        >
          Keep Alert
        </Link>
        <Link
          to="/trivia"
          className={`${
            currentPath === "/trivia" ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600`}
        >
          Trivia
        </Link>
        <Link
          to="/news"
          className={`${
            currentPath === "/news" ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600`}
        >
          News
        </Link>
      </div>

      {/* Search and User Section */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <span className="text-xl cursor-pointer">🔍</span>

        {/* User Authentication */}
        {user ? (
          <div className="relative flex items-center">
            {/* Profile Picture (If Available) */}
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-600"
                onClick={() => navigate("/profile")}
                title="Go to Profile"
              />
            ) : (
              <FaUserCircle
                className="text-3xl text-indigo-600 cursor-pointer"
                title="Go to Profile"
                onClick={() => navigate("/profile")}
              />
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-3 text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
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
    </nav>
  );
};

export default Navbar;
