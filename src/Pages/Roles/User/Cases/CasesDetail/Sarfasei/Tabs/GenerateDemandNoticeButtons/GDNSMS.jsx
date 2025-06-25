import React from "react";
import "./GDNButton.css";

const GDNSMS = ({ onClose }) => {
  return (
    <div className="GDNSMS-overlay">
      <div className="GDNSMS-modal">
        <div className="GDNSMS-header">
          <h2>Notice</h2>
          <button className="GDNSMS-close" onClick={onClose}>✕</button>
        </div>

        <div className="GDNSMS-section">
          <span className="GDNEmail-label">Template Name :</span>
            <span className="GDNEmail-value">Demand Notice Generation</span>
            <span className="GDNEmail-label">Send Date :</span>
            <span className="GDNEmail-value">5/27/2025</span>
        </div>

        <hr />

        <div className="GDNSMS-section">
          <div>
            <strong>Notice Template :</strong>
          
          </div>
          <div >
            <p>Dear [Recipient Name],</p>
            <div className="content-disable">
              <p>
            Final Reminder: Your overdue amount of Rs. [Amount] under Loan No. [XXXXXX] is still unpaid.
            Kindly pay within 60 days to avoid legal action. Contact [Lawyer Contact] for queries.
          </p>

            </div>
          
          <p>[Lawyer Name]</p>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GDNSMS;
