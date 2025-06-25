import React from "react";
import "./GDNButton.css";

export default function GDNWhatsapp({ open, onClose }) {
  if (!open) return null;

  const templateName = "Demand Notice Sarfaesi";
  const sendDate = "5/27/2025";
  const noticeTemplate = `
 DEMAND NOTICE

Dear [Recipient Name],

This is a final reminder for your overdue payment of Rs. [Amount] under Loan Agreement [XXXXXX]. Kindly clear the dues within 60 days to avoid legal consequences.

Payment Details:  
 Due Amount: Rs. [Amount]  
 Due Date: [Date]

For assistance, contact:  [Lawyer Contact]

[Lawyer Name]`;

  return (
    <div className="GDNWhatsapp-overlay">
      <div className="GDNWhatsapp-modal">
        <div className="GDNWhatsapp-header">
          <span>Notice</span>
          <button className="GDNWhatsapp-close" onClick={onClose} title="Close">×</button>
        </div>
        <div className="GDNWhatsapp-content">
          <div className="GDNWhatsapp-meta">
            <span className="GDNWhatsapp-label">Template Name :</span>
            <span className="GDNWhatsapp-value">{templateName}</span>
            <span className="GDNWhatsapp-label">Send Date :</span>
            <span className="GDNWhatsapp-value">{sendDate}</span>
          </div>
          <hr className="GDNWhatsapp-divider" />
          <div className="GDNWhatsapp-section-label">Notice Template :</div>
          <pre className="GDNWhatsapp-template content-disable">{noticeTemplate}</pre>
        </div>
      </div>
    </div>
  );
}
