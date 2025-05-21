import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
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
      .get("/api/api/lawfirms")
      .then(response => {
        setLawFirms(response.data.data || []);
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
    try {
      const response = await fetch(`/api/api/lawfirms/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
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

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    {
      key: "address",
      label: "City",
      render: (item) => item.address?.city ?? "-"
    },
    { key: "registrationNumber", label: "Registration Number" },
    { key: "establishmentYear", label: "Establishment Year" },
    { key: "totalLawyer", label: "Total Lawyers" },
    {
      key: "successRate",
      label: "Success Rate",
      render: (item) => item.successRate?.toFixed(2) ?? "-"
    },
    {
      key: "clientRating",
      label: "Client Rating",
      render: (item) => item.clientRating?.toFixed(2) ?? "-"
    },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div className="law-firm-actions">
          <IconButton type="edit" onClick={() => openEditPopup(item)} />
          <IconButton type="delete" onClick={() => handleDelete(item.id)} />
        </div>
      )
    }
  ];

  return (
    <div className="law-firm-container">
      <div className="law-firm-header">
        <AddButton text="Add Law-Firm" onClick={openAddPopup} />
      </div>

      <ReusableGrid columns={columns} data={lawFirms} />

      {showPopup && (
        <div className="LawFirm-modal-overlay">
          <div className="LawFirm-modal-content">
            <button className="LawFirm-modal-close" onClick={() => setShowPopup(false)}>
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
