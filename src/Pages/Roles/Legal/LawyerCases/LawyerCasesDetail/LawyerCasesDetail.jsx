import React from "react";
import { FaLaptop } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import Layout from "../../../../Layout/Layout.jsx";
import './CaseDetail.css';
import ArbitrationContent from "./Arbitration/ArbitrationContent.jsx";
import SarfaseiContent from "./Sarfasei/SarfaesiContent.jsx";
import ChequeBounceContent from "./ChequeBounce/ChequeBounceContent.jsx";


const LawyerCasesDetail = ({ caseData }) => {
    if (!caseData) return null;

    return (
        <Layout>
            <div className="case-detailpage-container">
                <div className="case-detailpage-topbar-heading">
                    <div className="case-detailpage-topheading">
                        <h2>Case Detail </h2>
                    </div>
                    <div className="case-detailpage-topbuttons">
                        <button><FaFilePdf /></button>
                        <button><FaLaptop /></button>
                    </div>
                </div>
                <div className="case-detailpage-borrowerContainer">
                    <div className="case-detailpage-borrowerContainer-topheading">
                        <p> Borrower: {caseData.Borrower}</p>
                        <p>STATUS : {caseData.Status?.toUpperCase()}</p>
                    </div>

                    <div className="case-detailpage-borrowerContainer-content">
                        <p>CNR No.<br /><strong>{caseData.LoanID}</strong></p>
                        <p>File No.<br /><strong>{caseData.CaseType}</strong> </p>
                        <p>Case Type<br /><strong>{caseData.LoanAmount}</strong> </p>
                        <p>Stage<br /><strong>{caseData.NPADate}</strong> </p>
                        <p>Associated Court<br /><strong> {caseData.Court}</strong> </p>
                        <p>Created On<br /><strong>{caseData.AssignedTo}</strong> </p>
                        <p>Created By<br /><strong>{caseData.Court}</strong> </p>
                        <p>Last Update<br /><strong>{caseData.CreateDate}</strong></p>
                    </div>
                </div>

                <div className="case-detailpage-loanContainer">
                    <div className="case-detailpage-loanContainer-topheading">
                        <p><strong>Loan Details</strong></p>
                    </div>
                    <hr className="case-detailpage-loanContainer-hrline" />
                    <div className="case-detailpage-loanContainer-content">
                        <p>Loan ID<br /><strong>{caseData.LoanID}</strong></p>
                        <p>Amount<br /><strong>{caseData.LoanAmount}</strong> </p>
                        <p>Tenure<br /><strong>{caseData.CaseType}</strong> </p>
                        <p>Annual Interest Rate<br /><strong> 20</strong> </p>
                        <p>Loan Type<br /><strong>Personal Loan</strong> </p>
                        <p>Default Date<br /><strong>{caseData.CreateDate}</strong></p>
                        <p>NPA Date<br /><strong>{caseData.NPADate}</strong> </p>
                    </div>

                </div>
                <div className="Sarfasei-container">
                    {caseData.CaseType?.toLowerCase() === "cheque bounce" && <ChequeBounceContent />}
                    {caseData.CaseType?.toLowerCase() === "sarfaesi" && <SarfaseiContent />}
                    {caseData.CaseType?.toLowerCase() === "arbitration" && <ArbitrationContent />}
                </div>


            </div>
        </Layout>
    );
};

export default LawyerCasesDetail;
