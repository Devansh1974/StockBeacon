import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="text-2xl font-bold text-indigo-600">Stock Beacon</div>

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
          <span className="text-xl cursor-pointer">🔍</span>
          {user ? (
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-2xl text-indigo-600" title={user.email} />
              <span className="text-gray-700 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700"
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
          <span className="text-xl cursor-pointer">🔍</span>
          {user ? (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mt-2">
                <FaUserCircle className="text-2xl text-indigo-600" />
                <span className="text-gray-700 text-sm">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-sm text-red-500 hover:text-red-700 mt-1"
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
