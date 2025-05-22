import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAccount.css";
import PasswordPopup from "./PasswordPopUp.jsx";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const AdminAccountPopup = ({ onClose, onSave, userData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
        role: userData.role || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, username, email, password, confirmPassword, role } = formData;

    if (!fullName || !username || !email || !role) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!userData && (!password || !confirmPassword)) {
      alert("Please enter and confirm password.");
      return false;
    }

    if (!userData && password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      ...(userData ? {} : { password: formData.password }), // only include password on create
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post("/api/auth/signup", payload);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      const message =
        error.response?.data?.message || "Failed to save user. Please try again.";
      alert(message);
    }
  };

  const handleChangePassword = () => {
    setIsPopupOpen(true);
  };

  const handlePasswordChange = () => {
    alert("Implement change password logic here");
    setIsPopupOpen(false);
  };

  return (
    <div className="AdminAccount-Overlay">
      <div className="AdminAccount-Modal">
        <div className="AdminAccount-Header">
          <h2>{userData ? "Edit Account" : "New Account"}</h2>
          <button className="AdminAccount-CloseButton" onClick={onClose}>
            X
          </button>
        </div>

        <div className="AdminAccount-Form">
          <div className="AdminAccount-FormRow">
            <label>Full name</label>
            <input
              type="text"
              name="fullName"
              className="AdminAccount-Input"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="AdminAccount-FormRow">
            <label>User name</label>
            <input
              type="text"
              name="username"
              className="AdminAccount-Input"
              value={formData.username}
              onChange={handleChange}
              disabled={!!userData}
            />
          </div>

          <div className="AdminAccount-FormRow">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="AdminAccount-Input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="AdminAccount-FormRow">
            <label>User role(s)</label>
            <select
              className="AdminAccount-Input"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="ADMIN">Administrator</option>
              <option value="LEGAL">Legal</option>
              <option value="USER">User</option>
            </select>
          </div>

          {userData ? (
            <div className="AdminAccount-FormRow">
              <button
                className="AdminAccount-ChangePasswordButton"
                onClick={handleChangePassword}
              >
                Change password
              </button>
            </div>
          ) : (
            <>
              <div className="AdminAccount-FormRow">
                <label>New password</label>
                <input
                  type="password"
                  name="password"
                  className="AdminAccount-Input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="AdminAccount-FormRow">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="AdminAccount-Input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        <div className="AdminAccount-ButtonGroup">
          <CancelButton onClick={onClose} />
          <SaveButton onClick={handleSubmit} label="Save" />
        </div>

        {isPopupOpen && (
          <PasswordPopup
            onClose={() => setIsPopupOpen(false)}
            onChange={handlePasswordChange}
          />
        )}
      </div>
    </div>
  );
};

export default AdminAccountPopup;
