import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LawyerAddCases from "./LawyerAddCases.jsx";
import Layout from "../../../Layout/Layout.jsx";
import "./LawyerCases.css";
import { FaHandHoldingDollar } from "react-icons/fa6";
import AddButton from "../../../ReusableComponents/AddButton.jsx";
import IconButton from "../../../ReusableComponents/IconButton.jsx";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid.jsx";

// ✅ Dummy case data
const dummyCases = [
  {
    CaseID: "101",
    LoanID: "L-0001",
    CaseType: "Cheque Bounce",
    Status: "Open",
    Borrower: "John Doe",
    LoanAmount: "$100,000",
    NPADate: "2023-01-01",
    CreateDate: "2023-02-01",
    AssignedTo: "Lawyer A",
    Court: "High Court",
  },
  {
    CaseID: "102",
    LoanID: "L-0002",
    CaseType: "Sarfaesi",
    Status: "Closed",
    Borrower: "Jane Smith",
    LoanAmount: "$200,000",
    NPADate: "2023-03-01",
    CreateDate: "2023-04-01",
    AssignedTo: "Lawyer B",
    Court: "District Court",
  },
];

const LawyerCases = () => {
  const [cases, setCases] = useState(dummyCases); // ✅ use dummy data
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (caseData) => {
    setSelectedCase(caseData);
    setShowModal(true);
  };

  const handleRowClick = (caseData) => {
    navigate(`/lawyercase/${caseData.CaseID}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCase(null);
  };

  const openModal = () => setShowModal(true);

  const columns = [
    { key: "CaseID", label: "Case ID" },
    { key: "LoanID", label: "Loan ID" },
    { key: "CaseType", label: "Case Type" },
    { key: "Status", label: "Status" },
    { key: "Borrower", label: "Borrower" },
    { key: "LoanAmount", label: "Loan Amount" },
    { key: "NPADate", label: "NPA Date" },
    { key: "CreateDate", label: "Create Date" },
    { key: "AssignedTo", label: "Assigned To" },
    { key: "Court", label: "Court" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            style={{
              color: "#0056B3",
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "20px",
              marginRight: "0px",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent row navigation
              console.log("FaHandHoldingDollar clicked");
            }}
          >
            <FaHandHoldingDollar />
          </button>
          <IconButton
            type="edit"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row navigation
              handleEdit(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="user-cases-container">
        <div className="user-cases">
          <div className="usercaseHeading">
            <h2>Cases</h2>
          </div>
          <div className="usercaseAddbutton">
            <AddButton text="Add Case" onClick={openModal} />
          </div>
        </div>

        <ReusableGrid columns={columns} data={cases} onRowClick={handleRowClick} />

        {showModal && (
          <div className="modal-overlay-usercase">
            <div className="modal-content-usercase-userrole">
              <LawyerAddCases initialData={selectedCase} onClose={closeModal} />
              <button onClick={closeModal} className="close-button-usercases">X</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LawyerCases;
