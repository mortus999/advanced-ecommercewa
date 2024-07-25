import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserManagement from './components/UserManagement';
import Home from './components/Home';
import Cart from './components/Cart';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<UserManagement />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;