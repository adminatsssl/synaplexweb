import React, { useState, useEffect } from 'react';
import AddCourtModal from './AddCourtModal';
import axios from 'axios';
import './CourtSetup.css';

export default function CourtSetup() {
  const [showModal, setShowModal] = useState(false);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null); // For Edit

  const fetchCourts = async () => {
    try {
      const response = await axios.get("/court/Courts");
      const data = response.data?.value || response.data || [];
      setCourts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch courts:', error);
      setCourts([]);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleSaveCourt = () => {
    fetchCourts();
    setShowModal(false);
    setSelectedCourt(null);
  };

  const handleEdit = (court) => {
    setSelectedCourt(court);
    setShowModal(true);
  };

  const handleDelete = async (courtCode) => {
    if (!window.confirm("Are you sure you want to delete this court?")) return;
    try {
      await axios.delete(`/court/Courts('${courtCode}')`);
      fetchCourts();
    } catch (error) {
      console.error('Failed to delete court:', error);
      alert('Delete failed.');
    }
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center' }}>No courts available.</td></tr>
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
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(court)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(court.CourtCode)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddCourtModal
          onClose={() => {
            setShowModal(false);
            setSelectedCourt(null);
          }}
          onSave={handleSaveCourt}
          initialData={selectedCourt}
        />
      )}
    </div>
  );
}
