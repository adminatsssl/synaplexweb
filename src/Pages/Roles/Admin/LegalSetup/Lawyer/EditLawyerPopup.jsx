// Keep your imports the same
import React, { useState, useEffect } from "react";
import "./EditLawyerPopup.css";
import CancelButton from "../../../../ReusableComponents/CancelButton";

import SaveButton from "../../../../ReusableComponents/SaveButton";
import AddButton from "../../../../ReusableComponents/AddButton";


const EditLawyerPopup = ({ isOpen, onClose, onSuccess, selectedLawyer }) => {
  const [form, setForm] = useState({
    image: null,
    imagePreview: "/Lawyer.png",
    name: "",
    licenseNo: "",
    qualification: "",
    successRate: 0.00,
    rating: 0.00,
    lawyerType: "Law Firm",
    lawFirm: "",
    lawGroup: "",
    searchTerm: "",
    experience: 0,
    specialization: "",
    court: "",
    primaryMobile: "",
    secondaryMobile: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
    email: "",
    password: "",
    retypePassword: "",
    fees: [{ caseType: "", stageName: "", rate: "" }]
  });

  useEffect(() => {
    if (selectedLawyer) {
      setForm({
        image: null,
        imagePreview: selectedLawyer.ImageUrl || "/Screenshot (27).png",
        name: selectedLawyer.Account?.FullName || "",
        licenseNo: selectedLawyer.LicenseNumber || "",
        qualification: selectedLawyer.Qualification || "",
        successRate: selectedLawyer.SuccessRate || 0.00,
        rating: selectedLawyer.Rating || 0.00,
        lawyerType: selectedLawyer.Type || "Law Firm",
        lawFirm: selectedLawyer.LawFirm || "",
        lawGroup: selectedLawyer.LawGroup || "",
        experience: selectedLawyer.ExperienceYears || 0,
        court: selectedLawyer.Court || "",
        specialization: selectedLawyer.Specialization || "",
        primaryMobile: selectedLawyer.PrimaryNo || "",
        secondaryMobile: selectedLawyer.SecondaryNo || "",
        addressLine: selectedLawyer.Address?.AddressLine || "",
        city: selectedLawyer.Address?.City || "",
        state: selectedLawyer.Address?.State || "",
        pinCode: selectedLawyer.Address?.PinCode || "",
        email: selectedLawyer.Email || "",
        password: "",
        retypePassword: "",
        fees: selectedLawyer.Fees || [{ caseType: "", stageName: "", rate: "" }]
      });
    } else {
      setForm({
        image: null,
        imagePreview: "/Lawyer.png",
        name: "",
        licenseNo: "",
        qualification: "",
        successRate: 0.00,
        rating: 0.00,
        lawyerType: "Law Firm",
        lawFirm: "",
        lawGroup: "",
        searchTerm: "",
        experience: 0,
        specialization: "",
        court: "",
        primaryMobile: "",
        secondaryMobile: "",
        addressLine: "",
        city: "",
        state: "",
        pinCode: "",
        email: "",
        password: "",
        retypePassword: "",
        fees: [{ caseType: "", stageName: "", rate: "" }]
      });
    }
  }, [selectedLawyer]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({
        ...prev,
        image: null,
        imagePreview: "/Lawyer.png"
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFeeChange = (index, field, value) => {
    const updatedFees = [...form.fees];
    updatedFees[index][field] = value;
    setForm(prev => ({ ...prev, fees: updatedFees }));
  };

  const addFeeRow = () => {
    setForm(prev => ({
      ...prev,
      fees: [...prev.fees, { caseType: "", stageName: "", rate: "" }]
    }));
  };

  const removeFeeRow = (index) => {
    if (form.fees.length > 1) {
      const updatedFees = form.fees.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, fees: updatedFees }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSuccess) onSuccess();
  };

  const handleViewFeeRow = (index) => {
    // Implement your view logic here. For example, you could:
    // 1. Open a modal to display the fee details.
    // 2. Expand the table row to show more information.
    console.log(`View details for fee at index ${index}`, form.fees[index]);
    // For now, let's just log the details.
  };

  if (!isOpen) return null;

  return (
    <div className="lawyer-modal">
      <div className="lawyer-content">
        <div className="lawyer-header">
          <h2>Lawyer</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lawyer-body">

            {/* Lawyer Detail Section */}
            <div className="section bordered-section">
              <h2>Lawyer Detail</h2>
              <div className="top-section">
                <div className="image-upload-container">
                  <div className="image-preview-wrapper">
                    <img
                      src={form.imagePreview}
                      alt="Lawyer"
                      className="lawyer-image"
                    />
                    <label className="upload-image-btn">
                      Browse Image
                      <input
                        type="file"
                        className="hidden-file-input"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <div className="basic-info-section">
                  <div className="form-item">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-item">
                      <label>License No.</label>
                      <input
                        type="text"
                        name="licenseNo"
                        value={form.licenseNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-item">
                      <label>Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-item">
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
                    <div className="form-item">
                      <label>Rating</label>
                      <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lawyer's Type Section */}
            <div className="section bordered-section">
              <h2>Lawyer's Type</h2>
              <div className="form-row">
                <div className="form-item">
                  <label>Law Firm</label>
                  <select
                    name="lawFirm"
                    value={form.lawFirm}
                    onChange={handleChange}
                  >
                    <option value="">Select Law Firm</option>
                    <option value="Firm A">Firm A</option>
                    <option value="Firm B">Firm B</option>
                    <option value="Firm C">Firm C</option>
                  </select>
                </div>

                <div className="form-item">
                  <label>Law Group</label>
                  <select
                    name="lawGroup"
                    value={form.lawGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select Law Group</option>
                    <option value="Group X">Group X</option>
                    <option value="Group Y">Group Y</option>
                    <option value="Group Z">Group Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="section bordered-section">
              <h2>Experience</h2>
              <div className="form-item">
                <label>Total No. Of Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-row">
                <div className="form-item">
                  <label>Specialization</label>
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                  >
                    <option value="">Select Specialization</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                    <option value="Labor Law">Labor Law</option>
                    <option value="Tax Law">Tax Law</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Court</label>
                  <input
                    type="text"
                    name="court"
                    value={form.court}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Mobile No. Section */}
            <div className="section bordered-section">
              <h2>Mobile No.</h2>
              <div className="form-item">
                <label>Primary No.</label>
                <input
                  type="tel"
                  name="primaryMobile"
                  value={form.primaryMobile}
                  onChange={handleChange}
                />
              </div>
              <div className="form-item">
                <label>Secondary No.</label>
                <input
                  type="tel"
                  name="secondaryMobile"
                  value={form.secondaryMobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="section bordered-section">
              <h2>Address</h2>
              <div className="form-item">
                <label>Address Line</label>
                <textarea
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-item">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label>PinCode</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={form.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {!selectedLawyer && (
              <div className="section bordered-section">
                <h2>Login Detail</h2>
                <div className="form-item">
                  <label>E-Mail</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item">
                    <label>ReType Password</label>
                    <input
                      type="password"
                      name="retypePassword"
                      value={form.retypePassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fees Section */}
            <div className="section bordered-section">
              <div className="fees-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Fees</h2>
                <AddButton text="ADD" onClick={addFeeRow} />
              </div>

              <table className="fees-table">
                <thead>
                  <tr>
                    <th>Case Type</th>
                    <th>Stage Name</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {form.fees.map((fee, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={fee.caseType}
                          onChange={(e) => handleFeeChange(index, 'caseType', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={fee.stageName}
                          onChange={(e) => handleFeeChange(index, 'stageName', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={fee.rate}
                          onChange={(e) => handleFeeChange(index, 'rate', e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="view-btn" // Changed class name
                          onClick={() => handleViewFeeRow(index)}
                        >
                          <span role="img" aria-label="view">👁️</span> {/* Eye icon */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="lawyer-footer">
            <CancelButton onClick={onClose} className="cancel-btn" />
        <SaveButton
          onClick={handleSubmit} className="save-btn"
          label={ "Save"}
        />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLawyerPopup;