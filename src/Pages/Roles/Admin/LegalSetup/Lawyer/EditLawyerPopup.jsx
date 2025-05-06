import React, { useEffect, useState } from 'react';
import './EditLawyerPopup.css';
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

function EditLawyerPopup({ isOpen, lawyer, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (lawyer) {
      setFormData({
        ID: lawyer.ID,
        FullName: lawyer.FullName || '',
        LicenseNumber: lawyer.LicenseNumber || '',
        Qualification: lawyer.Qualification || '',
        SuccessRate: lawyer.SuccessRate || '',
        Rating: lawyer.Rating || '',
        ExperienceYears: lawyer.ExperienceYears || '',
        PrimaryNo: lawyer.PrimaryNo || '',
        SecondaryNo: lawyer.SecondaryNo || '',
        Email: lawyer.Email || '',
        Address: lawyer.Address || '',
      });
    }
  }, [lawyer]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(`/odata/v1/Lawyers(${formData.ID})`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(() => {
      onSave();
      onClose();
    });
  };

  return (
    <div className="edit-lawyer-overlay">
      <div className="edit-lawyer-container">
        <h2>Lawyer Details</h2>
        <div className="edit-lawyer-grid">
          <label>Full Name</label>
          <input name="FullName" value={formData.FullName} onChange={handleChange} />

          <label>License No</label>
          <input name="LicenseNumber" value={formData.LicenseNumber} onChange={handleChange} />

          <label>Qualification</label>
          <input name="Qualification" value={formData.Qualification} onChange={handleChange} />

          <label>Success Rate</label>
          <input name="SuccessRate" value={formData.SuccessRate} onChange={handleChange} />

          <label>Rating</label>
          <input name="Rating" value={formData.Rating} onChange={handleChange} />

          <label>Experience (Years)</label>
          <input name="ExperienceYears" value={formData.ExperienceYears} onChange={handleChange} />

          <label>Primary No</label>
          <input name="PrimaryNo" value={formData.PrimaryNo} onChange={handleChange} />

          <label>Secondary No</label>
          <input name="SecondaryNo" value={formData.SecondaryNo} onChange={handleChange} />

          <label>Email</label>
          <input name="Email" value={formData.Email} onChange={handleChange} />

          <label>Address</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} />
        </div>
        <div className="edit-lawyer-buttons">
          
          <CancelButton onClick={onClose} className="cancel-btn" />
        <SaveButton
          onClick={handleSubmit} className="save-btn"
          label={ "Save"}
        />

        </div>
      </div>
    </div>
  );
}

export default EditLawyerPopup;
