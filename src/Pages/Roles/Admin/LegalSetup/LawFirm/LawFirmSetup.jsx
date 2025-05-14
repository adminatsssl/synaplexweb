import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid"; // ✅ Import added
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
    try {
      const response = await fetch(`/odata/LawFirms(${stringId})`, {
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

  // ✅ Define columns for ReusableGrid
  const columns = [
    { key: "Name", label: "Name" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    {
      key: "AddressLine",
      label: "Address",
      render: (item) => item.Address_LawFirm?.AddressLine ?? "-"
    },
    { key: "RegistrationNumber", label: "Registration Number" },
    { key: "EstablishmentYear", label: "Establishment Year" },
    { key: "TotalLawyers", label: "Total Lawyers" },
    {
      key: "SuccessRate",
      label: "Success Rate",
      render: (item) => item.SuccessRate?.toFixed(2) ?? "-"
    },
    {
      key: "ClientRating",
      label: "Client Rating",
      render: (item) => item.ClientRating?.toFixed(2) ?? "-"
    },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div className="law-firm-actions">
          <IconButton type="edit" onClick={() => openEditPopup(item)} />
          <IconButton type="delete" onClick={() => handleDelete(item.ID)} />
        </div>
      )
    }
  ];

  return (
    <div className="law-firm-container">
      <div className="law-firm-header">
        <AddButton text="Add Law-Firm" onClick={openAddPopup} />
      </div>

      {/* ✅ Use ReusableGrid here */}
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
