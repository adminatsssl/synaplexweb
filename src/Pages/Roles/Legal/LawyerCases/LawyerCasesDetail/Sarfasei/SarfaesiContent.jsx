import React, { useState, useEffect } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './SarfaesiContent.css';
import DemandNoticeSarfasei from "./Tabs/DemandNoticeSarfasei";
import SarfaesiTrackingResponse from "./Tabs/TrackingResponse/SarfaesiTrackingResponse.jsx";
import SarfaesiPossessionNotice from "./Tabs/PossessionNotice/SarfaesiPossessionNotice.jsx";
import SarfaesiAssetValuation from "./Tabs/AssetValuation/SarfaesiAssetValuation.jsx";
import SarfaesiAuctionRecovery from "./Tabs/AuctionRecovery/SarfaesiAuctionRecovery.jsx";
import CaseDetailClose from "./Tabs/Close/CaseDetailClose.jsx";
import CaseHistoryAccordion from "../CaseHistory.jsx";
import PropTypes from 'prop-types';

const steps = [
  { label: "Initiation" },
  { label: "Demand Notice Generation" },
  { label: "Tracking 60-Day Response" },
  { label: "Possession Notice" },
  { label: "Asset Valuation & Auction" },
  { label: "Auction & Recovery" },
  { label: "Closure" },
];

const dummyData = [
  {
    auditDate: "2025-01-01",
    actionType: "Update",
    changedDate: "2025-01-01",
    performedBy: "John Doe",
    fieldChanged: "Status",
    oldValue: "Pending",
    newValue: "Approved",
  },
];

const SarfaseiContent = ({ caseId, initialActiveStep = 2 }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  // Update activeStep when initialActiveStep changes
  useEffect(() => {
    setActiveStep(initialActiveStep);
  }, [initialActiveStep]);

  const handleStepClick = (stepNum) => {
    // Prevent clicking on step 1 (Initiation)
    if (stepNum === 1) {
      return;
    }
    setActiveStep(stepNum);
  };

  const handleStageComplete = () => {
    // Move to next stage
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  if (!caseId) {
    console.error('No caseId provided to SarfaseiContent');
    return null;
  }

  return (
    <div className="Sarfasei-content-container-topbar">
      <div className="Sarfasei-content-container">
        <h4>CASE PROGRESS</h4>
        <div className="Sarfasei-resuable-content">
          <ReusableCaseStage
            steps={steps}
            activeStep={activeStep}
            onStepClick={handleStepClick}
            disabledSteps={[1]} // Disable step 1 (Initiation)
          />
        </div>

        {activeStep === 2 && (
          <DemandNoticeSarfasei 
            caseId={caseId} 
            onStageComplete={handleStageComplete} 
          />
        )}
        {activeStep === 3 && (
          <SarfaesiTrackingResponse 
            caseId={caseId} 
            onStageComplete={handleStageComplete} 
          />
        )}
        {activeStep === 4 && (
          <SarfaesiPossessionNotice 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {activeStep === 5 && (
          <SarfaesiAssetValuation 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {activeStep === 6 && (
          <SarfaesiAuctionRecovery 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {activeStep === 7 && (
          <CaseDetailClose 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
      </div>
      <>
        <CaseHistoryAccordion data={dummyData} />
      </>
    </div>
  );
};

SarfaseiContent.propTypes = {
  caseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialActiveStep: PropTypes.number
};

export default SarfaseiContent;
