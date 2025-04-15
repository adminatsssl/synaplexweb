import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBorrower from "./AddBorrower"; 
import "./BorrowerOverview.css";

const BorrowerOverview = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // for popup visibility

  const fetchBorrowers = () => {
    setLoading(true);
    axios
      .get("/odata/postapiservice/Borrowers")
      .then((response) => {
        setBorrowers(response.data.value);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowers:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleAddBorrower = () => {
    setShowModal(true);
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    setShowModal(false);
    fetchBorrowers(); // Refresh data after new borrower added
  };

  return (
    <div className="borrower-container">
      <h2 className="borrower-title">Borrower Overview</h2>

      <button className="add-borrower-btn" onClick={handleAddBorrower}>
        ➕ Add Borrower
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : borrowers.length === 0 ? (
        <p>No data found.</p>
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
            <tr>
              <th><input type="text" placeholder="Ab" /></th>
              <th><input type="text" placeholder="Ab" /></th>
              <th><input type="text" placeholder="Ab" /></th>
              <th><input type="text" placeholder="Ab" /></th>
              <th><input type="text" placeholder="=" /></th>
              <th><input type="text" placeholder="Ab" /></th>
              <th><input type="text" placeholder="Ab" /></th>
              <th></th>
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
                  <span className="action-icon">✏️</span>
                  <span className="action-icon delete-icon">🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Optional modal placeholder */}
      {showModal && (
        <div>
          {showModal && <AddBorrower onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
};

export default BorrowerOverview;
