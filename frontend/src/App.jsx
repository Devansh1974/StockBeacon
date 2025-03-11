import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto mt-6 p-4 flex-grow">
          <Routes>
            <Route path="/" element={<h2 className="text-2xl font-semibold text-gray-800">Home</h2>} />
            <Route path="/portfolio" element={<h2 className="text-2xl font-semibold text-gray-800">Your Portfolio</h2>} />
            <Route path="/alerts" element={<h2 className="text-2xl font-semibold text-gray-800">Keep Alert</h2>} />
            <Route path="/news" element={<h2 className="text-2xl font-semibold text-gray-800">News</h2>} />
            <Route path="/login" element={<h2 className="text-2xl font-semibold text-gray-800">Login</h2>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;