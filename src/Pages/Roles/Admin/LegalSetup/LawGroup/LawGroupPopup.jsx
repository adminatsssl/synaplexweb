import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LawGroupPopup.css';
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton.jsx";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

const LawGroupPopup = ({ onSuccess, onCancel, selectedLawGroup }) => {
  const [form, setForm] = useState({
    name: '',
    registrationNumber: '',
    year: '',
    totalMember: '',
    ongoingCases: '',
    successRate: '',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchLawGroup = async (id) => {
      try {
        const response = await axios.get(`/api/api/lawgroups/${id}`, {
          headers: getAuthHeaders()
        });

        const data = response.data.data || response.data; // handles both wrapped and unwrapped responses

        setForm({
          name: data.name || '',
          registrationNumber: data.registrationNumber || '',
          year: data.establishmentYear || '',
          totalMember: data.totalLawyer?.toString() || '',
          ongoingCases: data.ongoingCases !== null ? data.ongoingCases.toString() : '',
          successRate: data.successRate !== null ? data.successRate.toString() : '',
          addressLine: data.address?.addressLine || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          pinCode: data.address?.pincode || '',
          email: data.email || '',
          phone: data.phone || ''
        });
      } catch (error) {
        console.error("Failed to fetch law group:", error.response?.data || error.message);
      }
    };

    if (selectedLawGroup?.id || selectedLawGroup?.ID) {
      const id = selectedLawGroup.id || selectedLawGroup.ID;
      fetchLawGroup(id);
    }
  }, [selectedLawGroup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      registrationNumber: form.registrationNumber,
      establishmentYear: form.year,
      totalLawyer: Number(form.totalMember),
      ongoingCases: form.ongoingCases ? Number(form.ongoingCases) : null,
      successRate: form.successRate ? parseFloat(form.successRate) : null,
      email: form.email,
      phone: form.phone,
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
        await axios.put(`/api/api/lawgroups/${id}`, payload, {
          headers: getAuthHeaders()
        });
      } else {
        await axios.post(`/api/api/lawgroups`, payload, {
          headers: getAuthHeaders()
        });
      }
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit. Check console for details.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'LawGroup-modal-overlay') {
      onCancel();
    }
  };

  return (
    <div className="LawGroup-modal-overlay" onClick={handleOverlayClick}>
      <div className="law-group-modal" onClick={e => e.stopPropagation()}>
        <div className="law-group-header">
          <h2>{selectedLawGroup?.id ? 'Edit Law Group' : 'Add Law Group'}</h2>
          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-row">
              <div className="form-field">
                <label>Law Group Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row two-columns">
              <div className="form-field">
                <label>Registration No.</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Establishment Year</label>
                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row three-columns">
              <div className="form-field">
                <label>Total No. Of Lawyers</label>
                <input
                  type="number"
                  name="totalMember"
                  value={form.totalMember}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-field">
                <label>Success Rate (%)</label>
                <input
                  type="number"
                  name="successRate"
                  value={form.successRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div className="form-field">
                <label>Ongoing Cases</label>
                <input
                  type="number"
                  name="ongoingCases"
                  value={form.ongoingCases}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address</h3>
            <div className="form-row">
              <div className="form-field full-width">
                <label>Address Line</label>
                <textarea
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="form-row three-columns">
              <div className="form-field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>FPR Details:</h3>
            <div className="form-row three-columns">
              <div className="form-field">
                <label>FPR Name</label>
                <input type="text" name="fprName" value={''} disabled />
              </div>
              <div className="form-field">
                <label>FPR E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <CancelButton onClick={onCancel} />
            <SaveButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawGroupPopup;
