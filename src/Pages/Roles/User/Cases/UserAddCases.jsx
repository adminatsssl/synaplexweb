import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserCases.css";
import { FaSearch } from "react-icons/fa";
import SaveButton from "../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../ReusableComponents/CancelButton.jsx";

const loanTypes = [
  "Personal Loan",
  "Home Loan",
  "Debt Consolidation Loan",
  "Auto Loans",
  "Student Loan",
  "Business Loan",
  "Payday Loan",
  "Credit Card Loan",
];

const caseTypes = [
  "Arbitration",
  "SARFAESI",
  "Cheque Bounce",
  "Debt Recovery Tribunal (DRT)",
  "Civil Court",
  "IBC/NCLT",
  "Criminal Complaints",
];

const AddUserCases = ({ initialData = null, onClose }) => {
  const [formData, setFormData] = useState({
    cnrNo: "",
    loanId: "",
    borrower: "",
    loanType: "",
    loanAmount: 0,
    defaultDate: "",
    npaDate: "",
    autoAssign: false,
    crnNo: "",
    courtType: "",
    hearingDate: "",
    status: "Initiated",
    caseType: "",
    fiNo: 0,
    fiYear: 0,
    regNo: 0,
    regYear: 0,
    dateOfFiling: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        loanId: initialData.loanId || "",
        borrower: initialData.borrower || "",
        loanType: initialData.loanType || "",
        loanAmount: initialData.loanAmount || 0,
        defaultDate: initialData.defaultDate || "",
        npaDate: initialData.npaDate || "",
      }));
    }
  }, [initialData]);

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
      // Get court ID from court type
      const courtId = 1; // Replace with actual court ID logic

      // Extract loan ID from form data
      const loanId = formData.loanId;

      if (!initialData) {
        // CREATE mode
        await axios.post("/odata/usercases/LexCases", {
          LoanId: loanId,
          CourtId: courtId,
          Status: formData.status,
          CaseType: formData.caseType,
          CrnNo: formData.crnNo,
        });

        setMessage("Case created successfully!");
      } else {
        // EDIT mode
        await axios.patch(`/odata/usercases/LexCases(${initialData.CaseID})`, {
          CaseType: formData.caseType,
          Status: formData.status,
          CrnNo: formData.crnNo,
        });

        setMessage("Case updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
    setFormData({});
    setMessage("");
  };

  return (
    <div className="addusercase-container">
      <div className="addusercase-header-section">
        <h2>{initialData ? "Edit Case" : "Add Case"}</h2>
      </div>
      {!initialData && (
        <div className="addusercase-search-section addusercase-card-SearchC-Case">
          <h3>Search Case from Ecourt</h3>
          <div className="addusercase-search-input-container">
            <input
              type="text"
              name="cnrNo"
              value={formData.cnrNo}
              onChange={handleChange}
              placeholder="Enter CNR No"
              className="addusercase-search-input"
            />
            <button className="addusercase-search-button">
              <FaSearch />
            </button>
          </div>
        </div>
      )}

      <div className="addusercase-form-sections">
        {/* Loan and Borrower Details */}
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
                  name="loanId"
                  value={formData.loanId}
                  onChange={handleChange}
                  placeholder="Loan Number"
                  disabled={!!initialData}
                />
                {!initialData && (
                  <button type="button">
                    <FaSearch />
                  </button>
                )}
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
                name="borrower"
                value={formData.borrower}
                onChange={handleChange}
                placeholder="Borrower Name"
                disabled={!!initialData}
              />
            </div>

            <div className="addusercase-form-group">
              <label>Loan Type</label>
              <input 
                type="text"
                name="loanType" 
                value={formData.loanType}
                onChange={handleChange}
                placeholder="Loan Type"
                disabled={!!initialData}
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Loan Amount</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Enter Amount"
                disabled={!!initialData}
              />
            </div>

            <div className="addusercase-form-group">
              <label>Default Date</label>
              <input
                type="date"
                name="defaultDate"
                value={formData.defaultDate}
                onChange={handleChange}
                disabled={!!initialData}
              />
            </div>

            <div className="addusercase-form-group">
              <label>NPA Date</label>
              <input
                type="date"
                name="npaDate"
                value={formData.npaDate}
                onChange={handleChange}
                disabled={!!initialData}
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
                onChange={handleChange}
                placeholder="Enter CRN No"
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
                type="date"
                name="hearingDate"
                value={formData.hearingDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addusercase-form-row">
            <div className="addusercase-form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Initiated">Initiated</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="addusercase-form-group">
              <label>Case Type</label>
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
              >
                <option value="">Select Case Type</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
                onChange={handleChange}
                placeholder="Enter FI No"
              />
            </div>

            <div className="addusercase-form-group">
              <label>FI Year</label>
              <input
                type="number"
                name="fiYear"
                value={formData.fiYear}
                onChange={handleChange}
                placeholder="Enter FI Year"
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
                onChange={handleChange}
                placeholder="Enter Reg No"
              />
            </div>

            <div className="addusercase-form-group">
              <label>Reg Year</label>
              <input
                type="number"
                name="regYear"
                value={formData.regYear}
                onChange={handleChange}
                placeholder="Enter Reg Year"
              />
            </div>

            <div className="addusercase-form-group">
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

      <div className="addusercase-button-container">
        <CancelButton onClick={handleCancel} />
        <SaveButton onClick={handleSubmit} disabled={loading} />
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddUserCases;
