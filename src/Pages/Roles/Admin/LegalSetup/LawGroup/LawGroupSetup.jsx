import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
import AddButton from '../../../../ReusableComponents/AddButton';
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
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`LawGroup ${groupId} deleted successfully.`);
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

  return (
    <div className="lawgroup-container">
      <div className="header-row">
        {/* <h1 className="lawgroup-title">Law Groups</h1> */}
        <div className="add-btn-wrapper">
          <AddButton text="Add Law-Group" onClick={openAddPopup} />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="lawgroup-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Total Members</th>
              <th>Ongoing Cases</th>
              <th>Success Rate</th>
              <th>Registration Number</th>
              <th>Establishment Year</th>
              <th>Address Line</th>
              <th>City</th>
              <th>State</th>
              <th>Pin Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawGroups.map(group => (
              <tr key={group.ID}>
                <td>{group.Name || '-'}</td>
                <td>{group.Email || '-'}</td>
                <td>{group.PhoneNumber || '-'}</td>
                <td>{group.TotalMember ?? '-'}</td>
                <td>{group.OngoingCases ?? '-'}</td>
                <td>{group.SuccessRate?.toFixed(2) ?? '-'}</td>
                <td>{group.RegistrationNumber || '-'}</td>
                <td>{group.EstablishmentYear || '-'}</td>
                <td>{group.Address_Group?.AddressLine || '-'}</td>
                <td>{group.Address_Group?.City || '-'}</td>
                <td>{group.Address_Group?.State || '-'}</td>
                <td>{group.Address_Group?.PinCode || '-'}</td>
                <td className="action-buttons">
                  <IconButton type="edit" onClick={() => openEditPopup(group)} />
                  <IconButton type="delete" onClick={() => handleDelete(group.ID)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowPopup(false)}>✕</button>
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
