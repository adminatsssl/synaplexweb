import React, { useState } from "react";
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

const SarfaseiContent = ({ caseId }) => {
  const [activeStep, setActiveStep] = useState(2); // Default to "Demand Notice Generation" step

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
    console.log("Clicked step:", stepNum);
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
          />
        </div>

        {/* Conditionally render the DemandNoticeSarfasei component */}
        {activeStep === 2 && <DemandNoticeSarfasei caseId={caseId} />}
        {activeStep === 3 && <SarfaesiTrackingResponse />}
        {activeStep === 4 && <SarfaesiPossessionNotice />}
        {activeStep === 5 && <SarfaesiAssetValuation />}
        {activeStep === 6 && <SarfaesiAuctionRecovery />}
        {activeStep === 7 && <CaseDetailClose />}
      </div>

      <>
        <CaseHistoryAccordion data={dummyData} />
      </>
    </div>
  );
};

export default SarfaseiContent;
