import React, { useState } from 'react';
import './LawyerInvoiceManagement.css';
import SaveButton from "../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../ReusableComponents/CancelButton.jsx";

const LawyerGenerateInvoice = ({ onClose }) => {
  const [lawyer, setLawyer] = useState('');
  const [date, setDate] = useState('');

  const handleGenerate = () => {
    console.log('Lawyer:', lawyer);
    console.log('Date:', date);
    onClose(); 
  };

  return (
    <div className="userinvoice-modal-overlay">
      <div className="userinvoice-modal-container">
        <div className="userinvoice-modal-header">
          <strong>Generate Invoice</strong>
          <button className="userinvoice-close-button" onClick={onClose}>×</button>
        </div>

        <div className="userinvoice-modal-body">
          <label>Lawyer</label>
          <select className="userinvoice-modal-select" value={lawyer} onChange={(e) => setLawyer(e.target.value)}>
            <option value="">Select a lawyer</option>
            <option value="Rajesh">Rajesh</option>
            <option value="Anita">Anita</option>
          </select>

          <label>Date</label>
          <div className="userinvoice-date-wrapper">
            <input
              type="date"
              className="userinvoice-modal-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <hr />

        <div className="userinvoice-modal-footer">
        <CancelButton onClick={onClose} className="userinvoice-cancel-button" />
        <SaveButton
          onClick={handleGenerate} className="userinvoice-generate-button"
          label={"Generate"}
        />

        </div>
      </div>
    </div>
  );
};

export default LawyerGenerateInvoice;
