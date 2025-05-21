import React, { useState, useEffect } from 'react';
import AddCourtModal from './AddCourtModal';
import axios from 'axios';
import IconButton from '../../../../ReusableComponents/IconButton';
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid';
import './CourtSetup.css';

export default function CourtSetup() {
  const [showModal, setShowModal] = useState(false);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null); // For Edit

  const fetchCourts = async () => {
    try {
      const response = await axios.get("/api/api/courts");
      const data = response.data?.data || [];
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

  const handleDelete = async (courtId) => {
    if (!window.confirm("Are you sure you want to delete this court?")) return;
    try {
      await axios.delete(`/api/api/courts/${courtId}`);
      fetchCourts();
    } catch (error) {
      console.error('Failed to delete court:', error);
      alert('Delete failed.');
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    {
      key: "address",
      label: "Address",
      render: (court) => {
        const addr = court.address;
        if (!addr) return "-";
        return `${addr.addressLine || ''}, ${addr.city}, ${addr.state}, ${addr.pincode}`;
      }
    },
    { key: "courtType", label: "Court Type" },
    { key: "jurisdiction", label: "Jurisdiction" },
    { key: "courtCode", label: "Court Code" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (court) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <IconButton type="edit" onClick={() => handleEdit(court)} />
          <IconButton type="delete" onClick={() => handleDelete(court.id)} />
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
