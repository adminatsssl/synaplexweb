// AddTenantPopup.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tenant.css";

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
    <div className="borrower-modal">
      <div className="borrower-content">
        <div className="borrower-header">
          {selectedTenant ? "Edit Tenant" : "Add New Tenant"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="borrower-body grid-2">
            {[
              { label: "Tenant Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "PAN No.", name: "panNo", type: "text" },
              { label: "GSTIN", name: "gstin", type: "text" },
              { label: "FRP Name", name: "frpName", type: "text" },
              { label: "FRP Email", name: "frpEmail", type: "email" },
              { label: "FRP Phone", name: "frpPhone", type: "tel" },
              {
                label: "Upload Image",
                name: "image",
                type: "file",
                render: () => (
                  <div className="image-upload-group">
                    {form.imagePreview && (
                      <div className="image-preview">
                        <img src={form.imagePreview} alt="Tenant Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </div>
                    )}
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="upload-placeholder">
                        📄 Browse...
                      </label>
                    </div>
                  </div>
                ),
              },
              { label: "Address Line", name: "addressLine", type: "textarea", fullWidth: true },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Pin Code", name: "pinCode", type: "text" },
            ].map((field) => (
              <div className={`form-item ${field.fullWidth ? 'full-width' : ''}`} key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                  />
                ) : field.type === 'file' ? (
                  field.render()
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="borrower-footer">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {selectedTenant ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantPopup;