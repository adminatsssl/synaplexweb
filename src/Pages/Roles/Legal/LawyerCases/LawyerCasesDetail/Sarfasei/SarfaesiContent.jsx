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
  // Keep track of both the active stage and the currently viewed stage
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [viewedStep, setViewedStep] = useState(initialActiveStep);

  // Update both active and viewed step when initialActiveStep changes
  useEffect(() => {
    setActiveStep(initialActiveStep);
    setViewedStep(initialActiveStep);
  }, [initialActiveStep]);

  const handleStepClick = (stepNum) => {
    // Prevent clicking on step 1 (Initiation)
    if (stepNum === 1) {
      return;
    }
    
    // Prevent accessing future stages beyond the active stage
    if (stepNum > activeStep) {
      return;
    }
    
    // Only update the viewed step, not the active step
    setViewedStep(stepNum);
  };

  const handleStageComplete = () => {
    // Move both active and viewed step forward
    if (activeStep < steps.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setViewedStep(nextStep);
    }
  };

  // Calculate disabled steps - includes step 1 and all steps beyond current active step
  const getDisabledSteps = () => {
    const disabledSteps = [1]; // Always disable step 1 (Initiation)
    for (let i = activeStep + 1; i <= steps.length; i++) {
      disabledSteps.push(i);
    }
    return disabledSteps;
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
            activeStep={activeStep}     // This controls the dark blue indicator
            viewedStep={viewedStep}     // This controls which content is shown
            onStepClick={handleStepClick}
            disabledSteps={getDisabledSteps()}
          />
        </div>

        {viewedStep === 2 && (
          <DemandNoticeSarfasei 
            caseId={caseId} 
            onStageComplete={handleStageComplete} 
          />
        )}
        {viewedStep === 3 && (
          <SarfaesiTrackingResponse 
            caseId={caseId} 
            onStageComplete={handleStageComplete} 
          />
        )}
        {viewedStep === 4 && (
          <SarfaesiPossessionNotice 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {viewedStep === 5 && (
          <SarfaesiAssetValuation 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {viewedStep === 6 && (
          <SarfaesiAuctionRecovery 
            caseId={caseId}
            onStageComplete={handleStageComplete} 
          />
        )}
        {viewedStep === 7 && (
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
