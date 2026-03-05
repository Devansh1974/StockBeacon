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
import Landing from './components/Landing';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={localStorage.getItem("token") ? <Home /> : <Landing />} />
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