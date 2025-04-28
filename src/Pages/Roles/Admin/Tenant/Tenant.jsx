import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tenant.css";
import JSONbig from "json-bigint";
import AddTenantPopup from "./AddTenantPopup";
import { Pencil, Trash2 } from "lucide-react";
import Layout from "../../../Layout/Layout";

const TenantManager = () => {
  const [tenants, setTenants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const username = localStorage.getItem("username");
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const fetchTenants = async () => {
    try {
      const res = await axios.get("/odata/pos_tenant/v1/Tenants?$expand=Address", {
        transformResponse: data => JSONbig.parse(data)
      });
      setTenants(res.data.value || []);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAddClick = () => {
    setSelectedTenant(null);
    setShowPopup(true);
  };

  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);
    setShowPopup(true);
  };

  const handleDeleteClick = async (tenantId) => {
    try {
      if (window.confirm("Are you sure you want to delete this tenant?")) {
        await axios.delete(`/odata/pos_tenant/v1/Tenants(${tenantId})`);
        showMessage("Tenant deleted successfully!", "success");
        fetchTenants();
      }
    } catch (error) {
      console.error("Error deleting tenant:", error.response?.data || error.message);
      showMessage("Failed to delete tenant.", "error");
    }
  };

  const handlePopupSuccess = () => {
    setShowPopup(false);
    fetchTenants();
    showMessage(`Tenant ${selectedTenant ? "updated" : "created"} successfully!`, "success");
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  return (
        <Layout username={username}>
    <div className="tenant-manager">
      <h1>Tenant Management</h1>
      <button onClick={handleAddClick} className="add-button">Add Tenant</button>

      {message.text && (
        <div className={`message-box ${message.type}`}>{message.text}</div>
      )}

      <table className="tenant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>GSTIN</th>
            <th>PAN No</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.ID}>
              <td>{tenant.Name}</td>
              <td>{tenant.Email}</td>
              <td>{tenant.GSTIN}</td>
              <td>{tenant.PANNo}</td>
              <td>{tenant.Address?.City}</td>
              <td>{tenant.Address?.State}</td>
              <td>{tenant.Address?.PinCode}</td>
              <td>
                <button
                  className="icon-button edit"
                  onClick={() => handleEditClick(tenant)}
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="icon-button delete"
                  onClick={() => handleDeleteClick(tenant.ID)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <AddTenantPopup
              selectedTenant={selectedTenant}
              onSuccess={handlePopupSuccess}
              onCancel={handlePopupCancel}
            />
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default TenantManager;
