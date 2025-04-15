import React, { useState, useEffect } from 'react';
import AddCourtModal from './AddCourtModal';
import axios from 'axios';
import './CourtSetup.css';

export default function CourtSetup() {
  const [showModal, setShowModal] = useState(false);
  const [courts, setCourts] = useState([]);

  const fetchCourts = async () => {
    try {
      const response = await axios.get("/court/Courts");

      // Log response to inspect structure
      console.log("API Response:", response.data);

      // Adjust based on actual structure
      const data = response.data?.value || response.data || [];

      if (Array.isArray(data)) {
        setCourts(data);
      } else {
        console.warn("Unexpected response format:", response.data);
        setCourts([]);
      }
    } catch (error) {
      console.error('Failed to fetch courts:', error);
      setCourts([]);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleAddCourt = () => {
    fetchCourts();
    setShowModal(false);
  };

  return (
    <div className="court-setup-container">
      <div className="court-setup-header">
        <h2 className="court-setup-title">Court</h2>
        <button className="add-court-btn" onClick={() => setShowModal(true)}>+ Add Court</button>
      </div>

      <div className="court-table-container">
        <table className="court-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Court Type</th>
              <th>Jurisdiction</th>
              <th>Court Code</th>
            </tr>
          </thead>
          <tbody>
            {courts.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>No courts available.</td></tr>
            ) : (
              courts.map((court, index) => (
                <tr key={court.CourtCode || index}>
                  <td>{court.Name}</td>
                  <td>{court.Phone}</td>
                  <td>{court.Email}</td>
                  <td>{court.Address}</td>
                  <td>{court.CourtType}</td>
                  <td>{court.Jurisdiction}</td>
                  <td>{court.CourtCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddCourtModal
          onClose={() => setShowModal(false)}
          onSave={handleAddCourt}
        />
      )}
    </div>
  );
}
