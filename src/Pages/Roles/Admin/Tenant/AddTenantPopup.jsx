import React, { useState, useEffect } from "react";
import axios from "axios";
import documentIcon from "/image.png";
import CancelButton from "../../../ReusableComponents/CancelButton";
import SaveButton from "../../../ReusableComponents/SaveButton";
import "./Tenant.css";

const TenantPopup = ({ isOpen, onClose, onSuccess, selectedTenant }) => {
  const [form, setForm] = useState({
    name: "",
    gstin: "",
    panNo: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
    image: null,
    imagePreview: null,
    fprName: "",
    fprEmail: "",
    fprMobile: "",
  });

  useEffect(() => {
    if (selectedTenant) {
      setForm({
        name: selectedTenant.name || "",
        gstin: selectedTenant.gstin || "",
        panNo: selectedTenant.panNo || "",
        addressLine: selectedTenant.address?.addressLine || "",
        city: selectedTenant.address?.city || "",
        state: selectedTenant.address?.state || "",
        pinCode: selectedTenant.address?.pincode || "",
        image: null,
        imagePreview: selectedTenant.profilePic || null,
        fprName: selectedTenant.fprName || "",
        fprEmail: selectedTenant.email || "",
        fprMobile: selectedTenant.phone || "",
      });
    } else {
      // Reset the form
      setForm({
        name: "",
        gstin: "",
        panNo: "",
        addressLine: "",
        city: "",
        state: "",
        pinCode: "",
        image: null,
        imagePreview: null,
        fprName: "",
        fprEmail: "",
        fprMobile: "",
      });
    }
  }, [selectedTenant]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.addressLine || !form.city || !form.state || !form.pinCode) {
        alert("Please fill in all required fields.");
        return;
      }

      const payload = {
        id: form.id,
        name: form.name,
        gstin: form.gstin,
        panNo: form.panNo,
        fprName: form.fprName,
        email: form.fprEmail,
        phone: form.fprMobile,
        address: {
          addressLine: form.addressLine,
          city: form.city,
          state: form.state,
          pincode: form.pinCode,
        },
        profilePic: form.imagePreview || null, // base64 image
      };

      if (selectedTenant?.id) {
        await axios.put(`/api/api/tenants/${selectedTenant.id}`, payload);
      } else {
        await axios.post(`/api/api/tenants`, payload);
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving tenant:", err.response?.data || err.message);
      alert("Failed to save tenant. See console for details.");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="tenant-modal">
      <div className="tenant-modal-content">
        <div className="tenant-modal-header">
          <h2>Tenant</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="tenant-modal-body">

            {/* Tenant Section */}
            <div className="form-section">
              <h3>Tenant Details:</h3>

              <div className="tenant-header">
                <div className="tenant-image-wrapper">
                  <img
                    src={form.imagePreview || documentIcon}
                    alt="Tenant"
                    className="tenant-image"
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

                <div className="tenant-fields">
                  <div className="form-item">
                    <label>Tenant Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label>PAN No.</label>
                    <input
                      type="text"
                      name="panNo"
                      value={form.panNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item">
                    <label>GSTIN</label>
                    <input
                      type="text"
                      name="gstin"
                      value={form.gstin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="form-section">
              <h3>Address</h3>
              <div className="form-item">
                <label>Address Line</label>
                <textarea
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
              <div className="form-grid">
                <div className="form-item">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label>PinCode</label>
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

            {/* FPR Section */}
            <div className="form-section">
              <h3>FPR Details</h3>
              <div className="form-grid">
                <div className="form-item">
                  <label>FPR Name</label>
                  <input
                    type="text"
                    name="fprName"
                    value={form.fprName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label>FPR E-Mail</label>
                  <input
                    type="email"
                    name="fprEmail"
                    value={form.fprEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label>Phone No</label>
                  <input
                    type="tel"
                    name="fprMobile"
                    value={form.fprMobile}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

          </div>
          <div className="tenant-modal-footer">
            <CancelButton onClick={onClose} className="cancel-btn" />
            <SaveButton
              onClick={handleSubmit}
              className="save-btn"
              label={selectedTenant ? "Update" : "Save"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantPopup;
