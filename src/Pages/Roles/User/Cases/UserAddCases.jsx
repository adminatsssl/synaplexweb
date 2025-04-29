import React, { useState } from 'react';
import axios from 'axios';
import './UserCases.css'

const loanTypes = [
  "Personal Loan",
  "Home Loan",
  "Debt Consolidation Loan",
  "Auto Loans",
  "Student Loan",
  "Business Loan",
  "Payday Loan",
  "Credit Card Loan"
];

const caseTypes = [
  "Arbitration",
  "SARFAESI",
  "Cheque Bounce",
  "Debt Recovery Tribunal (DRT)",
  "Civil Court",
  "IBC/NCLT",
  "Criminal Complaints"
];

const AddUserCases = () => {
  const [formData, setFormData] = useState({
    cnrNo: '',
    loanId: '',
    borrower: '',
    loanType: '',
    loanAmount: 0,
    defaultDate: '',
    npaDate: '',
    autoAssign: false,
    crnNo: '',
    courtType: '',
    hearingDate: '',
    status: 'Initiated',
    caseType: '',
    fiNo: 0,
    fiYear: 0,
    regNo: 0,
    regYear: 0,
    dateOfFiling: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    if (!formData.borrower || !formData.loanType || !formData.loanAmount || !formData.defaultDate || !formData.npaDate || !formData.courtType || !formData.caseType) {
      setMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    console.log('Form Data:', formData);

    try {
      const borrowerResponse = await axios.post('/odata/usercases/Borrowers', {
        Name: formData.borrower,
      });
      const borrowerId = borrowerResponse.data.id;

      const loanResponse = await axios.post('/odata/usercases/Loans', {
        BorrowerId: borrowerId,
        LoanType: formData.loanType,
        LoanAmount: parseFloat(formData.loanAmount),
        DefaultDate: formData.defaultDate,
        NpaDate: formData.npaDate,
      });
      const loanId = loanResponse.data.id;

      const courtResponse = await axios.post('/odata/usercases/Courts', {
        CourtType: formData.courtType,
        FiNo: parseInt(formData.fiNo, 10),
        FiYear: parseInt(formData.fiYear, 10),
        RegNo: parseInt(formData.regNo, 10),
        RegYear: parseInt(formData.regYear, 10),
        HearingDate: formData.hearingDate,
        DateOfFiling: formData.dateOfFiling,
      });
      const courtId = courtResponse.data.id;

      await axios.post('/odata/usercases/LexCases', {
        LoanId: loanId,
        CourtId: courtId,
        Status: formData.status,
        CaseType: formData.caseType,
        CrnNo: formData.crnNo,
      });

      setMessage('Case created successfully!');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
      setMessage('Error occurred while saving case.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-cases-container">
      <div className="header-section">
        <h2>Add User Case</h2>
      </div>

      <div className="search-section card">
        <h3>Search Case from Ecourt</h3>
        <div className="search-input-container">
          <input
            type="text"
            name="cnrNo"
            value={formData.cnrNo}
            onChange={handleChange}
            placeholder="Enter CNR No"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="form-sections">
        {/* Loan and Borrower Detail Section */}
        <div className="form-section card">
          <div className="section-header">
            <h3>Loan and Borrower Detail</h3>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Loan ID</label>
              <input
                type="text"
                name="loanId"
                value={formData.loanId}
                onChange={handleChange}
                placeholder="Loan ID"
              />
            </div>
            <div className="form-group">
              <label>Search Loan By Loan Number</label>
              <input type="text" placeholder="Search Loan" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Borrower</label>
              <input
                type="text"
                name="borrower"
                value={formData.borrower}
                onChange={handleChange}
                placeholder="Borrower Name"
              />
            </div>
            <div className="form-group">
              <label>Loan Type</label>
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
              >
                <option value="">Select Loan Type</option>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Default Date</label>
              <input
                type="date"
                name="defaultDate"
                value={formData.defaultDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
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

        {/* Court & Case Detail Section */}
        <div className="form-section card">
          <div className="section-header">
            <h3>Court & Case Detail</h3>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>CRN No.</label>
              <input
                type="text"
                name="crnNo"
                value={formData.crnNo}
                onChange={handleChange}
                placeholder="CRN No"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Court Type</label>
              <input
                type="text"
                name="courtType"
                value={formData.courtType}
                onChange={handleChange}
                placeholder="Court Type"
              />
            </div>
            <div className="form-group">
              <label>Hearing Date</label>
              <input
                type="date"
                name="hearingDate"
                value={formData.hearingDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FI No</label>
              <input
                type="number"
                name="fiNo"
                value={formData.fiNo}
                onChange={handleChange}
                placeholder="FI No"
              />
            </div>
            <div className="form-group">
              <label>FI Year</label>
              <input
                type="number"
                name="fiYear"
                value={formData.fiYear}
                onChange={handleChange}
                placeholder="FI Year"
              />
            </div>
          </div>
        </div>

        {/* AutoAssign and Status Section */}
        <div className="form-section card">
          <div className="form-row">
            <div className="form-group">
              <label>AutoAssign</label>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="autoAssign"
                  checked={formData.autoAssign}
                  onChange={handleChange}
                />
                <span>Auto Assign</span>
              </div>
            </div>
            <div className="form-group">
              <label>Loan Amount</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Initiated</option>
                <option>Pending</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Case Type</label>
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
              >
                <option value="">Select Case Type</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
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

      {/* Buttons */}
      <div className="action-buttons">
        <button
          onClick={() => setFormData({})}
          className="cancel-button"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="save-button"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="message-container">
          {message}
        </div>
      )}
    </div>
  );
};

export default AddUserCases;