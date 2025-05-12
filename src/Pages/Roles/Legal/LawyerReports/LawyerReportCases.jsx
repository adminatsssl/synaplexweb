import React, { useState } from 'react';
import './LawyerReport.css';
import Layout from "../../../Layout/Layout";
import { FaHandHoldingDollar } from "react-icons/fa6";
import EditCasePopup from './LawyerEditCasePopup';
import IconButton from "../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const dummyData = [
  {
    cnr: 'CNR001',
    loanAmount: 50000,
    caseType: 'Civil',
    status: 'Open',
    borrower: 'John Doe',
    createdDate: '2023-01-15',
    assignedTo: 'Agent A',
    court: 'Court 1',
  },
  {
    cnr: 'CNR002',
    loanAmount: 75000,
    caseType: 'Criminal',
    status: 'Closed',
    borrower: 'Jane Smith',
    createdDate: '2023-02-10',
    assignedTo: 'Agent B',
    court: 'Court 2',
  }
];

const LawyerReportCases = () => {
  const [data, setData] = useState(dummyData);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

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
          <IconButton
            type="edit"
            className="reportcasesbtn"
            onClick={() => handleEditClick(row)}
          />
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
        caseData={selectedCase || dummyData[0]}
        onSave={handleSave}
      />
    </Layout>
  );
};

export default LawyerReportCases;
