// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import LegalPage from './Pages/LegalPage';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} allowedRoles={["Administrator"]} />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} allowedRoles={["User"]} />} />
        <Route path="/legal" element={<ProtectedRoute element={LegalPage} allowedRoles={["Legal"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
