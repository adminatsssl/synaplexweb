import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBorrower from "./AddBorrower";
import "./BorrowerOverview.css";
import Layout from "../Layout/Layout";

const BorrowerOverview = () => {
  const username = localStorage.getItem("username");
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const fetchBorrowers = () => {
    setLoading(true);
    axios
      .get("/odata/postapiservice/Borrowers")
      .then((response) => {
        const data = response?.data?.value || response?.data;
        if (Array.isArray(data)) {
          setBorrowers(data);
        } else {
          console.warn("Unexpected response format:", response.data);
          setBorrowers([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowers:", error);
        setBorrowers([]);
        setLoading(false);
      });
  };

  const deleteRecord = (id) => {
    if (!id) {
      alert("No borrower ID provided.");
      return;
    }
  
    const url = `/odata/postapiservice/Borrowers(${id})`;
  
    axios.delete(url)
      .then(() => {
        alert(`Borrower with ID ${id} has been deleted.`);
        fetchBorrowers(); // Refresh list after delete
      })
      .catch(error => {
        console.error("Delete failed:", error);
        alert("Failed to delete borrower.");
      });
  };
  

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleAddBorrower = () => {
    setSelectedBorrower(null);
    setShowModal(true);
  };

  const handleEditBorrower = (borrower) => {
    setSelectedBorrower(borrower); // Set the selected borrower for editing
    setShowModal(true);
  };

  return (
    <Layout username={username}>
      <div className="borrower-container">
        <div className="borrower-title-row">
          <h2 className="borrower-title">Borrower</h2>
          <button className="add-borrower-btn" onClick={handleAddBorrower}>
          + Add Borrower
          </button>
        </div>

        {loading ? (
          <div className="info-message">Loading...</div>
        ) : borrowers.length === 0 ? (
          <div className="info-message">No data found.</div>
        ) : (
          <table className="borrower-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Credit Score</th>
                <th>Job Title</th>
                <th>Monthly Income</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowers.map((b, index) => (
                <tr key={index}>
                  <td>{b.Name}</td>
                  <td>{b.Phone}</td>
                  <td>{b.Email}</td>
                  <td>{b.Address}</td>
                  <td>{b.CreditScore}</td>
                  <td>{b.JobTitle}</td>
                  <td>{b.MonthlyIncome}</td>
                  <td>
                    <span
                      className="action-icon"
                      onClick={() => handleEditBorrower(b)}
                    >
                      ✏️
                    </span>
                    <span
                      className="action-icon delete-icon"
                      onClick={() => deleteRecord(b.ID)}
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && (
          <AddBorrower
            onClose={() => {
              setShowModal(false);
              setSelectedBorrower(null);
            }}
            onSave={() => {
              fetchBorrowers();
              setShowModal(false);
              setSelectedBorrower(null);
            }}
            selectedBorrower={selectedBorrower}
          />
        )}
      </div>
    </Layout>
  );
};

export default BorrowerOverview;