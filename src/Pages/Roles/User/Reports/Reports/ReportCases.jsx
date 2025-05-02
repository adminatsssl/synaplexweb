import React, { useState } from 'react';
import './Report.css'; 
import Layout from "../../../../Layout/Layout";
import { MdEdit } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";
import EditCasePopup from './EditCasePopup'; // Import the new component

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
    loanId: '12345',
    loanNumber: 'LN20250001',
    loanType: 'Personal Loan',
    defaultDate: '2023-01-15',
    npaDate: '2023-02-20',
    crnNo: 'MH2025000018',
    courtType: 'Ghaziabad',
    hearingDate: '2023-06-10',
    fi1No: 123,
    fi1Year: 2023,
    regNo: 456,
    regYear: 2023,
    dateOfFiling: '2023-03-05'
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
    loanId: '67890',
    loanNumber: 'LN20250002',
    loanType: 'Business Loan',
    defaultDate: '2023-02-10',
    npaDate: '2023-03-15',
    crnNo: 'MH2025000019',
    courtType: 'Delhi',
    hearingDate: '2023-07-12',
    fi1No: 124,
    fi1Year: 2023,
    regNo: 457,
    regYear: 2023,
    dateOfFiling: '2023-04-08'
  }
];

const ReportCases = () => {
  const [data, setData] = useState(dummyData);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleEditClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedData) => {
    setData(data.map(item => 
      item.cnr === updatedData.cnr ? updatedData : item
    ));
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }} className="reportCases-container ">
        <h2 className="reportCases-title">Report - Case</h2>

        <button className="reportCasesexport-btn"><FaFileExcel/></button>

        <div className="reportCasestable-wrapper">
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              fontSize: '14px',
              border: '1px solid #ccc',
            }}
            className="reportCasescase-table"
          >
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                {['CNR No.', 'Loan Amount', 'Case Type', 'Status', 'Borrower', 'Created Date', 'Assigned To', 'Court',''].map((col) => (
                  <th key={col} style={{ padding: '8px', border: '1px solid #ccc' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="reportCasesno-records" style={{ textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.cnr}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.loanAmount}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.caseType}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.status}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.borrower}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.createdDate}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.assignedTo}</td>
                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{row.court}</td>
                    <td>
                      <button className='reportcasesbtn'><FaHandHoldingDollar/></button>
                      <button className='reportcasesbtn' onClick={() => handleEditClick(row)}><MdEdit/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

export default ReportCases;