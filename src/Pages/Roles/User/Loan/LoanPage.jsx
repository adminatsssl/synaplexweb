import React, { useState } from "react";
import "./LoanPage.css"; // Ensure this CSS file is linked
import Layout from "../../../Layout/Layout"; // Assuming Layout component path
import IconButton from "../../../ReusableComponents/IconButton";
import CancelButton from "../../../ReusableComponents/CancelButton"; // Assuming path
import SaveButton from "../../../ReusableComponents/SaveButton";
import AddButton from "../../../ReusableComponents/AddButton";
import { MdOutlineAssignmentInd } from "react-icons/md";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid"; // Adjust path as needed

const LoanPage = () => {
    const initialLoanData = [
        {
            id: "LOAN001",
            type: "Business Loan",
            borrowerName: "Ujjwal Chauhan",
            totalDueAmount: 90000,
            defaultDate: "2025-10-04", // Standardized date formatYYYY-MM-DD
            npaDate: "2025-10-15",
            // Include other potential fields used in the popup
            tenure: 60,
            clientName: "Ujjwal Chauhan",
            lastPaidAmount: 10000,
            annualInterestRate: 12.5,
            lastPaidDate: "2024-09-01",
            interestCharges: 5000,
            numberOfEmisPending: 10,
            outstandingAmount: 80000,
            disbursedAmount: 100000,
            emiAmount: 2000,
            borrowerMobile: "9876543210",
            borrowerEmail: "ujjwal@example.com",
            tenantId: "TENANT001",
            tenantName: "Tenant One",
            panNumber: "ABCDE1234F",
            gstNumber: "GSTEJ2345F",
            fprName: "FPR Agent 1",
            fprEmail: "fpr1@example.com",
            fprMobile: "9988776655",
        },
        {
            id: "LOAN002",
            type: "Debt Consolidation Loan",
            borrowerName: "Vishal Singh",
            totalDueAmount: 2000,
            defaultDate: "2025-10-04",
            npaDate: "2025-12-04",
             // Include other potential fields used in the popup
             tenure: 36,
             clientName: "Vishal Singh",
             lastPaidAmount: 0,
             annualInterestRate: 10.0,
             lastPaidDate: null,
             interestCharges: 100,
             numberOfEmisPending: 5,
             outstandingAmount: 2000,
             disbursedAmount: 50000,
             emiAmount: 1500,
             borrowerMobile: "9876543211",
             borrowerEmail: "vishal@example.com",
             tenantId: "TENANT002",
             tenantName: "Tenant Two",
             panNumber: "FGHIJ5678K",
             gstNumber: "GSTKL6789M",
             fprName: "FPR Agent 2",
             fprEmail: "fpr2@example.com",
             fprMobile: "9988776656",
        },
        {
            id: "LOAN003",
            type: "Auto Loan",
            borrowerName: "Tanuj Singh",
            totalDueAmount: 0,
            defaultDate: "2025-08-04",
            npaDate: "2025-10-16",
             // Include other potential fields used in the popup
             tenure: 48,
             clientName: "Tanuj Singh",
             lastPaidAmount: 30000,
             annualInterestRate: 8.0,
             lastPaidDate: "2025-07-01",
             interestCharges: 0,
             numberOfEmisPending: 0,
             outstandingAmount: 0,
             disbursedAmount: 300000,
             emiAmount: 7500,
             borrowerMobile: "9876543212",
             borrowerEmail: "tanuj@example.com",
             tenantId: "TENANT003",
             tenantName: "Tenant Three",
             panNumber: "LMNOP9012Q",
             gstNumber: "GSTRS0123T",
             fprName: "FPR Agent 3",
             fprEmail: "fpr3@example.com",
             fprMobile: "9988776657",
        },
        {
            id: "LOAN004",
            type: "Debt Consolidation Loan",
            borrowerName: "Cheeta",
            totalDueAmount: 927364,
            defaultDate: "2025-10-13",
            npaDate: "2025-10-14",
             // Include other potential fields used in the popup
             tenure: 72,
             clientName: "Cheeta",
             lastPaidAmount: 0,
             annualInterestRate: 15.0,
             lastPaidDate: null,
             interestCharges: 10000,
             numberOfEmisPending: 20,
             outstandingAmount: 927364,
             disbursedAmount: 1000000,
             emiAmount: 18000,
             borrowerMobile: "9876543213",
             borrowerEmail: "cheeta@example.com",
             tenantId: "TENANT004",
             tenantName: "Tenant Four",
             panNumber: "UVWXY3456Z",
             gstNumber: "GSTZA4567B",
             fprName: "FPR Agent 4",
             fprEmail: "fpr4@example.com",
             fprMobile: "9988776658",
        },
        {
            id: "LOAN005",
            type: "Debt Consolidation Loan",
            borrowerName: "Tushar",
            totalDueAmount: 93678,
            defaultDate: "2025-10-27",
            npaDate: "2025-04-04", // This seems like a past date based on year, adjust if needed
             // Include other potential fields used in the popup
             tenure: 36,
             clientName: "Tushar",
             lastPaidAmount: 5000,
             annualInterestRate: 11.0,
             lastPaidDate: "2025-03-15", // Adjust date if needed
             interestCharges: 2000,
             numberOfEmisPending: 15,
             outstandingAmount: 93678,
             disbursedAmount: 120000,
             emiAmount: 3500,
             borrowerMobile: "9876543214",
             borrowerEmail: "tushar@example.com",
             tenantId: "TENANT005",
             tenantName: "Tenant Five",
             panNumber: "CDEFG7890H",
             gstNumber: "GSTIJ8901K",
             fprName: "FPR Agent 5",
             fprEmail: "fpr5@example.com",
             fprMobile: "9988776659",
        },
        {
            id: "LOAN006",
            type: "Auto Loans",
            borrowerName: "Shalini Singh",
            totalDueAmount: 45677,
            defaultDate: "2025-10-30",
            npaDate: "2025-03-05", // This seems like a past date based on year, adjust if needed
             // Include other potential fields used in the popup
             tenure: 48,
             clientName: "Shalini Singh",
             lastPaidAmount: 10000,
             annualInterestRate: 9.5,
             lastPaidDate: "2025-02-20", // Adjust date if needed
             interestCharges: 1500,
             numberOfEmisPending: 12,
             outstandingAmount: 45677,
             disbursedAmount: 200000,
             emiAmount: 5000,
             borrowerMobile: "9876543215",
             borrowerEmail: "shalini@example.com",
             tenantId: "TENANT006",
             tenantName: "Tenant Six",
             panNumber: "LMNOP2345Q",
             gstNumber: "GSTRS3456T",
             fprName: "FPR Agent 6",
             fprEmail: "fpr6@example.com",
             fprMobile: "9988776660",
        },
    ];

    const [loanData, setLoanData] = useState(initialLoanData);
    const [isAddLoanPopupVisible, setIsAddLoanPopupVisible] = useState(false);
    const [newLoanDetails, setNewLoanDetails] = useState({
        loanId: "",
        tenure: "",
        totalDueAmount: "",
        clientName: "",
        loanType: "", // Use loanType state for the dropdown
        lastPaidAmount: "",
        annualInterestRate: "",
        lastPaidDate: "",
        interestCharges: "",
        numberOfEmisPending: "",
        outstandingAmount: "",
        defaultDate: "",
        disbursedAmount: "",
        npaDate: "",
        emiAmount: "",
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
    // New state to track if we are editing and which loan
    const [editingLoanId, setEditingLoanId] = useState(null);


    const handleAddLoanClick = () => {
        setEditingLoanId(null); // Clear editing state
        setNewLoanDetails({ // Reset form for new loan
            loanId: "",
            tenure: "",
            totalDueAmount: "",
            clientName: "",
            loanType: "", // Reset loanType
            lastPaidAmount: "",
            annualInterestRate: "",
            lastPaidDate: "",
            interestCharges: "",
            numberOfEmisPending: "",
            outstandingAmount: "",
            defaultDate: "",
            disbursedAmount: "",
            npaDate: "",
            emiAmount: "",
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
        setPopupSearchQuery("");
        setIsAddLoanPopupVisible(true);
    };


    const handleClosePopup = () => {
        setIsAddLoanPopupVisible(false);
        setEditingLoanId(null); // Clear editing state
        setNewLoanDetails({ // Reset form
            loanId: "",
            tenure: "",
            totalDueAmount: "",
            clientName: "",
            loanType: "", // Reset loanType
            lastPaidAmount: "",
            annualInterestRate: "",
            lastPaidDate: "",
            interestCharges: "",
            numberOfEmisPending: "",
            outstandingAmount: "",
            defaultDate: "",
            disbursedAmount: "",
            npaDate: "",
            emiAmount: "",
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
        setPopupSearchQuery("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLoanDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveLoan = () => {
        if (editingLoanId) {
            // Update existing loan
            setLoanData((prev) =>
                prev.map((loan) =>
                    loan.id === editingLoanId ? { ...loan, ...newLoanDetails, type: newLoanDetails.loanType, id: editingLoanId } : loan // Map loanType back to 'type' property
                )
            );
        } else {
            // Add new loan
            const newLoanEntry = {
                // Map form fields to the expected table data structure
                id: newLoanDetails.loanId,
                type: newLoanDetails.loanType, // Use loanType state for 'type'
                borrowerName: newLoanDetails.borrowerName || newLoanDetails.clientName || "N/A",
                totalDueAmount: newLoanDetails.totalDueAmount,
                defaultDate: newLoanDetails.defaultDate,
                npaDate: newLoanDetails.npaDate,
                // Include all other details from the form
                ...newLoanDetails,
            };
            setLoanData((prev) => [...prev, newLoanEntry]);
        }

        handleClosePopup();
    };

    const handleDeleteLoan = (loanId) => {
        if (window.confirm("Are you sure you want to delete this loan record?")) {
             setLoanData((prev) => prev.filter((loan) => loan.id !== loanId));
             // Potentially add a success message here
        }
    };

    // Function to handle editing a loan
    const handleEditLoan = (loan) => {
        setEditingLoanId(loan.id); // Set the ID of the loan being edited
        setNewLoanDetails({ // Populate the form with the loan's data
            loanId: loan.id || "",
            tenure: loan.tenure || "",
            totalDueAmount: loan.totalDueAmount || "",
            clientName: loan.clientName || "",
            loanType: loan.type || "", // Populate loanType from 'type' property
            lastPaidAmount: loan.lastPaidAmount || "",
            annualInterestRate: loan.annualInterestRate || "",
            lastPaidDate: loan.lastPaidDate || "",
            interestCharges: loan.interestCharges || "",
            numberOfEmisPending: loan.numberOfEmisPending || "",
            outstandingAmount: loan.outstandingAmount || "",
            defaultDate: loan.defaultDate || "",
            disbursedAmount: loan.disbursedAmount || "",
            npaDate: loan.npaDate || "",
            emiAmount: loan.emiAmount || "",
            borrowerName: loan.borrowerName || "",
            borrowerMobile: loan.borrowerMobile || "",
            borrowerEmail: loan.borrowerEmail || "",
            tenantId: loan.tenantId || "",
            tenantName: loan.tenantName || "",
            panNumber: loan.panNumber || "",
            gstNumber: loan.gstNumber || "",
            fprName: loan.fprName || "",
            fprEmail: loan.fprEmail || "",
            fprMobile: loan.fprMobile || "",
        });
        setPopupSearchQuery(""); // Clear popup search query
        setIsAddLoanPopupVisible(true); // Open the modal
    };


    const handleHomepageSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePopupSearchChange = (e) => {
        setPopupSearchQuery(e.target.value);
        // Implement search logic within the popup if needed
        // For now, this state is just updated
    };

    // Filter logic based on the main search input
    const filteredLoans = loanData.filter((loan) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            (loan.borrowerName || "").toLowerCase().includes(searchTerm) ||
            (loan.clientName || "").toLowerCase().includes(searchTerm) || // Include clientName in search
            (loan.id || "").toLowerCase().includes(searchTerm) ||
            (loan.tenantName || "").toLowerCase().includes(searchTerm) ||
            (loan.tenantId || "").toLowerCase().includes(searchTerm) ||
            (loan.gstNumber || "").toLowerCase().includes(searchTerm) ||
            (loan.panNumber || "").toLowerCase().includes(searchTerm) ||
            (loan.fprName || "").toLowerCase().includes(searchTerm) ||
            (loan.fprEmail || "").toLowerCase().includes(searchTerm) ||
            (loan.fprMobile || "").toLowerCase().includes(searchTerm) ||
            (loan.type || "").toLowerCase().includes(searchTerm) // Include loan type in search
        );
    });

     // Define the columns for the ReusableGrid component
     const columns = [
        {
          key: "id",
          label: "Loan ID",
        },
        {
          key: "type", // Assuming the 'type' property holds the Loan Type string
          label: "Loan Type",
        },
        {
          key: "borrowerName", // Using this key but rendering based on logic
          label: "Borrower Name",
          // Use render to fallback to clientName if borrowerName is empty
          render: (row) => row.borrowerName || row.clientName || "N/A",
        },
        {
          key: "totalDueAmount", // Using this key but rendering for formatting
          label: "Due Amount",
          // Use render to format as currency
          render: (row) => `$${parseFloat(row.totalDueAmount || 0).toFixed(2)}`,
        },
        {
          key: "defaultDate",
          label: "Default Date",
        },
        {
          key: "npaDate",
          label: "NPA Date",
        },
        {
          key: "actions", // Unique key for actions column
          label: "Actions",
          disableFilter: true, // Typically actions column is not filterable
          render: (row) => ( // 'row' is the loan object for the current row
            <div className="actions-cell"> {/* Container for buttons */}
              <button className="view-btn"><MdOutlineAssignmentInd /></button> {/* Existing View button */}
              {/* Pass the row object (the loan) to the edit handler */}
              <IconButton type="edit" onClick={() => handleEditLoan(row)} />
              {/* Pass the row ID (loan.id) to the delete handler */}
              {/* <IconButton type="delete" onClick={() => handleDeleteLoan(row.id)} /> */}
            </div>
          ),
        },
      ];


    return (
        <Layout>
            <div className="loans-fullpage-container">
                <div className="loans-header">
                    <h1>Loans</h1>
                    <div className="actions">
                        <button className="btn-outline">Import Loan</button>
                        <button className="btn-outline">Download Template</button>
                        <AddButton text=" Add Loan" onClick={handleAddLoanClick} />
                    </div>
                </div>

                {/* Optional: Add a search input above the grid */}
                {/* <div className="loans-search-bar">
                    <input
                        type="text"
                        placeholder="Search loans..."
                        value={searchQuery}
                        onChange={handleHomepageSearchChange}
                    />
                </div> */}


                {/* Replace the table container with the grid container */}
                <div className="loans-grid-container styled-lookalike"> {/* Use a consistent class name */}
                     {/* Integrate the ReusableGrid component */}
                     <ReusableGrid
                        columns={columns} // Pass the defined columns
                        data={filteredLoans} // Pass the filtered data
                        // Add other relevant props your grid supports (e.g., rowKey="id")
                     />
                </div>

                {isAddLoanPopupVisible && (
                    <div className="lawyer-modal"> {/* Consider renaming this CSS class to something more generic like 'modal-overlay' or 'popup-overlay' */}
                        <div className="lawyer-content"> {/* Consider renaming this CSS class */}
                            <div className="lawyer-header"> {/* Consider renaming this CSS class */}
                                {/* Dynamically set modal title */}
                                <h2>{editingLoanId ? "Edit Loan" : "Add New Loan"}</h2>
                                <button className="close-btn" onClick={handleClosePopup}>
                                    ×
                                </button>
                            </div>

                            <div className="lawyer-body"> {/* Consider renaming this CSS class */}
                                <div className="modal-search-bar"> {/* Consider renaming this CSS class */}
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
                                                <label htmlFor="loanId">Loan ID</label>
                                                <input
                                                    type="text" id="loanId" name="loanId"
                                                    value={newLoanDetails.loanId} onChange={handleInputChange}
                                                    placeholder="Enter Loan ID"
                                                    disabled={!!editingLoanId} // Disable Loan ID input when editing
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
                                             {/* Use loanType state for the select element */}
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
                                                    {/* Add other loan types as needed */}
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

                                <div className="fields-column"> {/* This seems like a layout div, check its CSS */}
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

                                    <div className="bordered-section">
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
                                    </div>

                                    <div className="bordered-section">
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
                                    </div>
                                </div>
                            </div>

                            <div className="lawyer-footer"> {/* Consider renaming this CSS class */}
                                <CancelButton label="Cancel" onClick={handleClosePopup} />
                                <SaveButton label={editingLoanId ? "Update" : "Save "} onClick={handleSaveLoan} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default LoanPage;
