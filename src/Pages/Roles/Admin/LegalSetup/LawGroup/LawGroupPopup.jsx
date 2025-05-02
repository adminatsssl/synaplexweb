import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONbig from 'json-bigint';
import './LawGroupPopup.css'

// Create custom axios instance with json-bigint
const axiosJson = axios.create({
  transformResponse: [data => {
    try {
      return JSONbig.parse(data);
    } catch {
      return data;
    }
  }]
});

const LawGroupPopup = ({ onSuccess, onCancel, selectedLawGroup }) => {
  const [form, setForm] = useState({
    name: '',
    registrationNumber: '',
    year: '',
    totalMember: '0',
    ongoingCases: '0',
    successRate: '0.00',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (selectedLawGroup) {
      setForm({
        name: selectedLawGroup.Name || '',
        registrationNumber: selectedLawGroup.RegistrationNumber || '',
        year: selectedLawGroup.EstablishmentYear || '',
        totalMember: selectedLawGroup.TotalMember?.toString() || '0',
        ongoingCases: selectedLawGroup.OngoingCases?.toString() || '0',
        successRate: selectedLawGroup.SuccessRate?.toString() || '0.00',
        addressLine: selectedLawGroup.Address_Group?.AddressLine || '',
        city: selectedLawGroup.Address_Group?.City || '',
        state: selectedLawGroup.Address_Group?.State || '',
        pinCode: selectedLawGroup.Address_Group?.PinCode || '',
        email: selectedLawGroup.Email || '',
        phone: selectedLawGroup.PhoneNumber || ''
      });
    }
  }, [selectedLawGroup]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
        alert("Please complete all required fields, including address.");
        return;
      }

      let addressId = null;

      // Update or Create Address
      if (selectedLawGroup?.Address_Group?.ID) {
        const addrIdStr = selectedLawGroup.Address_Group.ID.toString();
        try {
          await axiosJson.get(`/odata/lawgroup/Addresses(${addrIdStr})`);
          addressId = addrIdStr;

          await axiosJson.patch(`/odata/lawgroup/Addresses(${addressId})`, {
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
        const addressRes = await axiosJson.post("/odata/lawgroup/Addresses", {
          AddressLine: form.addressLine,
          City: form.city,
          State: form.state,
          PinCode: form.pinCode
        });

        if (!addressRes.data?.ID) {
          throw new Error("Address creation failed — missing ID.");
        }

        addressId = addressRes.data.ID.toString();
      }

      // Construct LawGroup payload
      const payload = {
        Name: form.name,
        Email: form.email,
        PhoneNumber: form.phone,
        RegistrationNumber: form.registrationNumber,
        EstablishmentYear: form.year,
        TotalMember: parseInt(form.totalMember),
        OngoingCases: parseInt(form.ongoingCases),
        SuccessRate: parseFloat(form.successRate),
        "Address_Group@odata.bind": `Addresses(${addressId})`
      };

      // Create or update LawGroup
      if (selectedLawGroup?.ID) {
        const groupIdStr = selectedLawGroup.ID.toString();
        await axiosJson.patch(`/odata/lawgroup/Groups(${groupIdStr})`, payload);
      } else {
        await axiosJson.post("/odata/lawgroup/Groups", payload);
      }

      alert(`Law Group ${selectedLawGroup ? "updated" : "submitted"} successfully!`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit. Check console for details.");
    }
  };

  return (
    <div className="popup-container">
      <h2 className="section-title">{selectedLawGroup ? "Edit Law Group" : "Law Group Detail"} :</h2>
      <div className="form-grid">
        <label><span>Group Name</span><input name="name" value={form.name} onChange={handleChange} /></label>
        <label><span>Registration No</span><input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} /></label>
        <label><span>Establishment Year</span><input name="year" value={form.year} onChange={handleChange} /></label>
        <label><span>Total Members</span><input name="totalMember" type="number" value={form.totalMember} onChange={handleChange} /></label>
        <label><span>Ongoing Cases</span><input name="ongoingCases" type="number" value={form.ongoingCases} onChange={handleChange} /></label>
        <label><span>Success Rate</span><input name="successRate" type="number" step="0.01" value={form.successRate} onChange={handleChange} /></label>
      </div>

      <h2 className="section-title">Address</h2>
      <label className="textarea-label">
        <span>Address Line</span>
        <textarea name="addressLine" value={form.addressLine} onChange={handleChange} />
      </label>
      <div className="address-grid">
        <label><span>City</span><input name="city" value={form.city} onChange={handleChange} /></label>
        <label><span>State</span><input name="state" value={form.state} onChange={handleChange} /></label>
        <label><span>PinCode</span><input name="pinCode" value={form.pinCode} onChange={handleChange} /></label>
      </div>

      <h2 className="section-title">FPR Details:</h2>
      <div className="form-grid">
        <label><span>FPR E-Mail</span><input name="email" value={form.email} onChange={handleChange} /></label>
        <label><span>Phone No</span><input name="phone" value={form.phone} onChange={handleChange} /></label>
      </div>

      <div className="button-row">
        <button onClick={onCancel} className="cancel-button">Cancel</button>
        <button onClick={handleSubmit} className="save-button">
          {selectedLawGroup ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default LawGroupPopup;
