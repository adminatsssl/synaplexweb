import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditLawyerPopup.css";
import CancelButton from "../../../../ReusableComponents/CancelButton";
import SaveButton from "../../../../ReusableComponents/SaveButton";
import AddButton from "../../../../ReusableComponents/AddButton";

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const EditLawyerPopup = ({ isOpen, onClose, onSave, lawyer }) => {
  const [form, setForm] = useState({
    image: null,
    imagePreview: "",
    name: "",
    licenseNo: "",
    qualification: "",
    successRate: 0.0,
    rating: 0.0,
    lawyerType: "Law Firm",
    lawFirm: "",
    lawGroup: "",
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
    fees: [{ caseType: "", stageName: "", rate: "" }],
  });

  useEffect(() => {
    if (lawyer){
      const cleanSuccessRate = parseFloat(
        (lawyer.successRate || "").replace("%", "").trim()
      );
      const cleanRating = parseFloat(
        (lawyer.rating || "").replace("%", "").trim()
      );

      if (lawyer) {
        setForm({
          image: null,
          imagePreview: lawyer.profilePic || "/Lawyer.png",
          name: lawyer.name || "",
          licenseNo: lawyer.licenseNo || "",
          qualification: lawyer.qualification || "",
          successRate: isNaN(cleanSuccessRate) ? 0 : cleanSuccessRate,
          rating: isNaN(cleanRating) ? 0 : cleanRating,       // <- FIX HERE
          lawyerType: "Law Firm", // or derive from data if you have
          lawFirm: "", // no info in example data, keep empty or set if available
          lawGroup: "", // same as above
          experience: lawyer.totalExperience || 0,
          specialization: lawyer.specialization || "",
          court: lawyer.courts && lawyer.courts.length > 0 ? lawyer.courts[0] : "",
          primaryMobile: lawyer.primaryNo || "",
          secondaryMobile: lawyer.secondaryNo || "",
          addressLine: lawyer.address?.addressLine || "",
          city: lawyer.address?.city || "",
          state: lawyer.address?.state || "",
          pinCode: lawyer.address?.pincode || "",
          email: lawyer.email || "",
          password: "",
          retypePassword: "",
          fees: [{ caseType: "", stageName: "", rate: "" }], // no fees info in example data
        });
      }
      } else {
        // reset form on no lawyer
        setForm((prev) => ({
          ...prev,
          image: null,
          imagePreview: "/Lawyer.png",
          name: "",
          licenseNo: "",
          qualification: "",
          successRate: 0.0,
          rating: 0.0,
          lawyerType: "Law Firm",
          lawFirm: "",
          lawGroup: "",
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
          fees: [{ caseType: "", stageName: "", rate: "" }],
        }));
      }
    },[lawyer?.id]); 


  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanValue =
      name === "successRate" || name === "rating"
        ? value.replace("%", "")
        : value;

    setForm((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  // console.log("Selected file:", file);
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // console.log("FileReader result:", reader.result);
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate required fields here if needed

  const isAddressValid = form.city && form.state && form.pinCode;

  const dataToSubmit = {
  name: form.name,
  licenseNo: form.licenseNo || null,
  qualification: form.qualification || null,
  successRate: form.successRate !== "" ? `${parseFloat(form.successRate)}` : null,
  rating: form.rating !== "" ? `${parseFloat(form.rating)}` : null,
  email: form.email,
  primaryNo: form.primaryMobile,
  secondaryNo: form.secondaryMobile || null,
  specialization: form.specialization,
  totalExperience: form.experience,
  courts: form.court ? [form.court] : [],
  lawFirms: form.lawFirm ? [form.lawFirm] : [],
  lawGroups: form.lawGroup ? [form.lawGroup] : [],
  address: isAddressValid
    ? {
        city: form.city,
        state: form.state,
        pincode: form.pinCode,
        addressLine: form.addressLine || null,
      }
    : null,
  profilePic: form.imagePreview || null,
};

  try {
    const response = await axios.put(`api/api/lawyers/${lawyer?.id}`, dataToSubmit, {
      headers: getAuthHeaders()
    });
    console.log("Update successful:", response.data);
    if (onSave) onSave(response.data);
    if (onClose) onClose();
  } catch (error) {
    console.error("Error updating lawyer:", error.response ? error.response.data : error.message);
    alert("Failed to update lawyer. Please try again.");
  }
};



  if (!isOpen) return null;

  return (
    <div className="lawyer-modal">
      <div className="lawyer-content">
        <div className="lawyer-header">
          <h2>Lawyer</h2>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
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
                    <option value="Civil Law">Civil Law</option>
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

            {/* Email and Password Section */}
            {!lawyer && (
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
              <div
                className="fees-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Fees</h2>
                <AddButton
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      fees: [...prev.fees, { caseType: "", stageName: "", rate: "" }],
                    }))
                  }
                />
              </div>

              {form.fees.map((fee, idx) => (
                <div
                  className="fees-form-row"
                  key={idx}
                  style={{ marginBottom: "10px" }}
                >
                  <input
                    type="text"
                    placeholder="Case Type"
                    value={fee.caseType}
                    onChange={(e) => {
                      const newFees = [...form.fees];
                      newFees[idx].caseType = e.target.value;
                      setForm((prev) => ({ ...prev, fees: newFees }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Stage Name"
                    value={fee.stageName}
                    onChange={(e) => {
                      const newFees = [...form.fees];
                      newFees[idx].stageName = e.target.value;
                      setForm((prev) => ({ ...prev, fees: newFees }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Rate"
                    value={fee.rate}
                    onChange={(e) => {
                      const newFees = [...form.fees];
                      newFees[idx].rate = e.target.value;
                      setForm((prev) => ({ ...prev, fees: newFees }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lawyer-footer">
            <CancelButton onClick={onClose} />
            <SaveButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLawyerPopup;
