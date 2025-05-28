import React, { useState, useEffect } from "react";
import "./LoanPage.css";
import Layout from "../../../Layout/Layout";
import IconButton from "../../../ReusableComponents/IconButton";
import AddButton from "../../../ReusableComponents/AddButton";
import { PiCertificate } from "react-icons/pi";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";
import AddUserCases from "../Cases/UserAddCases";
import LoanPopup from "./LoanPopup"; // Import the separated popup component

const LoanPage = () => {
    const [loanData, setLoanData] = useState([]);
    const [showLoanCase, setShowLoanCase] = useState(false);
    const [isAddLoanPopupVisible, setIsAddLoanPopupVisible] = useState(false);
    const [editingLoanId, setEditingLoanId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLoan, setSelectedLoan] = useState(null);

    useEffect(() => {
        fetch("/api/api/loans")
            .then((res) => res.json())
            .then((response) => {
                if (response.status === "SUCCESS" && Array.isArray(response.data)) {
                    const mappedLoans = response.data.map((item) => ({
                        id: item.id,
                        loanNumber: item.loanNumber,
                        type: item.loanType,
                        borrowerName: item.borrower.name,
                        totalDueAmount: item.loanAmount - item.disbursedAmount,
                        defaultDate: item.lastPaymentDate,
                        npaDate: item.nextDueDate,
                        tenure: item.loanTenure,
                        clientName: item.borrower.name,
                        lastPaidAmount: null,
                        annualInterestRate: item.interestRate,
                        lastPaidDate: item.lastPaymentDate,
                        interestCharges: null,
                        numberOfEmisPending: null,
                        outstandingAmount: null,
                        disbursedAmount: item.disbursedAmount,
                        emiAmount: item.emiAmount,
                        borrowerMobile: item.borrower.contactNumber,
                        borrowerEmail: item.borrower.email,
                        tenantId: "",
                        tenantName: "",
                        panNumber: "",
                        gstNumber: "",
                        fprName: "",
                        fprEmail: "",
                        fprMobile: "",
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
        setEditingLoanId(null);
        setIsAddLoanPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsAddLoanPopupVisible(false);
        setEditingLoanId(null);
    };

    const handleSaveLoan = (newLoanDetails) => {
        if (editingLoanId) {
            setLoanData((prev) =>
                prev.map((loan) =>
                    loan.id === editingLoanId ? { ...loan, ...newLoanDetails, type: newLoanDetails.loanType, id: editingLoanId } : loan
                )
            );
        } else {
            const newLoanEntry = {
                id: newLoanDetails.loanNumber,
                type: newLoanDetails.loanType,
                borrowerName: newLoanDetails.borrowerName || newLoanDetails.clientName || "N/A",
                totalDueAmount: newLoanDetails.totalDueAmount,
                defaultDate: newLoanDetails.defaultDate,
                npaDate: newLoanDetails.npaDate,
                ...newLoanDetails,
            };
            setLoanData((prev) => [...prev, newLoanEntry]);
        }
        handleClosePopup();
    };

    const handleEditLoan = (loan) => {
        setEditingLoanId(loan.id);
        setIsAddLoanPopupVisible(true);
    };

    const handleHomepageSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleOpenLoanCase = (loan) => {
        setSelectedLoan(loan);
        setShowLoanCase(true);
    };

    const handleCloseLoanCase = () => {
        setShowLoanCase(false);
        setSelectedLoan(null);
    };

    const filteredLoans = loanData.filter((loan) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            (loan.borrowerName || "").toLowerCase().includes(searchTerm) ||
            (loan.clientName || "").toLowerCase().includes(searchTerm) ||
            (loan.id || "").toLowerCase().includes(searchTerm) ||
            (loan.tenantName || "").toLowerCase().includes(searchTerm) ||
            (loan.tenantId || "").toLowerCase().includes(searchTerm) ||
            (loan.gstNumber || "").toLowerCase().includes(searchTerm) ||
            (loan.panNumber || "").toLowerCase().includes(searchTerm) ||
            (loan.fprName || "").toLowerCase().includes(searchTerm) ||
            (loan.fprEmail || "").toLowerCase().includes(searchTerm) ||
            (loan.fprMobile || "").toLowerCase().includes(searchTerm) ||
            (loan.type || "").toLowerCase().includes(searchTerm)
        );
    });

    const columns = [
        {
            key: "loanNumber",
            label: "Loan Number",
        },
        {
            key: "type",
            label: "Loan Type",
        },
        {
            key: "borrowerName",
            label: "Borrower Name",
            render: (row) => row.borrowerName || row.clientName || "N/A",
        },
        {
            key: "totalDueAmount",
            label: "Due Amount",
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
            key: "actions",
            label: "Actions",
            disableFilter: true,
            render: (row) => (
                <div className="actions-cell">
                    <button className="certificate-view-btn" onClick={() => handleOpenLoanCase(row)}><PiCertificate /></button>
                    <IconButton type="edit" onClick={() => handleEditLoan(row)} />
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

                <div className="loans-grid-container styled-lookalike">
                    <ReusableGrid
                        columns={columns}
                        data={filteredLoans}
                    />
                </div>

                {isAddLoanPopupVisible && (
                    <LoanPopup
                        editingLoanId={editingLoanId}
                        onClose={handleClosePopup}
                        onSave={handleSaveLoan}
                        initialData={editingLoanId ? 
                            loanData.find(loan => loan.id === editingLoanId) || {} : 
                            {
                                loanNumber: "",
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
                            }
                        }
                    />
                )}

                {showLoanCase && (
                    <div className="modal-overlay-usercase">
                        <div className="modal-content-usercase-userrole">
                            <AddUserCases 
                                onClose={handleCloseLoanCase} 
                                initialData={{
                                    loanId: selectedLoan.loanNumber,
                                    borrower: selectedLoan.borrowerName,
                                    loanType: selectedLoan.type,
                                    loanAmount: selectedLoan.totalDueAmount,
                                    defaultDate: selectedLoan.defaultDate,
                                    npaDate: selectedLoan.npaDate,
                                }}
                            />
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