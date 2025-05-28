import React, { useState } from "react";
import axios from "axios";
import CancelButton from "../../../ReusableComponents/CancelButton";
import SaveButton from "../../../ReusableComponents/SaveButton";
import "./LoanPage.css";

const LoanPopup = ({ editingLoanId, onClose, onSave, initialData }) => {
  const [newLoanDetails, setNewLoanDetails] = useState({
    ...initialData,
    id: initialData?.id || null  // Track the auto-generated ID
  });
  const [popupSearchQuery, setPopupSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoanDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePopupSearchChange = (e) => {
    setPopupSearchQuery(e.target.value);
  };

  const handleSave = async () => {
    // Map form fields to API structure
    const payload = {
      loanNumber: newLoanDetails.loanNumber,
      loanType: newLoanDetails.loanType,
      loanAmount: parseFloat(newLoanDetails.totalDueAmount) || 0,
      disbursedAmount: parseFloat(newLoanDetails.disbursedAmount) || 0,
      interestRate: parseFloat(newLoanDetails.annualInterestRate) || 0,
      loanTenure: parseInt(newLoanDetails.tenure) || 0,
      startDate: newLoanDetails.lastPaidDate,
      endDate: newLoanDetails.defaultDate,
      emisPending: parseInt(newLoanDetails.numberOfEmisPending) || 0,
      repaymentFrequency: "NA",
      emiAmount: parseFloat(newLoanDetails.emiAmount) || 0,
      status: "NA",
      securityType: "NA",
      assetDetails: "NA",
      lastPaymentDate: newLoanDetails.lastPaidDate,
      nextDueDate: newLoanDetails.npaDate,
      borrower: {
        name: newLoanDetails.borrowerName,
        contactNumber: newLoanDetails.borrowerMobile,
        email: newLoanDetails.borrowerEmail,
        creditScore: 750.5,
        monthlyIncome: 65000.0,
        jobTitle: "NA",
        address: {
          city: "NA",
          state: "NA",
          pincode: "NA",
          addressLine: "NA"
        }
      }
    };

    try {
      let response;
      if (editingLoanId) {
        // Edit: PUT request
        response = await axios.put(`/api/api/loans/${editingLoanId}`, payload);
      } else {
        // New: POST request
        response = await axios.post("/api/api/loans", payload);
        // Save the auto-generated ID from the response
        if (response.data.status === "SUCCESS") {
          setNewLoanDetails(prev => ({
            ...prev,
            id: response.data.data.id
          }));
        }
      }
      onSave(newLoanDetails);
      onClose();
    } catch (error) {
      alert("Failed to save the loan. Please try again.");
    }
  };

    return (
        <div className="lawyer-modal">
            <div className="lawyer-content">
                <div className="lawyer-header">
                    <h2>{editingLoanId ? "Edit Loan" : "Add New Loan"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="lawyer-body">
                    <div className="modal-search-bar">
                        <input
                            type="text"
                            placeholder="Enter id"
                            value={popupSearchQuery}
                            onChange={handlePopupSearchChange}
                        />
                        <span className="search-icon" style={{ cursor: 'pointer' }}>🔍</span>
                    </div>

                    <div className="bordered-section">
                        <h3 style={{ textDecoration: 'underline' }}>Loan Details</h3>
                        <div className="form-grid">
                            <div className="form-column">
                                <div className="form-item">
                                    <label htmlFor="loanNumber">Loan Number</label>
                                    <input
                                        type="text" id="loanNumber" name="loanNumber"
                                        value={newLoanDetails.loanNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter Loan Number"
                                        disabled={!!editingLoanId}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="totalDueAmount">Total Due Amount</label>
                                    <input
                                        type="number" id="totalDueAmount" name="totalDueAmount"
                                        value={newLoanDetails.totalDueAmount} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="loanType">Loan Type</label>
                                    <select
                                        id="loanType" name="loanType"
                                        value={newLoanDetails.loanType} onChange={handleInputChange}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Personal">Personal Loan</option>
                                        <option value="Home">Home Loan</option>
                                        <option value="Auto">Auto Loan</option>
                                        <option value="Business">Business Loan</option>
                                        <option value="Debt Consolidation">Debt Consolidation Loan</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="annualInterestRate">Annual Interest Rate (%)</label>
                                    <input
                                        type="number" id="annualInterestRate" name="annualInterestRate"
                                        value={newLoanDetails.annualInterestRate} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="interestCharges">Interest Charges</label>
                                    <input
                                        type="number" id="interestCharges" name="interestCharges"
                                        value={newLoanDetails.interestCharges} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="outstandingAmount">Outstanding Amount</label>
                                    <input
                                        type="number" id="outstandingAmount" name="outstandingAmount"
                                        value={newLoanDetails.outstandingAmount} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="disbursedAmount">Disbursed Amount</label>
                                    <input
                                        type="number" id="disbursedAmount" name="disbursedAmount"
                                        value={newLoanDetails.disbursedAmount} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="emiAmount">EMI Amount</label>
                                    <input
                                        type="number" id="emiAmount" name="emiAmount"
                                        value={newLoanDetails.emiAmount} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="form-column">
                                <div className="form-item">
                                    <label htmlFor="tenure">Tenure (months)</label>
                                    <input
                                        type="number" id="tenure" name="tenure"
                                        value={newLoanDetails.tenure} onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="clientName">Client Name</label>
                                    <input
                                        type="text" id="clientName" name="clientName"
                                        value={newLoanDetails.clientName} onChange={handleInputChange}
                                        placeholder="Enter Client Name"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="lastPaidAmount">Last Paid Amount</label>
                                    <input
                                        type="number" id="lastPaidAmount" name="lastPaidAmount"
                                        value={newLoanDetails.lastPaidAmount} onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="lastPaidDate">Last Paid Date</label>
                                    <input
                                        type="date" id="lastPaidDate" name="lastPaidDate"
                                        value={newLoanDetails.lastPaidDate} onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="numberOfEmisPending">Number Of EMIs Pending</label>
                                    <input
                                        type="number" id="numberOfEmisPending" name="numberOfEmisPending"
                                        value={newLoanDetails.numberOfEmisPending} onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="defaultDate">Default Date</label>
                                    <input
                                        type="date" id="defaultDate" name="defaultDate"
                                        value={newLoanDetails.defaultDate} onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="npaDate">NPA Date</label>
                                    <input
                                        type="date" id="npaDate" name="npaDate"
                                        value={newLoanDetails.npaDate} onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-column">
                        <div className="bordered-section">
                            <h3 style={{ textDecoration: 'underline' }}>Borrower Details</h3>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="borrowerName">Borrower Name</label>
                                    <input
                                        type="text" id="borrowerName" name="borrowerName"
                                        value={newLoanDetails.borrowerName} onChange={handleInputChange}
                                        placeholder="Enter Borrower Name"
                                    />
                                </div>
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="borrowerMobile">Mobile No.</label>
                                    <input
                                        type="tel" id="borrowerMobile" name="borrowerMobile"
                                        value={newLoanDetails.borrowerMobile} onChange={handleInputChange}
                                        placeholder="Enter Mobile No."
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="borrowerEmail">Email</label>
                                    <input
                                        type="email" id="borrowerEmail" name="borrowerEmail"
                                        value={newLoanDetails.borrowerEmail} onChange={handleInputChange}
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="bordered-section">
                            <h3 style={{ textDecoration: 'underline' }}>Tenant Details</h3>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="tenantId">Tenant ID</label>
                                    <input
                                        type="text" id="tenantId" name="tenantId"
                                        value={newLoanDetails.tenantId} onChange={handleInputChange}
                                        placeholder="Enter Tenant ID"
                                    />
                                </div>
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="panNumber">PAN Number</label>
                                    <input
                                        type="text" id="panNumber" name="panNumber"
                                        value={newLoanDetails.panNumber} onChange={handleInputChange}
                                        placeholder="Enter PAN"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="tenantName">Name</label>
                                    <input
                                        type="text" id="tenantName" name="tenantName"
                                        value={newLoanDetails.tenantName} onChange={handleInputChange}
                                        placeholder="Enter Tenant Name"
                                    />
                                </div>
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="gstNumber">GST Number</label>
                                    <input
                                        type="text" id="gstNumber" name="gstNumber"
                                        value={newLoanDetails.gstNumber} onChange={handleInputChange}
                                        placeholder="Enter GST Number"
                                    />
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="bordered-section">
                            <h3 style={{ textDecoration: 'underline' }}>FPR Details</h3>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="fprName">Name</label>
                                    <input
                                        type="text" id="fprName" name="fprName"
                                        value={newLoanDetails.fprName} onChange={handleInputChange}
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="fprEmail">Email</label>
                                    <input
                                        type="email" id="fprEmail" name="fprEmail"
                                        value={newLoanDetails.fprEmail} onChange={handleInputChange}
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-item" style={{ flex: 1 }}>
                                    <label htmlFor="fprMobile">Mobile No.</label>
                                    <input
                                        type="tel" id="fprMobile" name="fprMobile"
                                        value={newLoanDetails.fprMobile} onChange={handleInputChange}
                                        placeholder="Enter Mobile No."
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="lawyer-footer">
          <CancelButton label="Cancel" onClick={onClose} />
          <SaveButton label={editingLoanId ? "Update" : "Save"} onClick={handleSave} />
        </div>
            </div>
        </div>
    );
};

export default LoanPopup;