import React, { useState } from "react";
import Layout from "../../../../Layout/Layout";
import { FaUser, FaEye } from "react-icons/fa";
import { MdMessage, MdDelete } from "react-icons/md";
import ResponseModal from "./ResponseModal"; // Import
import "./Notice.css";
import IconButton from "../../../../ReusableComponents/IconButton";

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

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Notice</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "CRN No.",
                "Notice Type",
                "Stage",
                "CaseType",
                "Borrower Name",
                "Notice Date",
                "Due Date",
                "Loan Amount",
                "Tracking Id",
                "Status",
                "",
              ].map((header, index) => (
                <th key={index} style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{item.crnNo}</td>
                  <td>{item.noticeType}</td>
                  <td>{item.stage}</td>
                  <td>{item.caseType}</td>
                  <td>{item.borrowerName}</td>
                  <td>{item.noticeDate}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.loanAmount}</td>
                  <td>{item.trackingId}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="userNoticeBtn1" onClick={() => setShowModal(true)}><FaUser /></button>
                    <button className="userNoticeBtn1"><FaEye /></button><br />
                    <button className="userNoticeBtn1"><MdMessage /></button>
                    <IconButton type="delete" className='userNoticeBtn'  />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <ResponseModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Layout>
  );
};

export default UserNotice;
