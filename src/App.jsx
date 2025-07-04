// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import AdminPage from './Pages/Roles/Admin/AdminPage';
import UserPage from './Pages/Roles/User/UserPage';
import LegalPage from './Pages/Roles/Legal/LegalPage';
import ProtectedRoute from './ProtectedRoute';
import LegalSetup from './Pages/Roles/Admin/LegalSetup/LegalSetup';
import CourtSetup from './Pages/Roles/Admin/LegalSetup/Court/CourtSetup';
import BorrowerOverview from './Pages/Roles/Admin/Borrower/BorrowerOverview';
import AdminCases from './Pages/Roles/Admin/ManageData/AdminCases';
import AdminLoans from './Pages/Roles/Admin/ManageData/AdminLoans';
import AdminNotices from './Pages/Roles/Admin/ManageData/AdminNotices';
import TenantManager from './Pages/Roles/Admin/Tenant/Tenant';
import UserCases from './Pages/Roles/User/Cases/UserCases';
import ReportCases from './Pages/Roles/User/Reports/Reports/ReportCases';
import ReportNotices from './Pages/Roles/User/Reports/Reports/ReportNotice';
import UserNotice from './Pages/Roles/User/Reports/Notice/Notice';
import Loanpage from './Pages/Roles/User/Loan/LoanPage';
import LawyerCases from './Pages/Roles/Legal/LawyerCases/LawyerCases';
import UserInvoiceManagement from './Pages/Roles/User/InvoiceManagement/UserInvoiceManagement';
import StageConfig from './Pages/Roles/Admin/NoticeSetup/StageConfig';
import NoticeSetupTemplate from './Pages/Roles/Admin/NoticeSetup/Template';
import AdminAccount from './Pages/Roles/Admin/Accounts/AdminAccount';
import LawyerInvoiceManagement from './Pages/Roles/Legal/LawyerInvoiceManagement/LawyerInvoiceManagement';
import LawyerNotice from './Pages/Roles/Legal/LawyerNotice/LawyerNotice';
import LawyerReportCases from './Pages/Roles/Legal/LawyerReports/LawyerReportCases';
import LawyerReportNotices from './Pages/Roles/Legal/LawyerReports/LawyerReportNotice';
import KeyConfig from './Pages/Roles/Admin/KeyConfig/KeyConfig';
import CaseDetailPage from './Pages/Roles/User/Cases/CasesDetail/CaseDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} allowedRoles={["Administrator"]} />} />
        <Route path="/legalSetup" element={<ProtectedRoute element={LegalSetup} allowedRoles={["Administrator"]} />} />
        <Route path="/CourtSetup" element={<ProtectedRoute element={CourtSetup} allowedRoles={["Administrator"]} />} />
        <Route path="/borrower" element={<ProtectedRoute element={BorrowerOverview} allowedRoles={["Administrator"]} />} />
        <Route path="/tenant" element={<ProtectedRoute element={TenantManager} allowedRoles={["Administrator"]} />} />
        <Route path="/admin-cases" element={<ProtectedRoute element={AdminCases} allowedRoles={["Administrator"]} />} />
        <Route path="/admin-loans" element={<ProtectedRoute element={AdminLoans} allowedRoles={["Administrator"]} />} />
        <Route path="/admin-notices" element={<ProtectedRoute element={AdminNotices} allowedRoles={["Administrator"]} />} />
        <Route path="/stageconfig" element={<ProtectedRoute element={StageConfig} allowedRoles={["Administrator"]} />} />
        <Route path="/template" element={<ProtectedRoute element={NoticeSetupTemplate} allowedRoles={["Administrator"]} />} />
        <Route path="/accounts" element={<ProtectedRoute element={AdminAccount} allowedRoles={["Administrator"]} />} />
        <Route path="/KeyConfig" element={<ProtectedRoute element={KeyConfig} allowedRoles={["Administrator"]} />} />
       

        {/* User Routes */}
        <Route path="/user" element={<ProtectedRoute element={UserPage} allowedRoles={["User"]} />} />
        <Route path="/report-cases" element={<ProtectedRoute element={ReportCases} allowedRoles={["User"]} />} />
        <Route path="/report-notices" element={<ProtectedRoute element={ReportNotices} allowedRoles={["User"]} />} />
        <Route path="/cases" element={<ProtectedRoute element={UserCases} allowedRoles={["User"]} />} />
        <Route path="/case/:id" element={<ProtectedRoute element={CaseDetailPage} allowedRoles={["User"]} />} />
        <Route path="/user-notice" element={<ProtectedRoute element={UserNotice} allowedRoles={["User"]} />} />
        <Route path="/loans" element={<ProtectedRoute element={Loanpage} allowedRoles={["User"]} />} />
        <Route path="/invoices" element={<ProtectedRoute element={UserInvoiceManagement} allowedRoles={["User"]} />} />
        {/* Lawyer Routes */}
        <Route path="/legal" element={<ProtectedRoute element={LegalPage} allowedRoles={["Legal"]} />} />
        <Route path="/lawyer-cases" element={<ProtectedRoute element={LawyerCases} allowedRoles={["Legal"]} />} />
        <Route path="/lawyer-invoice" element={<ProtectedRoute element={LawyerInvoiceManagement} allowedRoles={["Legal"]} />} />
        <Route path="/lawyer-notice" element={<ProtectedRoute element={LawyerNotice} allowedRoles={["Legal"]} />} />
        <Route path="/lawyer-reportCases" element={<ProtectedRoute element={LawyerReportCases} allowedRoles={["Legal"]} />} />
        <Route path="/lawyer-reportNotice" element={<ProtectedRoute element={LawyerReportNotices} allowedRoles={["Legal"]} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
