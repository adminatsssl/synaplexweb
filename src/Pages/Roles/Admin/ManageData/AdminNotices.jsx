import React, { useState, useEffect } from 'react';
import Layout from "../../../Layout/Layout.jsx";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";
import IconButton from "../../../ReusableComponents/IconButton";
import { FaUser, FaEye } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const AdminNotices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notice');
      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        // Transform the data to match the grid structure
        const transformedData = result.data.map(notice => ({
          noticeId: notice.id,
          caseNumber: notice.caseNumber,
          noticeDate: new Date(notice.createdAt).toLocaleDateString(),
          status: notice.caseStatus,
          workflowType: notice.workflowType,
          loanNumber: notice.loanNumber,
          loanType: notice.loanType,
          borrowerName: notice.borrowerName,
          borrowerContact: notice.borrowerContact,
          borrowerEmail: notice.borrowerEmail
        }));
        setData(transformedData);
      } else {
        setError('Failed to fetch notices');
      }
    } catch (err) {
      setError('Error fetching notices: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "noticeId", label: "Notice ID" },
    { key: "caseNumber", label: "Case Number" },
    { key: "noticeDate", label: "Notice Date" },
    { key: "status", label: "Status" },
    { key: "workflowType", label: "Workflow Type" },
    { key: "loanNumber", label: "Loan Number" },
    { key: "loanType", label: "Loan Type" },
    { key: "borrowerName", label: "Borrower Name" },
    { key: "borrowerContact", label: "Contact" },
    { key: "borrowerEmail", label: "Email" },
    {
      key: "actions",
      label: "Actions",
      disableFilter: true,
      render: (row) => (
        <div className="userNotice-actions">
          {/* <button className="userNoticeBtn1">
            <FaUser />
          </button>
          <button className="userNoticeBtn1">
            <FaEye />
          </button>
          <button className="userNoticeBtn1">
            <MdMessage />
          </button> */}
          <IconButton type="delete" className="userNoticeBtn" />
        </div>
      ),
    },
  ];

  if (loading) return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Notice</h2>
          <p>Loading notices...</p>
        </div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Notice</h2>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Notice</h2>
          <ReusableGrid columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminNotices;
