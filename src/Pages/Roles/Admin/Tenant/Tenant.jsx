import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tenant.css";
import JSONbig from "json-bigint";
import Layout from "../../../Layout/Layout";
import AddButton from "../../../ReusableComponents/AddButton";
import IconButton from "../../../ReusableComponents/IconButton";
import { Pencil, Trash2 } from "lucide-react";

const TenantManager = () => {
  const [tenants, setTenants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

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

  const AddTenantPopup = ({ onSuccess, onCancel, selectedTenant }) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      gstin: "",
      panNo: "",
      frpName: "",
      frpEmail: "",
      frpPhone: "",
      addressLine: "",
      city: "",
      state: "",
      pinCode: "",
      image: null,
      imagePreview: null,
    });

    useEffect(() => {
      if (selectedTenant) {
        setForm({
          name: selectedTenant.Name || "",
          email: selectedTenant.Email || "",
          gstin: selectedTenant.GSTIN || "",
          panNo: selectedTenant.PANNo || "",
          frpName: selectedTenant.FRPName || "",
          frpEmail: selectedTenant.FRPEmail || "",
          frpPhone: selectedTenant.FRPPhone || "",
          addressLine: selectedTenant.Address?.AddressLine || "",
          city: selectedTenant.Address?.City || "",
          state: selectedTenant.Address?.State || "",
          pinCode: selectedTenant.Address?.PinCode || "",
          image: null,
          imagePreview: selectedTenant.Image || null,
        });
      }
    }, [selectedTenant]);

    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setForm(prev => {
        if (type === 'file') {
          return {
            ...prev,
            [name]: files[0],
            imagePreview: URL.createObjectURL(files[0]),
          };
        }
        return { ...prev, [name]: value };
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
          alert("Please fill in all required fields.");
          return;
        }

        let addressId = null;

        if (selectedTenant?.Address?.ID) {
          try {
            await axios.get(`/odata/pos_tenant/v1/Addresses(${selectedTenant.Address.ID})`);
            addressId = selectedTenant.Address.ID;

            await axios.patch(`/odata/pos_tenant/v1/Addresses(${addressId})`, {
              AddressLine: form.addressLine,
              City: form.city,
              State: form.state,
              PinCode: form.pinCode
            });
          } catch {
            console.warn("Address not found. Will create a new one.");
          }
        }

        if (!addressId) {
          const addressRes = await axios.post("/odata/pos_tenant/v1/Addresses", {
            AddressLine: form.addressLine,
            City: form.city,
            State: form.state,
            PinCode: form.pinCode
          });

          if (!addressRes.data?.ID) {
            throw new Error("Failed to create address.");
          }

          addressId = addressRes.data.ID;
        }

        const payload = new FormData();
        payload.append('Name', form.name);
        payload.append('Email', form.email);
        payload.append('GSTIN', form.gstin);
        payload.append('PANNo', form.panNo);
        payload.append('FRPName', form.frpName);
        payload.append('FRPEmail', form.frpEmail);
        payload.append('FRPPhone', form.frpPhone);
        payload.append('Address@odata.bind', `Addresses(${addressId})`);
        if (form.image) {
          payload.append('Image', form.image);
        }

        if (selectedTenant?.ID) {
          await axios.patch(`/odata/pos_tenant/v1/Tenants(${selectedTenant.ID})`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          await axios.post("/odata/pos_tenant/v1/Tenants", payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        alert(`Tenant ${selectedTenant ? "updated" : "created"} successfully!`);
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error("Error saving tenant:", err.response?.data || err.message);
        alert("Failed to save tenant. See console for details.");
      }
    };

    return (
      <div className="add-loan-popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2>{selectedTenant ? "Edit Tenant" : "Add New Tenant"}</h2>
            <button className="close-btn" onClick={onCancel}>×</button>
          </div>

          <div className="form-sections-container">
            <div className="form-section">
              <h3>Tenant Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tenant Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>PAN No.</label>
                  <input type="text" name="panNo" value={form.panNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>GSTIN</label>
                  <input type="text" name="gstin" value={form.gstin} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>FRP Name</label>
                  <input type="text" name="frpName" value={form.frpName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>FRP Email</label>
                  <input type="email" name="frpEmail" value={form.frpEmail} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>FRP Phone</label>
                  <input type="tel" name="frpPhone" value={form.frpPhone} onChange={handleChange} />
                </div>
                <div className="form-group image-upload-group">
                  <label>Upload Image</label>
                  {form.imagePreview && (
                    <div className="image-preview">
                      <img src={form.imagePreview} alt="Tenant Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                  )}
                  <div className="file-input-wrapper">
                    <input type="file" name="image" onChange={handleChange} accept="image/*" />
                    <div className="upload-placeholder">📄 Browse...</div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="form-section">
              <h3>Address Details</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Address Line</label>
                  <textarea name="addressLine" value={form.addressLine} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pin Code</label>
                  <input type="text" name="pinCode" value={form.pinCode} onChange={handleChange} />
                </div>
              </div>
            </div>
             <hr/>
            <div className="form-section">
              <h3>FPR Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>FPR Name</label>
                  <input type="text" name="frpName" value={form.frpName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>FPR Email</label>
                  <input type="email" name="frpEmail" value={form.frpEmail} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>FRP Phone</label>
                  <input type="tel" name="frpPhone" value={form.frpPhone} onChange={handleChange} />
                </div>
                </div>
                </div>
          </div>

          <div className="popup-actions">
            <button className="btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit}>
              {selectedTenant ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="tenant-manager">
        <div className="tenant-header">
          <h1>Tenant Management</h1>
          <AddButton onClick={handleAddClick} text="Add Tenant" />
        </div>

        {message.text && (
          <div className={`message-box ${message.type}`}>{message.text}</div>
        )}

        <div className="loans-table-container styled-lookalike">
          <table className="loans-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>GSTIN</th>
                <th>PAN No</th>
                <th>FRP Name</th>
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
                  <td>{tenant.FRPName}</td>
                  <td>{tenant.Address?.City}</td>
                  <td>{tenant.Address?.State}</td>
                  <td>{tenant.Address?.PinCode}</td>
                  <td className="actions-cell">
                    {/*<button className="view-btn">👁</button>*/}
                    <IconButton type="edit" onClick={() => handleEditClick(tenant)} />
                    <IconButton type="delete" onClick={() => handleDeleteClick(tenant.ID)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPopup && (
          <AddTenantPopup
            selectedTenant={selectedTenant}
            onSuccess={handlePopupSuccess}
            onCancel={handlePopupCancel}
          />
        )}
      </div>
    </Layout>
  );
};

export default TenantManager;
