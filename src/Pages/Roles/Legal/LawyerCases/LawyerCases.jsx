import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LawyerAddCases from "./LawyerAddCases.jsx";
import Layout from "../../../Layout/Layout.jsx";
import "./LawyerCases.css";
import { FaHandHoldingDollar } from "react-icons/fa6";
import AddButton from "../../../ReusableComponents/AddButton.jsx";
import IconButton from "../../../ReusableComponents/IconButton.jsx";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid.jsx";


const LawyerCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const navigate = useNavigate();

  const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`/api/api/cases`, {
          headers : getAuthHeaders()
        });
        const caseData = response.data?.data || [];

        const transformed = caseData.map((item) => ({
          CaseID: item.id,
          LoanID: item.loan.loanNumber,
          CaseType: item.workflowType,
          Status: item.status,
          Borrower: item.loan.borrower.name,
          LoanAmount: `₹${item.loan.loanAmount.toLocaleString()}`,
          NPADate: item.loan.lastPaymentDate,
          CreateDate: item.loan.startDate,
          AssignedTo: "-", // Update if data available
          Court: item.loan.borrower.address.city || "-",
        }));

        setCases(transformed);
      } catch (error) {
        console.error("Failed to fetch cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

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
    // { key: "CaseID", label: "Case ID" },
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
          
          <IconButton
            type="edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="user-cases-container">Loading cases...</div>
      </Layout>
    );
  }

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

        <ReusableGrid
          columns={columns}
          data={cases}
          onRowClick={handleRowClick}
        />

        {showModal && (
          <div className="modal-overlay-usercase">
            <div className="modal-content-usercase-userrole">
              <LawyerAddCases initialData={selectedCase} onClose={closeModal} />
              <button onClick={closeModal} className="close-button-usercases">
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};


export default LawyerCases;
