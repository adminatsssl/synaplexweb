import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import LawFirmPopup from "./LawFirmPopup";
import "./LawFirm.css";

const LawFirm = () => {
  const [lawFirms, setLawFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLawFirm, setSelectedLawFirm] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchLawFirms = () => {
    setLoading(true);
    axios
      .get("/odata/LawFirms?$expand=Address_LawFirm")
      .then(response => {
        setLawFirms(response.data.value || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching law firms:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLawFirms();
  }, [refreshTrigger]);

  const handleSuccess = () => {
    setShowPopup(false);
    setSelectedLawFirm(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const openAddPopup = () => {
    setSelectedLawFirm(null);
    setShowPopup(true);
  };

  const openEditPopup = (firm) => {
    setSelectedLawFirm(firm);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const stringId = id.toString();
    console.log("Deleting LawFirm ID:", stringId);
    try {
      const response = await fetch(`/odata/LawFirms(${stringId})`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`LawFirm ${stringId} deleted successfully.`);
        setRefreshTrigger(prev => prev + 1);
      } else {
        console.error("Failed to delete. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  if (loading) return <div className="law-firm-loading">Loading...</div>;
  if (error) return <div className="law-firm-error">{error}</div>;

  return (
    <div className="law-firm-container">
      <div className="law-firm-header">
        {/* <h1>Law Firms</h1> */}
        <AddButton text="Add Law-Firm" onClick={openAddPopup} />
      </div>

      <div className="table-wrapper">
        <table className="law-firm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Registration Number</th>
              <th>Establishment Year</th>
              <th>Total Lawyers</th>
              <th>Success Rate</th>
              <th>Client Rating</th>
              <th>Address Line</th>
              <th>City</th>
              <th>State</th>
              <th>Pin Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawFirms.map(firm => (
              <tr key={firm.ID}>
                <td>{firm.Name || '-'}</td>
                <td>{firm.Email || '-'}</td>
                <td>{firm.PhoneNumber || '-'}</td>
                <td>{firm.RegistrationNumber || '-'}</td>
                <td>{firm.EstablishmentYear || '-'}</td>
                <td>{firm.TotalLawyers}</td>
                <td>{firm.SuccessRate?.toFixed(2)}</td>
                <td>{firm.ClientRating?.toFixed(2)}</td>
                <td>{firm.Address_LawFirm?.AddressLine || '-'}</td>
                <td>{firm.Address_LawFirm?.City || '-'}</td>
                <td>{firm.Address_LawFirm?.State || '-'}</td>
                <td>{firm.Address_LawFirm?.PinCode || '-'}</td>
                <td className="law-firm-actions">
                  <IconButton type="edit" onClick={() => openEditPopup(firm)} />
                  <IconButton type="delete" onClick={() => handleDelete(firm.ID)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowPopup(false)}>
              ✕
            </button>
            <LawFirmPopup
              selectedLawFirm={selectedLawFirm}
              onSuccess={handleSuccess}
              onCancel={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LawFirm;
