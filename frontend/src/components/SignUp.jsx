import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoArrowBack } from 'react-icons/io5';
import image1 from '../assets/image copy.png'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password && agreeToTerms) {
      const response = await fetch('http://localhost:6900/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        setMessage('Sign-up successful!');
        setTimeout(() => navigate('/'), 1000); // Redirect to Home
      } else {
        setMessage(data.msg || 'Sign-up failed.');
      }
      setMessage('Sign-up successful!');
      setTimeout(() => navigate('/'), 1000); // Redirect to Home
    } else { 
      setMessage('Please fill in all fields and agree to the terms.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex bg-white">
      <div className="w-full md:w-1/2 flex flex-col">
        
        
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Sign Up</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                placeholder="Enter Your Name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                placeholder="wenjing@email.com"
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
            
            <div className="mb-6 flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-gray-700 text-sm">
                By creating an account you agree to the{' '}
                <a href="#" className="text-indigo-600">terms of use</a> and our{' '}
                <a href="#" className="text-indigo-600">privacy policy</a>.
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition-colors duration-200 mb-4"
            >
              Sign Up
            </button>
            
            <div className="text-center text-gray-500 mb-4">or sign in with</div>
            
            <button
              type="button"
              className="w-full border border-gray-300 p-3 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-200"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
            
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-indigo-600 ">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* This is where you'll add your image */}
      <div className="hidden md:flex md:w-1/2 md:h-2/3 bg-gray-200 items-center justify-center mt-15">
        <img src={image1} alt="" />
      </div>
    </div>
  );
};

export default SignUp;
