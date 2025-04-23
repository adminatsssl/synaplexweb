import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from "../../../../ReusableComponents/IconButton";
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
    console.log("Deleting LawFirm ID:", stringId);
    try {
      const response = await fetch(`/odata/LawFirms(${stringId})`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`LawFirm ${stringId} deleted successfully.`);
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
        <h1 className="text-2xl font-bold">Law Firms</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={openAddPopup}
        >
          Add Law Firm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Registration Number</th>
              <th className="border px-4 py-2">Establishment Year</th>
              <th className="border px-4 py-2">Total Lawyers</th>
              <th className="border px-4 py-2">Success Rate</th>
              <th className="border px-4 py-2">Client Rating</th>
              <th className="border px-4 py-2">Address Line</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">Pin Code</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawFirms.map(firm => (
              <tr key={firm.ID}>
                <td className="border px-4 py-2">{firm.Name || '-'}</td>
                <td className="border px-4 py-2">{firm.Email || '-'}</td>
                <td className="border px-4 py-2">{firm.PhoneNumber || '-'}</td>
                <td className="border px-4 py-2">{firm.RegistrationNumber || '-'}</td>
                <td className="border px-4 py-2">{firm.EstablishmentYear || '-'}</td>
                <td className="border px-4 py-2">{firm.TotalLawyers}</td>
                <td className="border px-4 py-2">{firm.SuccessRate?.toFixed(2)}</td>
                <td className="border px-4 py-2">{firm.ClientRating?.toFixed(2)}</td>
                <td className="border px-4 py-2">{firm.Address_LawFirm?.AddressLine || '-'}</td>
                <td className="border px-4 py-2">{firm.Address_LawFirm?.City || '-'}</td>
                <td className="border px-4 py-2">{firm.Address_LawFirm?.State || '-'}</td>
                <td className="border px-4 py-2">{firm.Address_LawFirm?.PinCode || '-'}</td>
                <td style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  <IconButton type="edit" onClick={() => openEditPopup(firm)} />
                  <IconButton type="delete" onClick={() => handleDelete(firm.ID)} />
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
