import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LawyerAddCases from './LawyerAddCases.jsx';
import Layout from "../../../Layout/Layout.jsx"
import './LawyerCases.css'; 
import ReusableGrid from '../../../ReusableComponents/ReusableGrid.jsx';
import IconButton from '../../../ReusableComponents/IconButton.jsx';
import AddButton from '../../../ReusableComponents/AddButton.jsx';
import { FaHandHoldingDollar } from "react-icons/fa6";

const UserCases = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      axios
        .get("/odata/usercases/LexCases")
        .then((response) => {
          setCases(response.data.value || []);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);
  
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  
    if (loading) return <p>Loading cases...</p>;
    if (error) return <p>Error: {error}</p>;
  
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
        label: "", // we dont want any label
        disableFilter: true,
        render: (row) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={{ color:"#0056B3",background: "none", border: "none", padding: 0,fontSize:"20px",marginRight:"0px" }}>
              <FaHandHoldingDollar />
            </button>
            <IconButton type="edit" />
            
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
  
          
  
      <ReusableGrid columns={columns} data={cases} />
  
          {showModal && (
            <div className="modal-overlay-usercase">
              <div className="modal-content-usercase-userrole">
                <LawyerAddCases />
                <button onClick={closeModal} className="close-button-usercases">
                  X ..
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  };
  
  export default UserCases;
  