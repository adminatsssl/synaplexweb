import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid'; // ✅ Import added
import LawGroupPopup from "./LawGroupPopup"; 
import './LawGroup.css'; 
 
const LawGroup = () => {
  const [lawGroups, setLawGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLawGroup, setSelectedLawGroup] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchLawGroups = () => {
    setLoading(true);
    axios
      .get("/odata/lawgroup/Groups?$expand=Address_Group")
      .then(response => {
        setLawGroups(response.data.value || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching law groups:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLawGroups();
  }, [refreshTrigger]);

  const handleSuccess = () => {
    setShowPopup(false);
    setSelectedLawGroup(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const openAddPopup = () => {
    setSelectedLawGroup(null);
    setShowPopup(true);
  };

  const openEditPopup = (group) => {
    setSelectedLawGroup(group);
    setShowPopup(true);
  };

  const handleDelete = async (groupId) => {
    try {
      const response = await fetch(`/odata/lawgroup/Groups(${groupId})`, {
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // ✅ Define columns for ReusableGrid
  const columns = [
    { key: "Name", label: "Name" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    {
      key: "AddressLine",
      label: "Address",
      render: (item) => item.Address_Group?.AddressLine ?? "-"
    },
    { key: "TotalMember", label: "Total Members" },
    { key: "OngoingCases", label: "Ongoing Cases" },
    {
      key: "SuccessRate",
      label: "Success Rate",
      render: (item) => item.SuccessRate?.toFixed(2) ?? "-"
    },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div className="action-buttons">
          <IconButton type="edit" onClick={() => openEditPopup(item)} />
          <IconButton type="delete" onClick={() => handleDelete(item.ID)} />
        </div>
      )
    }
  ];

  return (
    <div className="lawgroup-container">
      <div className="header-row">
        <div className="add-btn-wrapper">
          <AddButton text="Add Law-Group" onClick={openAddPopup} />
        </div>
      </div>

      {/* ✅ Use ReusableGrid here */}
      <ReusableGrid columns={columns} data={lawGroups} />

      {showPopup && (
        <div className="LawGroup-modal-overlay">
          <div className="LawGroup-modal-content">
            <button className="LawGroup-modal-close" onClick={() => setShowPopup(false)}>✕</button>
            <LawGroupPopup
              selectedLawGroup={selectedLawGroup}
              onSuccess={handleSuccess}
              onCancel={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LawGroup;
