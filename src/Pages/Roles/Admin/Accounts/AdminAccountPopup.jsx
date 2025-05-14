import React, { useState, useEffect } from "react";
import "./AdminAccount.css";
import PasswordPopup from "./PasswordPopUp.jsx";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const AdminAccountPopup = ({ onClose, onSave, userData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    login: "",
    role: "",
    active: true,
    isWebServiceUser: false,
    isLocal: true,
    language: "",
    timeZone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!userData && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userToSave = { ...formData };
    delete userToSave.password;
    delete userToSave.confirmPassword;

    onSave(userToSave);
    onClose();
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
          <button className="AdminAccount-CloseButton" onClick={onClose}>×</button>
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
              name="login"
              className="AdminAccount-Input"
              value={formData.login}
              onChange={handleChange}
              disabled={!!userData}
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
              <option value="Administrator">Administrator</option>
              <option value="Anonymous">Anonymous</option>
              <option value="Legal">Legal</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="AdminAccount-CheckboxLabel">
            <label>Active</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </div>

          <div className="AdminAccount-CheckboxLabel">
            <label>Web service user</label>
            <input
              type="checkbox"
              name="isWebServiceUser"
              checked={formData.isWebServiceUser}
              onChange={handleChange}
            />
          </div>

          <div className="AdminAccount-FormRow">
            <label>Language</label>
            <select
              className="AdminAccount-Input"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="">Select language</option>
              <option value="en-US">English (United States)</option>
            </select>
          </div>

          <div className="AdminAccount-FormRow">
            <label>Time zone</label>
            <select
              className="AdminAccount-Input"
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
            >
              <option value="">Select time zone</option>
              <option value="UTC-5">UTC-5 (Eastern Time)</option>
              <option value="UTC+1">UTC+1 (CET)</option>
              <option value="UTC+8">UTC+8 (China Standard Time)</option>
              <option value="UTC+10">UTC+10 (AEST)</option>
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
            <SaveButton
              onClick={handleSubmit}
              label={"Save"}
            />
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
