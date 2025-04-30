import React, { useState } from 'react';
// import './Report.css'; 
import Layout from '../../../../Layout/Layout';

const dummyData = [
  {
    cnr: 'CNR001',
    loanAmount: 50000,
    caseType: 'Civil',
    status: 'Open',
    borrower: 'John Doe',
    createdDate: '2023-01-15',
    assignedTo: 'Agent A',
    court: 'Court 1'
  },
  {
    cnr: 'CNR002',
    loanAmount: 75000,
    caseType: 'Criminal',
    status: 'Closed',
    borrower: 'Jane Smith',
    createdDate: '2023-02-10',
    assignedTo: 'Agent B',
    court: 'Court 2'
  }
];

const ReportCases = () => {
  const [data] = useState(dummyData);

  return (
    <Layout>
      <div style={{ padding: '20px' }} className="reportCases-container ">
        <h2 className="reportCases-title">Report - Case</h2>

        {/* <button className="reportCasesexport-btn">📄</button> */}

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
                {['CNR No.', 'Loan Amount', 'Case Type', 'Status', 'Borrower', 'Created Date', 'Assigned To', 'Court'].map((col) => (
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCases;
