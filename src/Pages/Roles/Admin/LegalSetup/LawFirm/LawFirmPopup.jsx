import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        name: selectedLawFirm.Name || '',
        registrationNumber: selectedLawFirm.RegistrationNumber || '',
        year: selectedLawFirm.EstablishmentYear || '',
        totalLawyers: selectedLawFirm.TotalLawyers?.toString() || '0',
        successRate: selectedLawFirm.SuccessRate?.toString() || '0.00',
        rating: selectedLawFirm.ClientRating?.toString() || '0.00',
        addressLine: selectedLawFirm.Address_LawFirm?.AddressLine || '',
        city: selectedLawFirm.Address_LawFirm?.City || '',
        state: selectedLawFirm.Address_LawFirm?.State || '',
        pinCode: selectedLawFirm.Address_LawFirm?.PinCode || '',
        email: selectedLawFirm.Email || '',
        phone: selectedLawFirm.PhoneNumber || ''
      });
    }
  }, [selectedLawFirm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
        alert("Please complete all required fields, including address.");
        return;
      }

      let addressId = null;

      // Try to update existing address
      if (selectedLawFirm?.Address_LawFirm?.ID) {
        try {
          await axios.get(`/odata/Addresses(${selectedLawFirm.Address_LawFirm.ID})`);
          addressId = selectedLawFirm.Address_LawFirm.ID;

          await axios.patch(`/odata/Addresses(${addressId})`, {
            AddressLine: form.addressLine,
            City: form.city,
            State: form.state,
            PinCode: form.pinCode
          });
        } catch {
          console.warn("Address not found or update failed. A new one will be created.");
        }
      }

      // If no valid address ID, create a new address
      if (!addressId) {
        const addressRes = await axios.post("/odata/Addresses", {
          AddressLine: form.addressLine,
          City: form.city,
          State: form.state,
          PinCode: form.pinCode
        });

        addressId = addressRes.data?.ID;

        if (!addressId) {
          throw new Error("Address creation failed — no ID returned.");
        }

        console.log("New address created with ID:", addressId);
      }

      // Prepare LawFirm payload
      const payload = {
        Name: form.name,
        Email: form.email,
        PhoneNumber: form.phone,
        RegistrationNumber: form.registrationNumber,
        EstablishmentYear: form.year,
        TotalLawyers: parseInt(form.totalLawyers) || 0,
        SuccessRate: parseFloat(form.successRate) || 0.0,
        ClientRating: parseFloat(form.rating) || 0.0,
        "Address_LawFirm@odata.bind": `Addresses(${addressId})`
      };

      console.log("Submitting LawFirm payload:", payload);

      if (selectedLawFirm?.ID) {
        await axios.patch(`/odata/LawFirms(${selectedLawFirm.ID})`, payload);
      } else {
        await axios.post("/odata/LawFirms", payload);
      }

      alert(`Law Firm ${selectedLawFirm ? "updated" : "submitted"} successfully!`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit. See console for more info.");
    }
  };

  return (
    <div className="popup-container">
      <h2 className="section-title">{selectedLawFirm ? "Edit Law Firm" : "Law Firm Detail"} :</h2>
      <div className="form-grid">
        <label><span>Law Firm Name</span><input name="name" value={form.name} onChange={handleChange} /></label>
        <label><span>Registration No</span><input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} /></label>
        <label><span>Establishment Year</span><input name="year" value={form.year} onChange={handleChange} /></label>
        <label><span>Total No. of Lawyer</span><input name="totalLawyers" type="number" value={form.totalLawyers} onChange={handleChange} /></label>
        <label><span>Success Rate</span><input name="successRate" type="number" step="0.01" value={form.successRate} onChange={handleChange} /></label>
        <label><span>Client Rating</span><input name="rating" type="number" step="0.01" value={form.rating} onChange={handleChange} /></label>
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
          {selectedLawFirm ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default LawFirmPopup;
