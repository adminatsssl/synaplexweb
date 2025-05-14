import React, { useState } from "react";
import Layout from "../../../../Layout/Layout";
import { FaEye } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import "./Report.css";

const dummyData = [
  {
    crnNo: "CRN001",
    borrowerName: "John Doe",
    noticeDate: "2024-04-01",
    dueDate: "2024-04-10",
    loanAmount: "50000",
    noticeType: "Final Notice",
    trackingId: "TRK12345",
    status: "Pending",
  },
  {
    crnNo: "CRN002",
    borrowerName: "Jane Smith",
    noticeDate: "2024-04-02",
    dueDate: "2024-04-12",
    loanAmount: "75000",
    noticeType: "Reminder",
    trackingId: "TRK67890",
    status: "Sent",
  },
];

const ReportNotices = () => {
  const [data] = useState(dummyData);

  const columns = [
    { key: "crnNo", label: "CRN No." },
    { key: "borrowerName", label: "Borrower Name" },
    { key: "noticeDate", label: "Notice Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "loanAmount", label: "Loan Amount" },
    { key: "noticeType", label: "Notice Type" },
    { key: "trackingId", label: "Tracking ID" },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Actions",
      disableFilter: true,
      render: (row) => (
        <div className="action-btns">
          <button className="reportnoticebtn1">
            <FaEye />
          </button>
          <button className="reportnoticebtn1">
            <MdMessage />
          </button>
          <IconButton type="edit" className="reportnoticebtn" />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Report - Notice</h2>
        <ReusableGrid columns={columns} data={data} />
      </div>
    </Layout>
  );
};

export default ReportNotices;
