import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";
import './LawFirm.css';

const LawFirmPopup = ({ onSuccess, onCancel, selectedLawFirm }) => {
  const [form, setForm] = useState({
    name: '',
    registrationNumber: '',
    year: '',
    totalLawyers: '0',
    successRate: '0.00',
    rating: '0.00',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (selectedLawFirm) {
      setForm({
        name: selectedLawFirm.name || '',
        registrationNumber: selectedLawFirm.registrationNumber || '',
        year: selectedLawFirm.establishmentYear || '',
        totalLawyers: selectedLawFirm.totalLawyer?.toString() || '0',
        successRate: selectedLawFirm.successRate?.toString() || '0.00',
        rating: selectedLawFirm.clientRating?.toString() || '0.00',
        addressLine: selectedLawFirm.address?.addressLine || '',
        city: selectedLawFirm.address?.city || '',
        state: selectedLawFirm.address?.state || '',
        pinCode: selectedLawFirm.address?.pinCode || '',
        email: selectedLawFirm.email || '',
        phone: selectedLawFirm.phone || ''
      });
    }
  }, [selectedLawFirm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      registrationNumber: form.registrationNumber,
      establishmentYear: form.year,
      totalLawyer: parseInt(form.totalLawyers),
      successRate: parseFloat(form.successRate),
      clientRating: parseFloat(form.rating),
      email: form.email,
      phone: form.phone,
      address: {
        addressLine: form.addressLine,
        city: form.city,
        state: form.state,
        pinCode: form.pinCode
      }
    };

    try {
      if (selectedLawFirm?.id) {
        await axios.put(`/api/api/lawfirms/${selectedLawFirm.id}`, payload);
      } else {
        await axios.post('/api/api/lawfirms', payload);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error submitting law firm:", error.response?.data || error.message);
      alert("Failed to submit law firm. Check the console for more info.");
    }
  };

  return (
    <div className="LawFirm-popup-container">
      <div className='LawFirm-popup-heading'>
        <h2>{selectedLawFirm ? "Edit Law Firm" : "Law Firm"}</h2>
      </div>

      <div className='LawFirm-Middle-Content'>
        <div className='LawFirm-popup-middle-field'>
          <h2 className="LawFirm-section-title">Law Firm Details</h2>
          <div className="LawFirm-form-grid">
            <label><span>Law Firm Name</span><input name="name" value={form.name} onChange={handleChange} /></label>
            <label><span>Registration No</span><input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} /></label>
            <label><span>Establishment Year</span><input name="year" value={form.year} onChange={handleChange} /></label>
            <label><span>Total No. of Lawyer</span><input name="totalLawyers" type="number" value={form.totalLawyers} onChange={handleChange} /></label>
            <label><span>Success Rate</span><input name="successRate" type="number" step="0.01" value={form.successRate} onChange={handleChange} /></label>
            <label><span>Client Rating</span><input name="rating" type="number" step="0.01" value={form.rating} onChange={handleChange} /></label>
          </div>
        </div>

        <div className='LawFirm-popup-middle-field'>
          <h2 className="LawFirm-section-title">Address</h2>
          <label className="LawFirm-textarea-label">
            <span>Address Line</span>
            <textarea className='LawFirm-textarea' name="addressLine" value={form.addressLine} onChange={handleChange} />
          </label>
          <div className="LawFirm-address-grid">
            <label><span>City</span><br/><input name="city" value={form.city} onChange={handleChange} /></label>
            <label><span>State</span><br/><input name="state" value={form.state} onChange={handleChange} /></label>
            <label><span>PinCode</span><br/><input name="pinCode" value={form.pinCode} onChange={handleChange} /></label>
          </div>
        </div>

        <div className='LawFirm-popup-middle-field'>
          <h2 className="LawFirm-section-title">FPR Details:</h2>
          <div className="LawFirm-form-grid">
            <label><span>FPR E-Mail</span><br/><input name="email" value={form.email} onChange={handleChange} /></label>
            <label><span>Phone No</span><br/><input name="phone" value={form.phone} onChange={handleChange} /></label>
          </div>
        </div>

        <div className="LawFirm-button-row">
          <CancelButton onClick={onCancel} className="LawFirm-cancel-button" />
          <SaveButton
            onClick={handleSubmit}
            className="LawFirm-save-button"
            label={selectedLawFirm ? "Update" : "Save"}
          />
        </div>
      </div>
    </div>
  );
};

export default LawFirmPopup;
