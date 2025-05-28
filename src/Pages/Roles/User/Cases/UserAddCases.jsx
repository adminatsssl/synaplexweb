import React, { useState } from "react";
import axios from "axios";
import "./UserCases.css";
import { FaSearch } from "react-icons/fa";
import SaveButton from "../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../ReusableComponents/CancelButton.jsx";

const caseTypes = [
  "ARBITRATION",
  "SARFAESI",
  "CHEQUE_BOUNCE",
  "DRT",
  "CIVIL",
  "IBC_NCLT",
  "CRIMINAL"
];

const AddUserCases = ({ initialData = null, onClose }) => {
  console.log('Initial Data received:', initialData); // Debug log

  const [formData, setFormData] = useState({
    loanId: initialData?.loanId || "",
    loanNumber: initialData?.loanNumber || "",
    borrower: initialData?.borrower || "",
    loanType: initialData?.loanType || "",
    loanAmount: initialData?.loanAmount || 0,
    defaultDate: initialData?.defaultDate || "",
    npaDate: initialData?.npaDate || "",
    workflowType: "",
    courtType: "",
    hearingDate: "",
    autoAssign: false,
    crnNo: "",
    status: "Initiated",
    fiNo: "",
    fiYear: "",
    regNo: "",
    regYear: "",
    dateOfFiling: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.loanId) {
        throw new Error("Loan ID is required");
      }

      if (!formData.workflowType) {
        throw new Error("Case Type is required");
      }

      if (!formData.hearingDate) {
        throw new Error("Hearing Date is required");
      }

      // Ensure loanId is a number
      const payload = {
        loanId: Number(formData.loanId),
        workflowType: formData.workflowType,
        hearingDate: formData.hearingDate ? new Date(formData.hearingDate).toISOString() : null
      };

      console.log('Sending payload:', payload);

      const response = await axios.post("/api/api/cases", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response);

      if (response.data.status === "SUCCESS") {
        setMessage("Case created successfully!");
      } else {
        setMessage("Failed to create case: " + response.data.message);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || error.message || "An error occurred while creating the case. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addusercase-container">
      <div className="addusercase-header-section">
        <h2>Create New Case</h2>
      </div>

      <div className="addusercase-search-section addusercase-card-SearchC-Case">
        <h3>Search Case from Ecourt</h3>
        <div className="addusercase-search-input-container">
          <input
            type="text"
            name="cnrNo"
            value={formData.cnrNo}
            placeholder="Enter CNR No"
            className="addusercase-search-input"
            disabled
          />
          <button className="addusercase-search-button" disabled>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="addusercase-form-sections">
        {/* Loan and Borrower Details - Read Only */}
        <div className="addusercase-form-section addusercase-card">
          <h3>Loan and Borrower Detail</h3>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group-loanId">
              <div className="addusercase-form-group-loanId-label">
                <label>Loan Number</label>
              </div>
              <div className="addusercase-loanID">
                <input
                  type="text"
                  value={formData.loanNumber}
                  disabled
                />
              </div>
            </div>

            <div className="addusercase-form-group-checkbox">
              <label className="addusercase-form-group-checkbox-label">Auto Assign</label>
              <input
                type="checkbox"
                name="autoAssign"
                checked={formData.autoAssign}
                onChange={handleChange}
                className="addusercase-checkbox"
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Borrower</label>
              <input
                type="text"
                value={formData.borrower}
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Loan Type</label>
              <input 
                type="text"
                value={formData.loanType}
                disabled
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Loan Amount</label>
              <input
                type="number"
                value={formData.loanAmount}
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Default Date</label>
              <input
                type="date"
                value={formData.defaultDate}
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>NPA Date</label>
              <input
                type="date"
                value={formData.npaDate}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Case Details */}
        <div className="addusercase-form-section addusercase-card">
          <h3>Case Detail</h3>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>CRN No.</label>
              <input
                type="text"
                name="crnNo"
                value={formData.crnNo}
                placeholder="Enter CRN No"
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Court</label>
              <input
                type="text"
                name="courtType"
                value={formData.courtType}
                onChange={handleChange}
                placeholder="Select Court"
              />
            </div>

            <div className="addusercase-form-group">
              <label>Hearing Date</label>
              <input
                type="datetime-local"
                name="hearingDate"
                value={formData.hearingDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Status</label>
              <input
                type="text"
                value="Initiated"
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Case Type</label>
              <select
                name="workflowType"
                value={formData.workflowType}
                onChange={handleChange}
                required
              >
                <option value="">Select Case Type</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>FI No.</label>
              <input
                type="number"
                name="fiNo"
                value={formData.fiNo}
                placeholder="Enter FI No"
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>FI Year</label>
              <input
                type="number"
                name="fiYear"
                value={formData.fiYear}
                placeholder="Enter FI Year"
                disabled
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Reg No.</label>
              <input
                type="number"
                name="regNo"
                value={formData.regNo}
                placeholder="Enter Reg No"
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Reg Year</label>
              <input
                type="number"
                name="regYear"
                value={formData.regYear}
                placeholder="Enter Reg Year"
                disabled
              />
            </div>

            <div className="addusercase-form-group">
              <label>Date of Filing</label>
              <input
                type="date"
                name="dateOfFiling"
                value={formData.dateOfFiling}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="addusercase-button-container">
        <CancelButton onClick={onClose} />
        <SaveButton onClick={handleSubmit} disabled={loading} />
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddUserCases;
