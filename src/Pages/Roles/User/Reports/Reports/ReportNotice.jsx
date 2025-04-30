import React, { useState } from 'react';
import Layout from '../../../../Layout/Layout';

const dummyData = [
  {
    crnNo: 'CRN001',
    borrowerName: 'John Doe',
    noticeDate: '2024-04-01',
    dueDate: '2024-04-10',
    loanAmount: '50000',
    noticeType: 'Final Notice',
    trackingId: 'TRK12345',
    status: 'Pending',
  },
  {
    crnNo: 'CRN002',
    borrowerName: 'Jane Smith',
    noticeDate: '2024-04-02',
    dueDate: '2024-04-12',
    loanAmount: '75000',
    noticeType: 'Reminder',
    trackingId: 'TRK67890',
    status: 'Sent',
  },
];

const ReportNotices = () => {
  const [data] = useState(dummyData);
  const username = localStorage.getItem("username");

  return (
    <Layout username={username}>
    <div style={{ padding: '20px' }}>
      <h2>Report - Notice</h2>
      {/* <button style={{ marginBottom: '10px' }}>📄</button> */}

      <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th><label>CRN No.</label></th>
            <th><label>Borrower Name</label></th>
            <th><label>Notice Date</label></th>
            <th><label>Due Date</label></th>
            <th><label>Loan Amount</label></th>
            <th><label>Notice Type</label></th>
            <th><label>Tracking Id</label></th>
            <th><label>Status</label></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" align="center">No data found</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.crnNo}</td>
                <td>{row.borrowerName}</td>
                <td>{row.noticeDate}</td>
                <td>{row.dueDate}</td>
                <td>{row.loanAmount}</td>
                <td>{row.noticeType}</td>
                <td>{row.trackingId}</td>
                <td>{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default ReportNotices;
