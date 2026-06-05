import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import KeepAlert from './components/KeepAlert';
import News from './components/News';
import Trivia from './components/Trivia';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Landing from './components/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

// 🌐 Configure Axios defaults on initial load
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// 🛡️ Global Axios interceptor to handle 401 Unauthorized errors (expired session)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request detected - clearing session");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      
      // If we are not already on the login or signup page, redirect to login with expiration notification
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

const App = () => {
  // 🔄 Sync active backend session details on application mount (critical for Google OAuth login support)
  useEffect(() => {
    const syncSession = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:6900'}/auth/me`, 
          { withCredentials: true }
        );
        if (response.data && response.data.user) {
          const u = response.data.user;
          localStorage.setItem('user', JSON.stringify({ username: u.username, email: u.email }));
          localStorage.setItem('userId', u._id);
        }
      } catch (err) {
        console.log("No active backend session found or user logged out:", err.message || err);
      }
    };
    syncSession();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={localStorage.getItem("token") || localStorage.getItem("userId") ? <Home /> : <Landing />} />
            <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><KeepAlert /></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="/trivia" element={<ProtectedRoute><Trivia /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;