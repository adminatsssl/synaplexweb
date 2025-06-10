import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LawyerReport.css';
import Layout from "../../../Layout/Layout";
import { FaHandHoldingDollar } from "react-icons/fa6";
import EditCasePopup from './LawyerEditCasePopup';
import IconButton from "../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

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
        loanAmount: `₹${item.loan.loanAmount.toLocaleString()}`,
        caseType: item.workflowType,
        status: item.status,
        borrower: item.loan.borrower.name,
        createdDate: item.loan.startDate,
        assignedTo: "-", // Update if data available
        court: item.loan.borrower.address.city || "-",
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
