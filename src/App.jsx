// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import LegalPage from './Pages/LegalPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
