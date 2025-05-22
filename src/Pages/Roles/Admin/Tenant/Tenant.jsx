import React, { useState, useEffect } from "react";
import axios from "axios";
import JSONbig from "json-bigint";
import Layout from "../../../Layout/Layout";
import AddButton from "../../../ReusableComponents/AddButton";
import IconButton from "../../../ReusableComponents/IconButton";
import TenantPopup from "./AddTenantPopup"; 
import ReusableGrid from "../../../ReusableComponents/ReusableGrid"; 
import "./Tenant.css";

const TenantManager = () => {
  const [tenants, setTenants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Function to show temporary messages
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Function to fetch tenants data
const fetchTenants = async () => {
  try {
    const res = await axios.get("/api/api/tenants", {
      transformResponse: data => JSONbig.parse(data)
    });
    if (res.data.status === "SUCCESS" && Array.isArray(res.data.data)) {
      setTenants(res.data.data);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching tenants:", error);
    showMessage("Failed to fetch tenants", "error");
  }
};


  // Fetch tenants on component mount
  useEffect(() => {
    fetchTenants();
  }, []); // Empty dependency array ensures this runs only once

  // Handler for clicking the "Add Tenant" button
  const handleAddClick = () => {
    setSelectedTenant(null); // Clear selected tenant for add operation
    setShowPopup(true); // Show the add/edit popup
  };

  // Handler for clicking the "Edit" icon button
  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant); // Set the tenant to be edited
    setShowPopup(true); // Show the add/edit popup
  };

  // Handler for clicking the "Delete" icon button
  const handleDeleteClick = async (tenantId) => {
    try {
      if (window.confirm("Are you sure you want to delete this tenant?")) {
        await axios.delete(`/api/api/tenants/${tenantId}`);
        showMessage("Tenant deleted successfully!", "success");
        fetchTenants(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting tenant:", error.response?.data || error.message);
      showMessage("Failed to delete tenant.", "error");
    }
  };

  // Handler for successful operation (add/edit) in the popup
  const handlePopupSuccess = () => {
    setShowPopup(false); // Close the popup
    fetchTenants(); // Refresh the list
    showMessage(`Tenant ${selectedTenant ? "updated" : "created"} successfully!`, "success");
  };

  // Handler for canceling the popup
  const handlePopupCancel = () => {
    setShowPopup(false); // Close the popup
  };

  const columns = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "gstin",
    label: "GSTIN"
  },
  {
    key: "panNo",
    label: "PAN No"
  },
  {
    key: "city",
    label: "City",
    render: (row) => row.address?.city || "N/A"
  },
  {
    key: "state",
    label: "State",
    render: (row) => row.address?.state || "N/A"
  },
  {
    key: "pincode",
    label: "Pin Code",
    render: (row) => row.address?.pincode || "N/A"
  },
  {
    key: "actions",
    label: "Actions",
    render: (row) => (
      <div className="actions-cell">
        <IconButton type="edit" onClick={() => handleEditClick(row)} />
        <IconButton type="delete" onClick={() => handleDeleteClick(row.id)} />
      </div>
    )
  }
];


  return (
    <Layout>
      <div className="tenant-manager">
        <div className="tenant-header">
          <h1>Tenant Management</h1>
          <AddButton onClick={handleAddClick} text="Add Tenant" />
        </div>

        {/* Message box for success/error messages */}
        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Integrate the ReusableGrid component */}
        <div className="tenant-grid-container"> {/* Use a different class name if needed */}
          <ReusableGrid
            columns={columns} // Pass the defined columns
            data={tenants} // Pass the tenants data
            // Add other props your grid might require, like onRowClick, etc.
          />
        </div>

        {/* Popup for adding or editing tenants */}
        {showPopup && (
          <TenantPopup
            isOpen={showPopup}
            selectedTenant={selectedTenant}
            onSuccess={handlePopupSuccess}
            onClose={handlePopupCancel}
          />
        )}
      </div>
    </Layout>
  );
};

export default TenantManager;
