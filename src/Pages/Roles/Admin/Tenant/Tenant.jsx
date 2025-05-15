import React, { useState, useEffect } from "react";
import axios from "axios";
import JSONbig from "json-bigint";
import Layout from "../../../Layout/Layout";
import AddButton from "../../../ReusableComponents/AddButton";
import IconButton from "../../../ReusableComponents/IconButton";
import TenantPopup from "./AddTenantPopup"; // New popup component
// Assuming your reusable grid component is imported from this path:
import ReusableGrid from "../../../ReusableComponents/ReusableGrid"; // Adjust the path if different

import "./Tenant.css"; // Keep existing styles or adapt them for the grid

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
      const res = await axios.get("/odata/pos_tenant/v1/Tenants?$expand=Address", {
        transformResponse: data => JSONbig.parse(data) // Use JSONbig for large integers like IDs
      });
      // Assuming the data is in res.data.value
      setTenants(res.data.value || []);
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
        await axios.delete(`/odata/pos_tenant/v1/Tenants(${tenantId})`);
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

  // Define the columns for the ReusableGrid component
  // Using 'key' and 'label' as per your ReusableGrid example
  const columns = [
    {
      key: "Name",
      label: "Name",
      // If your ReusableGrid doesn't automatically render text for a 'key',
      // you might explicitly add a render function like this:
      // render: (row) => row.Name
    },
    {
      key: "GSTIN",
      label: "GSTIN",
      // render: (row) => row.GSTIN // Optional explicit render
    },
    {
      key: "PANNo",
      label: "PAN No",
      // render: (row) => row.PANNo // Optional explicit render
    },
    {
      key: "City", // Using a key, but will render using the function
      label: "City",
      // Using a render function for nested Address data
      render: (row) => row.Address?.City || "N/A", // Use row instead of tenant
    },
    {
      key: "State", // Using a key, but will render using the function
      label: "State",
      // Using a render function for nested Address data
      render: (row) => row.Address?.State || "N/A", // Use row instead of tenant
    },
    {
      key: "PinCode", // Using a key, but will render using the function
      label: "Pin Code",
      // Using a render function for nested Address data
      render: (row) => row.Address?.PinCode || "N/A", // Use row instead of tenant
    },
    {
      key: "actions", // A unique key for the actions column
      label: "Actions",
      // Custom render function for the actions column
      render: (row) => ( // Use row instead of tenant
        <div className="actions-cell"> {/* Apply styling to the container div */}
          {/* Pass the row object (which is the tenant) to the edit handler */}
          <IconButton type="edit" onClick={() => handleEditClick(row)} />
          {/* Pass the row ID (tenant.ID) to the delete handler */}
          <IconButton type="delete" onClick={() => handleDeleteClick(row.ID)} />
        </div>
      ),
      // Add disableFilter if your grid supports it and you don't want filtering on actions
      // disableFilter: true,
    },
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
