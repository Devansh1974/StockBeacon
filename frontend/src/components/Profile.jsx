import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user authentication
    const token = localStorage.getItem("token");
    const userDetails = localStorage.getItem("user");

    if (!token || !userDetails) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      try {
        setUser(JSON.parse(userDetails));
      } catch (error) {
        console.error("Error parsing user details:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>

        {user ? (
          <div>
            {/* Profile Picture */}
            <div className="mb-4">
              <img
                src={user.profilePic || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-2 border-indigo-500"
              />
            </div>

            {/* User Details */}
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Username:</span> {user.username || "N/A"}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <span className="font-semibold">Email:</span> {user.email || "N/A"}
            </p>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>

            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Go Home
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
