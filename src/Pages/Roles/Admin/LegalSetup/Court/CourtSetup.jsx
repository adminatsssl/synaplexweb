import React, { useState, useEffect } from 'react';
import AddCourtModal from './AddCourtModal';
import axios from 'axios';
import IconButton from '../../../../ReusableComponents/IconButton';
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid'; // ✅ Add this
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

  const columns = [
    { key: "Name", label: "Name" },
    { key: "Phone", label: "Phone" },
    { key: "Email", label: "Email" },
    { key: "Address", label: "Address" },
    { key: "CourtType", label: "Court Type" },
    { key: "Jurisdiction", label: "Jurisdiction" },
    { key: "CourtCode", label: "Court Code" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (court) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <IconButton type="edit" onClick={() => handleEdit(court)} />
          <IconButton type="delete" onClick={() => handleDelete(court.CourtCode)} />
        </div>
      )
    }
  ];

  return (
    <div className="court-setup-container">
      <div className="court-setup-header">
        <AddButton text="Add Court" onClick={() => setShowModal(true)} />
      </div>

      <ReusableGrid columns={columns} data={courts} />

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
