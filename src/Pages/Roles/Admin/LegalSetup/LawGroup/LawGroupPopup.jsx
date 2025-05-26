// LawGroupPopup.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONbig from 'json-bigint';
import './LawGroupPopup.css';
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton.jsx";

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
        name: selectedLawGroup.name || '',
        registrationNumber: selectedLawGroup.registrationNumber || '',
        year: selectedLawGroup.establishmentYear || '',
        totalMember: selectedLawGroup.totalLawyer?.toString() || '0',
        ongoingCases: selectedLawGroup.ongoingCases?.toString() || '0',
        successRate: selectedLawGroup.successRate?.toString() || '0.00',
        addressLine: selectedLawGroup.address?.addressLine || '',
        city: selectedLawGroup.address?.city || '',
        state: selectedLawGroup.address?.state || '',
        pinCode: selectedLawGroup.address?.pincode || '',
        email: selectedLawGroup.email || '',
        phone: selectedLawGroup.phone || ''
      });
    }
  }, [selectedLawGroup]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
      alert("Please complete all required fields, including address.");
      return;
    }

    const payload = {
      name: form.name,
      registrationNumber: form.registrationNumber,
      email: form.email,
      phone: form.phone,
      establishmentYear: form.year,
      totalLawyer: form.totalMember,
      ongoingCases: form.ongoingCases,
      successRate: form.successRate,
      address: {
        addressLine: form.addressLine,
        city: form.city,
        state: form.state,
        pincode: form.pinCode
      }
    };

    try {
      if (selectedLawGroup?.id || selectedLawGroup?.ID) {
        const id = selectedLawGroup.id || selectedLawGroup.ID;
        await axiosJson.put(`/api/api/lawgroups/${id}`, payload);
      } else {
        await axiosJson.post("/api/api/lawgroups", payload);
      }

      // alert(`Law Group ${selectedLawGroup ? "updated" : "created"} successfully!`);
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit. Check console for details.");
    }
  };

  return (
    <form className="LawGroup-popup-container" onSubmit={handleSubmit}>
      <div className="LawGroup-Heading">{selectedLawGroup ? "Edit Law Group" : "Law Group"}</div>

      <div className="LawGroup-Middle-Content">
        <div className="LawGroup-Middle-FieldContent">
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

        <div className="LawGroup-Middle-FieldContent">
          <h2 className="LawGroup-section-title">Address</h2>
          <label className="LawGroup-textarea-label">
            <span>Address Line</span>
            <textarea name="addressLine" className="LawGroup-textarea" value={form.addressLine} onChange={handleChange} />
          </label>
          <div className="LawGroup-address-grid">
            <label><span>City</span><input name="city" value={form.city} onChange={handleChange} /></label>
            <label><span>State</span><input name="state" value={form.state} onChange={handleChange} /></label>
            <label><span>PinCode</span><input name="pinCode" value={form.pinCode} onChange={handleChange} /></label>
          </div>
        </div>

        <div className="LawGroup-Middle-FieldContent">
          <h2 className="LawGroup-section-title">FPR Details</h2>
          <div className="LawGroup-form-grid">
            <label><span>FPR E-Mail</span><input name="email" value={form.email} onChange={handleChange} /></label>
            <label><span>Phone No</span><input name="phone" value={form.phone} onChange={handleChange} /></label>
          </div>
        </div>
      </div>

      <div className="LawGroup-button-row">
        <CancelButton onClick={onCancel} className="LawGroup-cancel-button" />
        <SaveButton type="submit" className="LawGroup-save-button" />
      </div>
    </form>
  );
};

export default LawGroupPopup;
