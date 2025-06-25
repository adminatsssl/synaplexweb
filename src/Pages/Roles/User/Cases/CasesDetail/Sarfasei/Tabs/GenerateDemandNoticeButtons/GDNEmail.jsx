import React from "react";
import "./GDNButton.css";

export default function GDNEmail({ open, onClose }) {
  if (!open) return null;

  // Mock data (replace with props or state as needed)
  const templateName = "Demand Notice Sarfaesi";
  const sendDate = "5/27/2025";
  const noticeTemplate = `Dear [Recipient Name],\n\nFinal Reminder: Your overdue amount of Rs. [Amount] under Loan No. [XXXXXX] is still unpaid. Kindly pay within 60 days to avoid legal action. Contact [Lawyer Contact] for queries.\n\n[Lawyer Name]`;

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
