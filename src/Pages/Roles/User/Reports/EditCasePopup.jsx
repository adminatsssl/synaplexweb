import React, { useState, useEffect } from "react";
import "./EditCasePopup.css"; // Ensure this file exists
import { FaSearch } from "react-icons/fa";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";


const EditCasePopup = ({ isOpen, onClose, caseData, onSave }) => {
  const [formData, setFormData] = useState(caseData);

  useEffect(() => {
    setFormData(caseData); // Update form data when modal opens with new caseData
  }, [caseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="reporteditcase-modal-overlay">
      <div className="reporteditcase-modal-container">
        <div className="reporteditcase-modal-header">
          <h3 className="reporteditcase-Heading">Case Edit</h3>
          <button className="reporteditcase-close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="reporteditcase-form-section">
            <h3>Loan and Borrower Detail:</h3>
            <div className="reporteditcase-form-group">
              <label>Loan id</label>
              <div className="reporteditcase-form-loanBorrowerGroup">
                <div className="reporteditcase-search-container">
                  <input
                    type="text"
                    name="loanNumber"
                    value={formData.loanNumber}
                    onChange={handleChange}
                    placeholder="Search Loan By Loan Number"
                  />
                  <button
                    type="button"
                    className="reporteditcase-search-button"
                  >
                    <FaSearch />
                  </button>
                </div>
                <div className="reporteditcase-form-autoassign">
                  <p>AutoAssign</p>
                  <input type="checkbox" />
                </div>
              </div>
            </div>

            {/*  second part*/}
            <div className="reporteditcase-secondLB">
              <div>
                <label>Borrower</label>
                <input
                  type="text"
                  name="borrower"
                  value={formData.borrower}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Loan Type</label>
                <input
                  type="text"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label>Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>

            <div className="reporteditcase-secondLB-date">
              <div>
                <label>Default Date</label>
                <input
                  type="date"
                  name="defaultDate"
                  value={formData.defaultDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>NPA Date</label>
                <input
                  type="date"
                  name="npaDate"
                  value={formData.npaDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="reporteditcase-form-divider"></div>

          <div className="reporteditcase-form-section">
            <h3>Court & Case Detail:</h3>
            <div className="reporteditcase-form-group">
              <div className="reporteditcase-CourtCase">
                <div className="reporteditcase-CourtCase-Crn">
                  <label>CRN No.</label>
                  <input
                    type="text"
                    name="crnNo"
                    value={formData.crnNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="reporteditcase-CourtCase-Status">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/*  second part*/}
            <div className="reporteditcase-secondCC">
              {/* Row 1 - 3 items */}
              <div className="form-row">
                <div className="reporteditcase-secondCC-1row">
                  <label>Court Type</label>
                  <select
                    name="courtType"
                    value={formData.courtType}
                    onChange={handleChange}
                  >
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="reporteditcase-secondCC-1row">
                  <label>Hearing Date</label>
                  <input
                    type="date"
                    name="hearingDate"
                    value={formData.hearingDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="reporteditcase-secondCC-1row">
                  <label>FI1 No</label>
                  <input
                    type="number"
                    name="fi1No"
                    value={formData.fi1No}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2 - 3 items */}
              <div className="form-row">
                <div className="reporteditcase-secondCC-2row">
                  <label>FI1 Year</label>
                  <input
                    type="number"
                    name="fi1Year"
                    value={formData.fi1Year}
                    onChange={handleChange}
                  />
                </div>
                <div className="reporteditcase-secondCC-2row">
                  <label>Reg No</label>
                  <input
                    type="number"
                    name="regNo"
                    value={formData.regNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="reporteditcase-secondCC-2row">
                  <label>Reg Year</label>
                  <input
                    type="number"
                    name="regYear"
                    value={formData.regYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3 - 2 items */}
              <div className="form-3row">
                <div className="reporteditcase-secondCC-3row">
                  <label>Case Type</label>
                  <select
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                  >
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Cheque Bounce">Cheque Bounce</option>
                  </select>
                </div>
                <div className="reporteditcase-secondCC-3row">
                  <label>Date of Filing</label>
                  <input
                    type="date"
                    name="dateOfFiling"
                    value={formData.dateOfFiling}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="reporteditcase-form-actions">

          <CancelButton onClick={onClose} className="reporteditcase-cancel-button" />
        <SaveButton
          onClick={handleSubmit} className="reporteditcase-save-button"
          label={"Save"}
        />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCasePopup;
