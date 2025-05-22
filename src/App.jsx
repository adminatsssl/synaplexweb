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
import LawyerCaseDetailPage from './Pages/Roles/Legal/LawyerCases/LawyerCasesDetail/LawyerCaseDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/legalSetup" element={<ProtectedRoute element={LegalSetup} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/CourtSetup" element={<ProtectedRoute element={CourtSetup} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/borrower" element={<ProtectedRoute element={BorrowerOverview} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/tenant" element={<ProtectedRoute element={TenantManager} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/admin-cases" element={<ProtectedRoute element={AdminCases} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/admin-loans" element={<ProtectedRoute element={AdminLoans} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/admin-notices" element={<ProtectedRoute element={AdminNotices} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/stageconfig" element={<ProtectedRoute element={StageConfig} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/template" element={<ProtectedRoute element={NoticeSetupTemplate} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/accounts" element={<ProtectedRoute element={AdminAccount} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/KeyConfig" element={<ProtectedRoute element={KeyConfig} allowedRoles={["ROLE_ADMIN"]} />} />
       

        {/* User Routes */}
        <Route path="/user" element={<ProtectedRoute element={UserPage} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/report-cases" element={<ProtectedRoute element={ReportCases} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/report-notices" element={<ProtectedRoute element={ReportNotices} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/cases" element={<ProtectedRoute element={UserCases} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/case/:id" element={<ProtectedRoute element={CaseDetailPage} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/user-notice" element={<ProtectedRoute element={UserNotice} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/loans" element={<ProtectedRoute element={Loanpage} allowedRoles={["ROLE_USER"]} />} />
        <Route path="/invoices" element={<ProtectedRoute element={UserInvoiceManagement} allowedRoles={["ROLE_USER"]} />} />
        {/* Lawyer Routes */}
        <Route path="/legal" element={<ProtectedRoute element={LegalPage} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyer-cases" element={<ProtectedRoute element={LawyerCases} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyer-invoice" element={<ProtectedRoute element={LawyerInvoiceManagement} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyer-notice" element={<ProtectedRoute element={LawyerNotice} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyer-reportCases" element={<ProtectedRoute element={LawyerReportCases} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyer-reportNotice" element={<ProtectedRoute element={LawyerReportNotices} allowedRoles={["ROLE_LEGAL"]} />} />
        <Route path="/lawyercase/:id" element={<ProtectedRoute element={LawyerCaseDetailPage} allowedRoles={["ROLE_LEGAL"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
