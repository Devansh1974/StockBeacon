import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import image from '../assets/image.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch('http://localhost:6900/api/auth/login', { 
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email })); // Store user details
          setMessage('Login successful!');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setMessage(data.msg || 'Login failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex bg-white">
      <div className="w-full md:w-1/2 p-4 flex flex-col">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Log in</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                placeholder="johndoe@email.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="block text-gray-700">Password</label>
                <a href="#" className="text-indigo-600 text-sm">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                  placeholder="••••••••••••••"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition-colors duration-200 mb-4"
            >
              Login
            </button>
            
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account? <Link to="/signup" className="text-indigo-600">Create an Account?</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 md:h-2/3 bg-gray-200 items-center justify-center mt-15">
        <img src={image} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
