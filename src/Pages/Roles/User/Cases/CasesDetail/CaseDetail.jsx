import React from "react";
import { FaLaptop } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import Layout from "../../../../Layout/Layout.jsx";
import './CaseDetail.css';

const CasesDetail = ({ caseData }) => {
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
                        <p><strong>Borrower:</strong> {caseData.Borrower}</p>
                        <p><strong>Status:</strong> {caseData.Status}</p>
                    </div>

                    <div className="case-detailpage-borrowerContainer-content">
                        <p>Loan ID<br/>{caseData.LoanID}</p>
                        <p>Case Type<br/> {caseData.CaseType}</p>
                        <p>Loan Amount<br/> {caseData.LoanAmount}</p>
                        <p>NPA Date<br/> {caseData.NPADate}</p>
                        <p>Created<br/> {caseData.CreateDate}</p>
                        <p>Assigned To<br/> {caseData.AssignedTo}</p>
                        <p>Court<br/> {caseData.Court}</p>
                        <p>Court<br/> {caseData.Court}</p>

                    </div>

                </div>




            </div>
        </Layout>
    );
};

export default CasesDetail;
