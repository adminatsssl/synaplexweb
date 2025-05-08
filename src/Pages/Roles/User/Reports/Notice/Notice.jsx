import React, { useState } from "react";
import Layout from "../../../../Layout/Layout";
import { FaUser, FaEye } from "react-icons/fa";
import { MdMessage, MdDelete } from "react-icons/md";
import ResponseModal from "./ResponseModal"; // Import
import "./Notice.css";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";


//sample data
const UserNotice = () => {
  const [data] = useState([
    {
      crnNo: "CRN001",
      noticeType: "Type A",
      stage: "Initial",
      caseType: "Civil",
      borrowerName: "John Doe",
      noticeDate: "2024-05-01",
      dueDate: "2024-06-01",
      loanAmount: 15000,
      trackingId: "TRK123",
      status: "Pending",
    },
    {
      crnNo: "CRN002",
      noticeType: "Type B",
      stage: "Final",
      caseType: "Criminal",
      borrowerName: "Jane Smith",
      noticeDate: "2024-05-05",
      dueDate: "2024-06-10",
      loanAmount: 25000,
      trackingId: "TRK456",
      status: "Resolved",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const columns = [
    { key: "crnNo", label: "CRN No." },
    { key: "noticeType", label: "Notice Type" },
    { key: "stage", label: "Stage" },
    { key: "caseType", label: "Case Type" },
    { key: "borrowerName", label: "Borrower Name" },
    { key: "noticeDate", label: "Notice Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "loanAmount", label: "Loan Amount" },
    { key: "trackingId", label: "Tracking Id" },
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
