import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid';
import LawGroupPopup from "./LawGroupPopup";
import './LawGroup.css';

const LawGroup = () => {
  const [lawGroups, setLawGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLawGroup, setSelectedLawGroup] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchLawGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/api/lawgroups");
      const rawData = response.data.data || [];

      // Transform API response to match expected structure
      const transformedData = rawData.map(group => ({
        ID: group.id,
        Name: group.name,
        Email: group.email,
        PhoneNumber: group.phone,
        AddressLine: group.address?.addressLine || `${group.address.city}, ${group.address.state} ${group.address.pincode}`,
        TotalMember: group.totalLawyer,
        OngoingCases: "N/A", // or add if available
        SuccessRate: group.successRate,
      }));

      setLawGroups(transformedData);
    } catch (error) {
      console.error("Error fetching law groups:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
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
      const response = await fetch(`/api/api/lawgroups/${groupId}`, {
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

  const columns = [
    { key: "Name", label: "Name" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    {
      key: "AddressLine",
      label: "Address",
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
