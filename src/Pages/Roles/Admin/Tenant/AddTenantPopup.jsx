import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tenant.css";


const AddTenantPopup = ({ onSuccess, onCancel, selectedTenant }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gstin: "",
    panNo: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: ""
  });

  useEffect(() => {
    if (selectedTenant) {
      setForm({
        name: selectedTenant.Name || "",
        email: selectedTenant.Email || "",
        gstin: selectedTenant.GSTIN || "",
        panNo: selectedTenant.PANNo || "",
        addressLine: selectedTenant.Address?.AddressLine || "",
        city: selectedTenant.Address?.City || "",
        state: selectedTenant.Address?.State || "",
        pinCode: selectedTenant.Address?.PinCode || ""
      });
    }
  }, [selectedTenant]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
        alert("Please fill in all required fields.");
        return;
      }

      let addressId = null;

      // Update address if it exists
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

      // Create address if not available
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

      const payload = {
        Name: form.name,
        Email: form.email,
        GSTIN: form.gstin,
        PANNo: form.panNo,
        "Address@odata.bind": `Addresses(${addressId})`
      };

      // Create or update Tenant
      if (selectedTenant?.ID) {
        await axios.patch(`/odata/pos_tenant/v1/Tenants(${selectedTenant.ID})`, payload);
      } else {
        await axios.post("/odata/pos_tenant/v1/Tenants", payload);
      }

      alert(`Tenant ${selectedTenant ? "updated" : "created"} successfully!`);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error saving tenant:", err.response?.data || err.message);
      alert("Failed to save tenant. See console for details.");
    }
  };

  return (
    <div className="popup-container">
      <h2 className="section-title">{selectedTenant ? "Edit Tenant" : "Add New Tenant"}</h2>

      <div className="form-grid">
        <label><span>Name</span><input name="name" value={form.name} onChange={handleChange} /></label>
        <label><span>Email</span><input name="email" value={form.email} onChange={handleChange} /></label>
        <label><span>GSTIN</span><input name="gstin" value={form.gstin} onChange={handleChange} /></label>
        <label><span>PAN No</span><input name="panNo" value={form.panNo} onChange={handleChange} /></label>
      </div>

      <h2 className="section-title">Address</h2>
      <label className="textarea-label">
        <span>Address Line</span>
        <textarea name="addressLine" value={form.addressLine} onChange={handleChange} />
      </label>
      <div className="address-grid">
        <label><span>City</span><input name="city" value={form.city} onChange={handleChange} /></label>
        <label><span>State</span><input name="state" value={form.state} onChange={handleChange} /></label>
        <label><span>Pin Code</span><input name="pinCode" value={form.pinCode} onChange={handleChange} /></label>
      </div>

      <div className="button-row">
        <button onClick={onCancel} className="cancel-button">Cancel</button>
        <button onClick={handleSubmit} className="save-button">
          {selectedTenant ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddTenantPopup;
