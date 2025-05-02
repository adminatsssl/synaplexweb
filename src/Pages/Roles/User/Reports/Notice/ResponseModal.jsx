import React from "react";
import "./ResponseModal.css";

const ResponseModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="noticeresponse-modal-overlay">
      <div className="noticeresponse-modal-box">
        <div className="noticeresponse-modal-header">
          <h3>Response</h3>
          <button className="noticeresponse-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="noticeresponse-modal-body">
          <label>Name</label>
          <input type="text" />
          <label>Phone</label>
          <input type="text" />
          <label>Email</label>
          <input type="email" />
          <label>Response</label>
          <div className="noticeresponse-radio-group">
            <label><input type="radio" name="response" /> Acknowledged</label>
            <label><input type="radio" name="response" /> Rejected</label>
            <label><input type="radio" name="response" /> Accepted</label>
          </div>
          <label>Comments</label>
          <textarea rows="4"></textarea>
        </div>
        <div className="noticeresponse-modal-footer">
          <button className="noticeresponse-send-btn">Send</button>
          <button className="noticeresponse-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
