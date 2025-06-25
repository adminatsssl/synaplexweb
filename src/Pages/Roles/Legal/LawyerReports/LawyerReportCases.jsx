import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LawyerReport.css';
import Layout from "../../../Layout/Layout";
import { FaHandHoldingDollar } from "react-icons/fa6";
import EditCasePopup from './LawyerEditCasePopup';
import IconButton from "../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

const LawyerReportCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const fetchCases = async () => {
    try {
      const response = await axios.get(`/api/api/cases/legalCases`, {
        headers: getAuthHeaders()
      });
      const caseData = response.data?.data || [];

      const transformed = caseData.map((item) => ({
        cnr: item.id,
        loanAmount: item.loan?.loanAmount
          ? `₹${item.loan.loanAmount.toLocaleString()}`
          : "-",
        caseType: item.workflowType,
        status: item.status,
        borrower: item.loan.borrower.name,
        createdDate: item.loan.startDate,
        assignedTo: "-", // Update if data available
        court: item.loan?.borrower?.address?.city || "-",
      }));

      setCases(transformed);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleEditClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedData) => {
    setCases(cases.map(item => item.cnr === updatedData.cnr ? updatedData : item));
  };

  const columns = [
    { key: 'cnr', label: 'CNR No.' },
    { key: 'loanAmount', label: 'Loan Amount' },
    { key: 'caseType', label: 'Case Type' },
    { key: 'status', label: 'Status' },
    { key: 'borrower', label: 'Borrower' },
    { key: 'createdDate', label: 'Created Date' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'court', label: 'Court' },
    {
      key: 'actions',
      label: 'Actions',
      disableFilter: true,
      render: (row) => (
        <div className="action-btns">
          <button className="reportcasesbtn1"><FaHandHoldingDollar /></button>
          <IconButton
            type="edit"
            className="reportcasesbtn"
            onClick={() => handleEditClick(row)}
          />
        </div>
      ),
    },
  ];

  // const exportToExcel = () => {
  // const exportData = cases.map(({ cnr, loanAmount, caseType, status, borrower, createdDate, assignedTo, court }) => ({
  //   "CNR No.": cnr,
  //   "Loan Amount": loanAmount,
  //   "Case Type": caseType,
  //   "Status": status,
  //   "Borrower": borrower,
  //   "Created Date": createdDate,
  //   "Assigned To": assignedTo,
  //   "Court": court
  // }));

//   const worksheet = XLSX.utils.json_to_sheet(exportData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Cases");

//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(data, "LegalCasesReport.xlsx");
// };


  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '20px' }}>Loading cases...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '20px' }} className="reportCases-container">
        <h2 className="reportCases-title">Report - Case</h2>
        {/* <button className="download-excel-btn" onClick={exportToExcel}>
  Download Excel
</button> */}

        <ReusableGrid columns={columns} data={cases} />
      </div>

      <EditCasePopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        caseData={selectedCase}
        onSave={handleSave}
      />
    </Layout>
  );
};

export default LawyerReportCases;
