import React, { useState, useEffect } from "react";
import Layout from "../../../Layout/Layout";
import { FaUser, FaEye } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import ResponseModal from "./ResponseModal";
import "./Notice.css";
import IconButton from "../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const UserNotice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notice', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        // Transform the data to match the grid structure
        const transformedData = result.data.map(notice => ({
          crnNo: notice.caseNumber,
          noticeType: notice.noticeType,
          caseType: notice.workflowType,
          borrowerName: notice.borrowerName,
          noticeDate: new Date(notice.createdAt).toLocaleDateString(),
          loanNumber: notice.loanNumber,
          borrowerContact: notice.borrowerContact,
          borrowerEmail: notice.borrowerEmail,
          status: notice.caseStatus
        }));
        setData(transformedData);
      } else {
        setError('Failed to fetch notices');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Error fetching notices: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "crnNo", label: "CRN No." },
    { key: "noticeType", label: "Notice Type" },
    { key: "caseType", label: "Case Type" },
    { key: "borrowerName", label: "Borrower Name" },
    { key: "noticeDate", label: "Notice Date" },
    { key: "loanNumber", label: "Loan Number" },
    { key: "borrowerContact", label: "Contact" },
    { key: "borrowerEmail", label: "Email" },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <div className="userNotice-actions">
          <button className="userNoticeBtn1" onClick={() => setShowModal(true)}>
            <FaUser />
          </button>
          {/* <button className="userNoticeBtn1">
            <FaEye />
          </button>
          <button className="userNoticeBtn1">
            <MdMessage />
          </button>
          <IconButton type="delete" className="userNoticeBtn" /> */}
        </div>
      ),
    },
  ];

  if (loading) return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Notice</h2>
        <p>Loading notices...</p>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Notice</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Notice</h2>
        <ReusableGrid columns={columns} data={data} />
        <ResponseModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Layout>
  );
};

export default UserNotice;
