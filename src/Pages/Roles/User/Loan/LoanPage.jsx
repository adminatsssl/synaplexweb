import React, { useState } from "react";
import "./LoanPage.css";
import Layout from "../../../Layout/Layout";

const LoanPage = () => {
  const initialLoanData = [
    {
      id: "LOAN001",
      type: "Business Loan",
      borrowerName: "Ujjwal Chauhan",
      totalDueAmount: 90000,
      defaultDate: "4/10/2025",
      npaDate: "4/15/2025",
    },
    {
      id: "LOAN002",
      type: "Debt Consolidation Loan",
      borrowerName: "Vishal Singh",
      totalDueAmount: 2000,
      defaultDate: "4/10/2025",
      npaDate: "4/12/2025",
    },
    {
      id: "LOAN003",
      type: "Auto Loan",
      borrowerName: " Tanuj Singh",
      totalDueAmount: 0,
      defaultDate: "4/8/2025",
      npaDate: "4/16/2025",
    },
    {
      id: "LOAN004",
      type: "Debt Consolidation Loan",
      borrowerName: "Cheeta",
      totalDueAmount: 927364,
      defaultDate: "4/13/2025",
      npaDate: "4/14/2025",
    },
    {
      id: "LOAN005",
      type: "Debt Consolidation Loan",
      borrowerName: "Tushar ",
      totalDueAmount: 93678,
      defaultDate: "4/27/2025",
      npaDate: "4/4/2025",
    },
    {
      id: "LOAN006",
      type: "Auto Loans",
      borrowerName: "Shalini Singh",
      totalDueAmount: 45677,
      defaultDate: "4/30/2025",
      npaDate: "5/3/2025",
    },
  ];

  const [loanData, setLoanData] = useState(initialLoanData);
  const [isAddLoanPopupVisible, setIsAddLoanPopupVisible] = useState(false);
  const [newLoanDetails, setNewLoanDetails] = useState({
    loanId: "",
    tenure: "",
    totalDueAmount: "",
    clientName: "",
    loanType: "",
    lastPaidAmount: "",
    annualInterestRate: "",
    lastPaidDate: "",
    interestCharges: "",
    numberOfEmisPending: "",
    outstandingAmount: "",
    defaultDate: "",
    disbursedAmount: "",
    npaDate: "",
    borrowerName: "",
    borrowerMobile: "",
    borrowerEmail: "",
    tenantId: "",
    tenantName: "",
    panNumber: "",
    gstNumber: "",
    fprName: "",
    fprEmail: "",
    fprMobile: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [popupSearchQuery, setPopupSearchQuery] = useState("");

  const handleAddLoanClick = () => setIsAddLoanPopupVisible(true);

  const handleClosePopup = () => {
    setIsAddLoanPopupVisible(false);
    setNewLoanDetails({
      loanId: "",
      tenure: "",
      totalDueAmount: "",
      clientName: "",
      loanType: "",
      lastPaidAmount: "",
      annualInterestRate: "",
      lastPaidDate: "",
      interestCharges: "",
      numberOfEmisPending: "",
      outstandingAmount: "",
      defaultDate: "",
      disbursedAmount: "",
      npaDate: "",
      borrowerName: "",
      borrowerMobile: "",
      borrowerEmail: "",
      tenantId: "",
      tenantName: "",
      panNumber: "",
      gstNumber: "",
      fprName: "",
      fprEmail: "",
      fprMobile: "",
    });
    setPopupSearchQuery(""); // Clear popup search when closed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoanDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveLoan = () => {
    const newLoan = {
      id: newLoanDetails.loanId,
      type: newLoanDetails.loanType,
      borrowerName:
        newLoanDetails.borrowerName || newLoanDetails.clientName || "N/A",
      totalDueAmount: newLoanDetails.totalDueAmount,
      defaultDate: newLoanDetails.defaultDate,
      npaDate: newLoanDetails.npaDate,
      clientName: newLoanDetails.clientName,
      borrowerMobile: newLoanDetails.borrowerMobile,
      borrowerEmail: newLoanDetails.borrowerEmail,
      tenantId: newLoanDetails.tenantId,
      tenantName: newLoanDetails.tenantName,
      panNumber: newLoanDetails.panNumber,
      gstNumber: newLoanDetails.gstNumber,
      fprName: newLoanDetails.fprName,
      fprEmail: newLoanDetails.fprEmail,
      fprMobile: newLoanDetails.fprMobile,
    };
    setLoanData((prev) => [...prev, newLoan]);
    handleClosePopup();
  };

  const handleDeleteLoan = (loanId) => {
    setLoanData((prev) => prev.filter((loan) => loan.id !== loanId));
  };

  const handleHomepageSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePopupSearchChange = (e) => {
    setPopupSearchQuery(e.target.value);
    // You might want to implement filtering of existing data here if needed
    // based on the popup search query. For now, we'll just store the value.
  };

  const filteredLoans = loanData.filter((loan) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      (loan.borrowerName || "").toLowerCase().includes(searchTerm) ||
      loan.id.toLowerCase().includes(searchTerm) ||
      (loan.tenantName || "").toLowerCase().includes(searchTerm) ||
      (loan.tenantId || "").toLowerCase().includes(searchTerm) ||
      (loan.gstNumber || "").toLowerCase().includes(searchTerm) ||
      (loan.panNumber || "").toLowerCase().includes(searchTerm) ||
      (loan.fprName || "").toLowerCase().includes(searchTerm) ||
      (loan.fprEmail || "").toLowerCase().includes(searchTerm) ||
      (loan.fprMobile || "").toLowerCase().includes(searchTerm)
    ); // Default search across all these
  });

  return (
    <Layout>
    <div className="loans-fullpage-container">
      <div className="loans-header">
        <h1>Loans</h1>
        <div className="actions">
          <button className="btn-outline">Import Loan</button>
          <button className="btn-outline">Download Template</button>
          <button className="btn-primary" onClick={handleAddLoanClick}>
            + Add Loan
          </button>
        </div>
      </div>

      <div className="loans-table-container styled-lookalike">
        <table className="loans-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Borrower Name</th>
              <th>Due Amount</th>
              <th>Default Date</th>
              <th>NPA Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-message">
                  No records found
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.id}</td>
                  <td>{loan.type}</td>
                  <td>{loan.borrowerName || loan.clientName || "N/A"}</td>
                  <td>${loan.totalDueAmount}</td>
                  <td>{loan.defaultDate}</td>
                  <td>{loan.npaDate}</td>
                  <td className="actions-cell">
                    <button className="view-btn">👁</button>
                    <button className="edit-btn">✏️</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteLoan(loan.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddLoanPopupVisible && (
        <div className="add-loan-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Add New Loan</h2>
              <button className="close-btn" onClick={handleClosePopup}>
                ×
              </button>
            </div>

            <div className="popup-search">
              <h3>Search Loan</h3>
              <input
                type="text"
                placeholder="Enter Loan ID"
                value={popupSearchQuery}
                onChange={handlePopupSearchChange}
              />
              <button className="search-button">🔍</button>{" "}
              {/* Optional search button */}
            </div>

            <div className="form-sections-container">
              <div className="form-section">
                <h3>Loan Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Loan ID</label>
                    <input
                      type="text"
                      name="loanId"
                      value={newLoanDetails.loanId}
                      onChange={handleInputChange}
                      placeholder="Enter Loan ID"
                    />
                  </div>
                  <div className="form-group">
                    <label>Loan Type</label>
                    <select
                      name="loanType"
                      value={newLoanDetails.loanType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Personal">Personal</option>
                      <option value="Home">Home</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tenure</label>
                    <input
                      type="text"
                      name="tenure"
                      value={newLoanDetails.tenure}
                      onChange={handleInputChange}
                      placeholder="Enter Tenure"
                    />
                  </div>
                  <div className="form-group">
                    <label>Total Due Amount</label>
                    <input
                      type="number"
                      name="totalDueAmount"
                      value={newLoanDetails.totalDueAmount}
                      onChange={handleInputChange}
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={newLoanDetails.clientName}
                      onChange={handleInputChange}
                      placeholder="Enter Client Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Paid Amount</label>
                    <input
                      type="number"
                      name="lastPaidAmount"
                      value={newLoanDetails.lastPaidAmount}
                      onChange={handleInputChange}
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="form-group">
                    <label>Annual Interest Rate</label>
                    <input
                      type="number"
                      name="annualInterestRate"
                      value={newLoanDetails.annualInterestRate}
                      onChange={handleInputChange}
                      placeholder="Enter Rate"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Paid Date</label>
                    <input
                      type="date"
                      name="lastPaidDate"
                      value={newLoanDetails.lastPaidDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Interest Charges</label>
                    <input
                      type="number"
                      name="interestCharges"
                      value={newLoanDetails.interestCharges}
                      onChange={handleInputChange}
                      placeholder="Enter Charges"
                    />
                  </div>
                  <div className="form-group">
                    <label>Number of EMIs Pending</label>
                    <input
                      type="number"
                      name="numberOfEmisPending"
                      value={newLoanDetails.numberOfEmisPending}
                      onChange={handleInputChange}
                      placeholder="Enter Count"
                    />
                  </div>
                  <div className="form-group">
                    <label>Outstanding Amount</label>
                    <input
                      type="number"
                      name="outstandingAmount"
                      value={newLoanDetails.outstandingAmount}
                      onChange={handleInputChange}
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="form-group">
                    <label>Default Date</label>
                    <input
                      type="date"
                      name="defaultDate"
                      value={newLoanDetails.defaultDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Disbursed Amount</label>
                    <input
                      type="number"
                      name="disbursedAmount"
                      value={newLoanDetails.disbursedAmount}
                      onChange={handleInputChange}
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="form-group">
                    <label>NPA Date</label>
                    <input
                      type="date"
                      name="npaDate"
                      value={newLoanDetails.npaDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="form-section">
                <h3>Borrower Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Borrower Name</label>
                    <input
                      type="text"
                      name="borrowerName"
                      value={newLoanDetails.borrowerName}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="text"
                      name="borrowerMobile"
                      value={newLoanDetails.borrowerMobile}
                      onChange={handleInputChange}
                      placeholder="Enter Mobile"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="borrowerEmail"
                      value={newLoanDetails.borrowerEmail}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="form-section">
                <h3>Tenant Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Tenant ID</label>
                    <input
                      type="text"
                      name="tenantId"
                      value={newLoanDetails.tenantId}
                      onChange={handleInputChange}
                      placeholder="Enter Tenant ID"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tenant Name</label>
                    <input
                      type="text"
                      name="tenantName"
                      value={newLoanDetails.tenantName}
                      onChange={handleInputChange}
                      placeholder="Enter Tenant Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>PAN Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={newLoanDetails.panNumber}
                      onChange={handleInputChange}
                      placeholder="Enter PAN"
                    />
                  </div>
                  <div className="form-group">
                    <label>GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={newLoanDetails.gstNumber}
                      onChange={handleInputChange}
                      placeholder="Enter GST Number"
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="form-section">
                <h3>FPR Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="fprName"
                      value={newLoanDetails.fprName}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="fprEmail"
                      value={newLoanDetails.fprEmail}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile No.</label>
                    <input
                      type="text"
                      name="fprMobile"
                      value={newLoanDetails.fprMobile}
                      onChange={handleInputChange}
                      placeholder="Enter Mobile No."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="popup-actions">
              <button className="btn-secondary" onClick={handleClosePopup}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveLoan}>
                Save Loan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default LoanPage;
