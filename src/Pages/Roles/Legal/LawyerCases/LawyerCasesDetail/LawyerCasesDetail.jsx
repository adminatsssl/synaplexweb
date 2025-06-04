import React, { useEffect, useState, useRef } from "react";
import { FaLaptop } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import Layout from "../../../../Layout/Layout.jsx";
import './CaseDetail.css';
import ArbitrationContent from "./Arbitration/ArbitrationContent.jsx";
import SarfaseiContent from "./Sarfasei/SarfaesiContent.jsx";
import ChequeBounceContent from "./ChequeBounce/ChequeBounceContent.jsx";

// Map stage names to step numbers
const stageToStepMap = {
    'sarfaesi': {
        'Initiation': 1,
        'Demand Notice Generation': 2,
        'Tracking 60-Day Response': 3,
        'Possession Notice': 4,
        'Asset Valuation & Auction': 5,
        'Auction & Recovery': 6,
        'Closure': 7
    },
    'cheque bounce': {
        'Initiation': 1,
        'Demand Notice Generation': 2,
        'Tracking 15-Day Response': 3,
        'Complaint Filling': 4,
        'Court Proceedings': 5,
        'Final Judgment': 6,
        'Closure': 7
    },
    'arbitration': {
        'Initiation': 1,
        'Notice Generation': 2,
        'Arbitrator Appointment': 3,
        'Arbitration Hearing Scheduling': 4,
        'Resolution and Award': 5,
        'Execution and Award': 6,
        'Closure': 7
    }
};

const LawyerCasesDetail = ({ caseData, lastUpdateTime }) => {
    const [prevStageName, setPrevStageName] = useState(null);
    const [stageUpdated, setStageUpdated] = useState(false);
    const lastStageRef = useRef(null);

    // Get the active step number based on the case type and active stage name
    const getActiveStepNumber = () => {
        if (!caseData?.CaseType || !caseData?.activeStageName) return 2; // Default to step 2
        
        const caseType = caseData.CaseType.toLowerCase();
        const stageMap = stageToStepMap[caseType];
        
        if (!stageMap) return 2;

        // Try to find exact match first
        let stepNumber = stageMap[caseData.activeStageName];
        
        // If no exact match, try to find partial match
        if (!stepNumber) {
            const stageName = Object.keys(stageMap).find(key => 
                caseData.activeStageName.includes(key) || key.includes(caseData.activeStageName)
            );
            stepNumber = stageName ? stageMap[stageName] : 2;
        }

        return stepNumber || 2;
    };

    useEffect(() => {
        if (!caseData?.activeStageName) return;

        // Check if this is a real stage update
        if (lastStageRef.current !== caseData.activeStageName) {
            setStageUpdated(true);
            setPrevStageName(lastStageRef.current);
            lastStageRef.current = caseData.activeStageName;

            // Reset the update indicator after 3 seconds
            const timer = setTimeout(() => {
                setStageUpdated(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [caseData?.activeStageName, lastUpdateTime]);

    if (!caseData) return null;

    // Debug: Log the caseData structure
    console.log('Case Data:', caseData);

    // Extract and ensure caseId is a number
    const caseId = parseInt(caseData.CaseID || caseData.id || '0', 10);

    // Validate caseId
    if (!caseId) {
        console.error('Invalid or missing case ID:', caseData);
        return <div>Error: Invalid case ID</div>;
    }

    const activeStepNumber = getActiveStepNumber();

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
                        <p>Stage<br />
                            <strong className={stageUpdated ? "stage-update-highlight" : ""}>
                                {caseData.activeStageName}

                            </strong>
                        </p>
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
                        <p>Annual Interest Rate<br /><strong>20</strong> </p>
                        <p>Loan Type<br /><strong>Personal Loan</strong> </p>
                        <p>Default Date<br /><strong>{caseData.CreateDate}</strong></p>
                        <p>NPA Date<br /><strong>{caseData.NPADate}</strong> </p>
                    </div>
                </div>

                <div className="Sarfasei-container">
                    {caseData.CaseType?.toLowerCase() === "cheque_bounce" && 
                        <ChequeBounceContent 
                            caseId={caseId} 
                            initialActiveStep={activeStepNumber}
                        />
                    }
                    {caseData.CaseType?.toLowerCase() === "sarfaesi" && 
                        <SarfaseiContent 
                            caseId={caseId} 
                            initialActiveStep={activeStepNumber}
                        />
                    }
                    {caseData.CaseType?.toLowerCase() === "arbitration" && 
                        <ArbitrationContent 
                            caseId={caseId} 
                            initialActiveStep={activeStepNumber}
                        />
                    }
                </div>
            </div>
        </Layout>
    );
};

export default LawyerCasesDetail;
