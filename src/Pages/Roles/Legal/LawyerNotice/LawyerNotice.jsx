import React, { useState, useEffect } from "react";
import Layout from "../../../Layout/Layout";
import { FaUser, FaEye } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import LawyerResponseModal from "./LawyerResponseModal";
import "./LawyerNotice.css";
import IconButton from "../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const LawyerNotice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          crnNo: notice.caseNumber,
          noticeType: notice.noticeType,
          // stage: notice.caseStatus,
          caseType: notice.workflowType,
          borrowerName: notice.borrowerName,
          noticeDate: new Date(notice.createdAt).toLocaleDateString(),
          dueDate: "", // Add if available in API
          loanAmount: "", // Add if available in API
          trackingId: notice.id,
          status: notice.caseStatus,
          loanNumber: notice.loanNumber,
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
    { key: "crnNo", label: "CRN No." },
    { key: "noticeType", label: "Notice Type" },
    // { key: "stage", label: "Stage" },
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
          <button className="userNoticeBtn1">
            <FaEye />
          </button>
          <button className="userNoticeBtn1">
            <MdMessage />
          </button>
          <IconButton type="delete" className="userNoticeBtn" />
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
        <LawyerResponseModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Layout>
  );
};

export default LawyerNotice;
