import React, { useState, useEffect } from 'react';
import './Report.css';

import { FaHandHoldingDollar } from "react-icons/fa6";
import EditCasePopup from './EditCasePopup';
// import IconButton from '../../../ReusableComponents/IconButton';
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";
import axios from 'axios';
import Layout from '../../../Layout/Layout';

const ReportCases = () => {
  const [data, setData] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  // Fetch cases on mount
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`/api/api/cases`, {
          headers: getAuthHeaders()
        });
        const rawCases = response.data?.data || [];

        const transformedData = rawCases.map((item) => ({
          cnr: item.cnrnumber || `CNR-${item.id}`,
          loanAmount: item.loan?.loanAmount || 0,
          caseType: item.workflowType || "-",
          status: item.status || "-",
          borrower: item.loan?.borrower?.name || "-",
          createdDate: item.loan?.startDate || "-",
          assignedTo: item.assignedTo || "-", // Replace if you have real data
          court: item.loan?.borrower?.address?.city || "-",
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Failed to fetch cases:", error);
      }
    };

    fetchCases();
  }, []);

  const handleEditClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedData) => {
    setData(data.map(item => item.cnr === updatedData.cnr ? updatedData : item));
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
          {/* <IconButton
            type="edit"
            className="reportcasesbtn"
            onClick={() => handleEditClick(row)}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }} className="reportCases-container">
        <h2 className="reportCases-title">Report - Case</h2>

        <ReusableGrid columns={columns} data={data} />
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

export default ReportCases;
