import React from "react";
import "./LawyerGDNButtonCB.css";

export default function LawyerGDNWhatsappCB({ open, onClose }) {
  if (!open) return null;

  const templateName = "Demand Notice Sarfaesi";
  const sendDate = "5/27/2025";
  const noticeTemplate = `
 Legal Notice - Cheque Dishonour

Dear [Recipient Name],

This is to notify you that cheque number [Cheque Number], dated [Cheque Date], issued by you in favor of [Client Name], for ₹[Amount], has been dishonored due to [Reason Stated by the Bank].
As per the provisions of Section 138 of the Negotiable Instruments Act, 1881, you are required to clear the dues within 15 days from this notice. If the amount is not paid within the stipulated time, we will be compelled to take legal action.

For payment details or any clarification, kindly contact us at [Lawyer Contact].

Best Regards,  
[Lawyer Name]  
`;

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
