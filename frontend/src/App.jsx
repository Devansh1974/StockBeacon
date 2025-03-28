import React from 'react';
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

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto mt-6 p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/alerts" element={<KeepAlert />} />
            <Route path="/news" element={<News />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;