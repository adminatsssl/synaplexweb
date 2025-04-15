// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import LegalPage from './Pages/LegalPage';
import ProtectedRoute from './ProtectedRoute';
import LegalSetup from './Pages/Roles/Admin/LegalSetup/LegalSetup';
import CourtSetup from './Pages/Roles/Admin/LegalSetup/CourtSetup';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} allowedRoles={["Administrator"]} />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} allowedRoles={["User"]} />} />
        <Route path="/legal" element={<ProtectedRoute element={LegalPage} allowedRoles={["Legal"]} />} />
        <Route path="/legalSetup" element={<ProtectedRoute element={LegalSetup} allowedRoles={["Administrator"]} />} />
        <Route path="/CourtSetup" element={<ProtectedRoute element={CourtSetup} allowedRoles={["Administrator"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
