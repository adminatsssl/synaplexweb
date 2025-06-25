import React from "react";
import "./GDNButtonCB.css";

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
            your cheque (No. [Cheque Number]) of ₹[Amount] issued to [Client Name] has bounced due to [Reason]. Please settle the amount within 15 days to avoid legal action.
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
