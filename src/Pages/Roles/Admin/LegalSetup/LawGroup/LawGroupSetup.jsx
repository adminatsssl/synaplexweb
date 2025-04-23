import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
import LawGroupPopup from "./LawGroupPopup";

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

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Law Groups</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={openAddPopup}
        >
          Add Law Group
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Total Members</th>
              <th className="border px-4 py-2">Ongoing Cases</th>
              <th className="border px-4 py-2">Success Rate</th>
              <th className="border px-4 py-2">Registration Number</th>
              <th className="border px-4 py-2">Establishment Year</th>
              <th className="border px-4 py-2">Address Line</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">Pin Code</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawGroups.map(group => (
              <tr key={group.ID}>
                <td className="border px-4 py-2">{group.Name || '-'}</td>
                <td className="border px-4 py-2">{group.Email || '-'}</td>
                <td className="border px-4 py-2">{group.PhoneNumber || '-'}</td>
                <td className="border px-4 py-2">{group.TotalMember ?? '-'}</td>
                <td className="border px-4 py-2">{group.OngoingCases ?? '-'}</td>
                <td className="border px-4 py-2">{group.SuccessRate?.toFixed(2) ?? '-'}</td>
                <td className="border px-4 py-2">{group.RegistrationNumber || '-'}</td>
                <td className="border px-4 py-2">{group.EstablishmentYear || '-'}</td>
                <td className="border px-4 py-2">{group.Address_Group?.AddressLine || '-'}</td>
                <td className="border px-4 py-2">{group.Address_Group?.City || '-'}</td>
                <td className="border px-4 py-2">{group.Address_Group?.State || '-'}</td>
                <td className="border px-4 py-2">{group.Address_Group?.PinCode || '-'}</td>
                <td style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
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
            <button className="modal-close" onClick={() => setShowPopup(false)}>
              ✕
            </button>
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
