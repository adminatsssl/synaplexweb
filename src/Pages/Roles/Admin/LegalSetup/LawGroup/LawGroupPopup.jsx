import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONbig from 'json-bigint';
import './LawGroupPopup.css'
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

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

    // Prepare payload including address as nested object
    const payload = {
      Name: form.name,
      Email: form.email,
      PhoneNumber: form.phone,
      RegistrationNumber: form.registrationNumber,
      EstablishmentYear: form.year,
      TotalMember: form.totalMember,
      OngoingCases: form.ongoingCases,
      SuccessRate: form.successRate,
      Address_Group: {
        AddressLine: form.addressLine,
        City: form.city,
        State: form.state,
        PinCode: form.pinCode
      }
    };

    if (selectedLawGroup?.ID) {
      const groupIdStr = selectedLawGroup.ID.toString();
      // Correct REST URL with just the ID
      await axiosJson.put(`/api/api/lawgroups/${groupIdStr}`, payload);
    } else {
      await axiosJson.post("/api/api/lawgroups", payload);
    }

    alert(`Law Group ${selectedLawGroup ? "updated" : "submitted"} successfully!`);
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Submission error:", error.response?.data || error.message);
    alert("Failed to submit. Check console for details.");
  }
};

  return (
    <div className="LawGroup-popup-container">
      <div className='LawGroup-Heading' >{selectedLawGroup ? "Edit Law Group" : "Law Group"}</div>

      <div className='LawGroup-Middle-Content'>

        <div className='LawGroup-Middle-FieldContent'>
          <h2 className="LawGroup-section-title">Group Detail</h2>
          <div className="LawGroup-form-grid">
            <label><span>Group Name</span><input name="name" value={form.name} onChange={handleChange} /></label>
            <label><span>Registration No</span><input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} /></label>
            <label><span>Establishment Year</span><input name="year" value={form.year} onChange={handleChange} /></label>
            <label><span>Total Members</span><input name="totalMember" type="number" value={form.totalMember} onChange={handleChange} /></label>
            <label><span>Ongoing Cases</span><input name="ongoingCases" type="number" value={form.ongoingCases} onChange={handleChange} /></label>
            <label><span>Success Rate</span><input name="successRate" type="number" step="0.01" value={form.successRate} onChange={handleChange} /></label>
          </div>
        </div>

        <div className='LawGroup-Middle-FieldContent'>
          <h2 className="LawGroup-section-title">Address</h2>
          <label className="LawGroup-textarea-label">
            <span>Address Line</span>
            <textarea className='LawGroup-textarea' name="addressLine" value={form.addressLine} onChange={handleChange} />
          </label>
          <div className="LawGroup-address-grid">
            <label><span>City</span><br /><input name="city" value={form.city} onChange={handleChange} /></label>
            <label><span>State</span><br /><input name="state" value={form.state} onChange={handleChange} /></label>
            <label><span>PinCode</span><br /><input name="pinCode" value={form.pinCode} onChange={handleChange} /></label>
          </div>
        </div>

        <div className='LawGroup-Middle-FieldContent'>
          <h2 className="LawGroup-section-title">FPR Details:</h2>
          <div className="LawGroup-form-grid">
            <label><span>FPR E-Mail</span><br /><input name="email" value={form.email} onChange={handleChange} /></label>
            <label><span>Phone No</span><br /><input name="phone" value={form.phone} onChange={handleChange} /></label>
          </div>
        </div>

      </div>

      <div className="LawGroup-button-row">
        <CancelButton onClick={onCancel} className="LawGroup-cancel-button" />
        <SaveButton
          onClick={handleSubmit} className="LawGroup-save-button"
          label={selectedLawGroup ? "Update" : "Save"}
        />
      </div>
    </div>
  );
};

export default LawGroupPopup;
