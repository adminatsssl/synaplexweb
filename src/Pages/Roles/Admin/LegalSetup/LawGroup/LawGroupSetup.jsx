// LawGroup.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid';
import LawGroupPopup from "./LawGroupPopup";
import './LawGroup.css';

const LawGroup = () => {
  const [lawGroups, setLawGroups] = useState([]);
  const [rawLawGroups, setRawLawGroups] = useState([]);
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

      const transformedData = rawData.map(group => ({
        ID: group.id,
        Name: group.name,
        Email: group.email,
        PhoneNumber: group.phone,
        AddressLine: group.address
          ? `${group.address.addressLine}, ${group.address.city}, ${group.address.state} ${group.address.pincode}`
          : "-",
        TotalMember: group.totalLawyer,
        OngoingCases: group.ongoingCases ?? "N/A",
        SuccessRate: group.successRate,
        RegistrationNumber: group.registrationNumber,
        EstablishmentYear: group.establishmentYear,
      }));

      setRawLawGroups(rawData);
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

  const openEditPopup = (groupRow) => {
    const originalGroup = rawLawGroups.find(group => group.id === groupRow.ID);
    setSelectedLawGroup(originalGroup);
    setShowPopup(true);
  };

  const handleDelete = async (groupId) => {
    try {
      const response = await axios.delete(`/api/api/lawgroups/${groupId}`);
      if (response.status === 200) {
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert("Failed to delete law group.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("An error occurred during deletion.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const columns = [
    { key: "Name", label: "Name" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    { key: "AddressLine", label: "Address" },
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
