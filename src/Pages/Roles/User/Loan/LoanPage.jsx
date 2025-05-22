import React, { useState } from "react";
import "./LoanPage.css"; // Ensure this CSS file is linked
import Layout from "../../../Layout/Layout"; // Assuming Layout component path
import IconButton from "../../../ReusableComponents/IconButton";
import CancelButton from "../../../ReusableComponents/CancelButton"; // Assuming path
import SaveButton from "../../../ReusableComponents/SaveButton";
import AddButton from "../../../ReusableComponents/AddButton";
import { PiCertificate } from "react-icons/pi";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid"; // Adjust path as needed
import AddUserCases from "../Cases/UserAddCases";
import { useEffect } from "react";


const LoanPage = () => {

    const [loanData, setLoanData] = useState([]);
    const [showLoanCase, setShowLoanCase] = useState(false);
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

useEffect(() => {
    fetch("/api/api/loans")
        .then((res) => res.json())
        .then((response) => {
            if (response.status === "SUCCESS" && Array.isArray(response.data)) {
                const mappedLoans = response.data.map((item) => ({
                    id: item.id,
                    loanId: item.loanNumber,
                    type: item.loanType,
                    borrowerName: item.borrower.name,
                    totalDueAmount: item.loanAmount - item.disbursedAmount, // or calculate properly
                    defaultDate: item.lastPaymentDate,
                    npaDate: item.nextDueDate,
                    tenure: item.loanTenure,
                    clientName: item.borrower.name,
                    lastPaidAmount: null, // Not available in API
                    annualInterestRate: item.interestRate,
                    lastPaidDate: item.lastPaymentDate,
                    interestCharges: null, // Not available in API
                    numberOfEmisPending: null, // Not available in API
                    outstandingAmount: null, // Not available in API
                    disbursedAmount: item.disbursedAmount,
                    emiAmount: item.emiAmount,
                    borrowerMobile: item.borrower.contactNumber,
                    borrowerEmail: item.borrower.email,
                    tenantId: "", // Not available
                    tenantName: "", // Not available
                    panNumber: "", // Not available
                    gstNumber: "", // Not available
                    fprName: "", // Not available
                    fprEmail: "", // Not available
                    fprMobile: "", // Not available
                }));
                setLoanData(mappedLoans);
            } else {
                console.error("Invalid data format", response);
            }
        })
        .catch((error) => {
            console.error("Error fetching loans:", error);
        });
}, []);

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
                    <button className="certificate-view-btn" onClick={handleOpenLoanCase}><PiCertificate /></button> {/* Existing View button */}
                    {/* Pass the row object (the loan) to the edit handler */}
                    <IconButton type="edit" onClick={() => handleEditLoan(row)} />
                    {/* Pass the row ID (loan.id) to the delete handler */}
                    {/* <IconButton type="delete" onClick={() => handleDeleteLoan(row.id)} /> */}
                </div>
            ),
        },
    ];


    const handleOpenLoanCase = () => {
        setShowLoanCase(true);
    };

    const handleCloseLoanCase = () => {
        setShowLoanCase(false);
    };


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
                {showLoanCase && (
          <div className="modal-overlay-usercase">
            <div className="modal-content-usercase-userrole">
              <AddUserCases  onClose={handleCloseLoanCase} />
              <button onClick={handleCloseLoanCase} className="close-button-usercases">
                X
              </button>
            </div>
          </div>
        )}
 
            </div>
        </Layout>
    );
};

export default LoanPage;
