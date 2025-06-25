import React from "react";
import "./GDNButtonCB.css";

export default function GDNEmailCB({ open, onClose }) {
  if (!open) return null;

  // Mock data (replace with props or state as needed)
  const templateName = "Demand Notice Sarfaesi";
  const sendDate = "5/27/2025";
  const noticeTemplate = `Dear [Recipient Name],\n\nyour cheque (No. [Cheque Number]) of ₹[Amount] issued to [Client Name] has bounced due to [Reason]. Please settle the amount within 15 days to avoid legal action.\n\n[Lawyer Name]`;

  return (
    <div className="GDNEmail-modal-overlay">
      <div className="GDNEmail-modal">
        <div className="GDNEmail-modal-header">
          <span>Notice</span>
          <button className="GDNEmail-close-button" onClick={onClose} title="Close">×</button>
        </div>
        <div className="GDNEmail-modal-content">
          <div className="GDNEmail-modal-row">
            <span className="GDNEmail-label">Template Name :</span>
            <span className="GDNEmail-value">{templateName}</span>
            <span className="GDNEmail-label">Send Date :</span>
            <span className="GDNEmail-value">{sendDate}</span>
          </div>
          <hr className="GDNEmail-divider" />
          <div className="GDNEmail-notice-label">Notice Template :</div>
          <div className="GDNEmail-notice-text content-disable">{noticeTemplate}</div>
        </div>
      </div>
    </div>
  );
}
