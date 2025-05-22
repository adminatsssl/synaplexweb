import React from 'react';
import './AdminAccount.css';

const PasswordPopup = ({ onClose, onChange }) => {
  return (
    <div className="PasswordPopup-Account-overlay">
      <div className="PasswordPopup-Account-container">
        <div className="PasswordPopup-Account-header">
          <h2>Change Password</h2>
          <button className="PasswordPopup-Account-close" onClick={onClose}>X</button>
        </div>
        <div className="PasswordPopup-Account-body">
          <label>New password</label>
          <input type="password" className="PasswordPopup-Account-input" placeholder="Enter new password" />
          <label>Confirm password</label>
          <input type="password" className="PasswordPopup-Account-input" placeholder="Re-enter new password" />
        </div>
        <div className="PasswordPopup-Account-footer">
          <button className="PasswordPopup-Account-change" onClick={onChange}>Change</button>
          <button className="PasswordPopup-Account-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPopup;
