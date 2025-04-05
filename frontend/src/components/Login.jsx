import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import image from '../assets/image.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:6900/login', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }));
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage(data.msg || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during login:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:6900/auth/google', '_self');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome back 👋</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded transition-colors duration-200 mb-4 flex justify-center ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Error or Success Message */}
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 flex items-center justify-center border border-gray-300 rounded mt-4 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle className="text-xl mr-2" /> Continue with Google
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img src={image} alt="Login Illustration" className="max-w-full h-auto p-6" />
      </div>
    </div>
  );
};

export default Login;
