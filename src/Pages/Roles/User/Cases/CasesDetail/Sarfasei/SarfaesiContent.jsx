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

const steps = [
  { label: "Initiation" },
  { label: "Demand Notice Generation" },
  { label: "Tracking 60-Day Response" },
  { label: "Possession Notice" },
  { label: "Asset Valuation & Auction" },
  { label: "Auction & Recovery" },
  { label: "Closure" },
];

const stageToStepMap = {
  "Initiation": 1,
  "Demand Notice Generation": 2,
  "Tracking 60-Day Response": 3,
  "Possession Notice": 4,
  "Asset Valuation & Auction": 5,
  "Auction & Recovery": 6,
  "Closure": 7
};

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

const SarfaseiContent = ({ caseId, activeStageName, initialActiveStep }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [viewedStep, setViewedStep] = useState(initialActiveStep);

  // 🔄 Update step based on dynamic stage
  useEffect(() => {
    if (activeStageName) {
      const step = stageToStepMap[activeStageName] || 2;
      setActiveStep(step);
      setViewedStep(step);
    }
  }, [activeStageName]);

  const handleStepClick = (stepNum) => {
    setViewedStep(stepNum);
  };

  const handleStageComplete = () => {
    if (activeStep < steps.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setViewedStep(nextStep);
    }
  };

  const getDisabledSteps = () => {
    const disabledSteps = [1];
    for (let i = activeStep + 1; i <= steps.length; i++) {
      disabledSteps.push(i);
    }
    return disabledSteps;
  };

  return (
    <div className="Sarfasei-content-container-topbar">
      <div className="Sarfasei-content-container">
        <h4>CASE PROGRESS</h4>
        <div className="Sarfasei-resuable-content">
          <ReusableCaseStage
            steps={steps}
            activeStep={activeStep}
            viewedStep={viewedStep}
            onStepClick={handleStepClick}
            disabledSteps={getDisabledSteps()}
          />
        </div>

        {viewedStep === 2 && <DemandNoticeSarfasei onStageComplete={handleStageComplete} />}
        {viewedStep === 3 && <SarfaesiTrackingResponse onStageComplete={handleStageComplete} />}
        {viewedStep === 4 && <SarfaesiPossessionNotice onStageComplete={handleStageComplete} />}
        {viewedStep === 5 && <SarfaesiAssetValuation onStageComplete={handleStageComplete} />}
        {viewedStep === 6 && <SarfaesiAuctionRecovery onStageComplete={handleStageComplete} />}
        {viewedStep === 7 && <CaseDetailClose onStageComplete={handleStageComplete} />}
      </div>

      <CaseHistoryAccordion data={dummyData} />
    </div>
  );
};

export default SarfaseiContent;
