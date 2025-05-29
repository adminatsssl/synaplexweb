import React, { useState } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './ChequeBounceContent.css';
import ChequeBounceDemandNotice from "./Tabs/DemandNotice/ChequeBounceDemandNotice";
import ChequeBounceTrackingResponse from "./Tabs/TrackingResponse/ChequeBounceTrackingResponse";
import ChequeBounceComplaintFilling from "./Tabs/ComplaintFilling/ChequeBounceComplaintFilling";
import ChequeBounceCourtProceedings from "./Tabs/CourtProceeding/ChequeBounceCourtProceedings";
import ChequeBounceFinalJudgement from "./Tabs/FinalJudgement/ChequeBounceFinalJudgement";
import CaseDetailClose from "../Sarfasei/Tabs/Close/CaseDetailClose";
import CaseHistoryAccordion from "../CaseHistory.jsx";


const steps = [
  { label: "Initiation" },
  { label: "Demand Notice Generation" },
  { label: "Tracking 15-Day Response" },
  { label: "Complaint Filling" },
  { label: "Court Proceedings" },
  { label: "Final Judgment" },
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

const ChequeBounceContent = () => {
  const [activeStep, setActiveStep] = useState(2); 

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
    // console.log("Clicked step:", stepNum);
  };

  return (
    <div className="ChequeBounce-content-container-topbar">
      <div className="ChequeBounce-content-container">
        <h4>CASE PROGRESS</h4>
      <div className="ChequeBounce-resuable-content">
        <ReusableCaseStage
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Conditionally render the DemandNoticeSarfasei component */}
      {activeStep === 2 && <ChequeBounceDemandNotice />}
      {activeStep === 3 && <ChequeBounceTrackingResponse />}
      {activeStep === 4 && <ChequeBounceComplaintFilling />}
      {activeStep === 5 && <ChequeBounceCourtProceedings />}
      {activeStep === 6 && <ChequeBounceFinalJudgement />}
      {activeStep === 7 && <CaseDetailClose />}

      </div>
      <>
      <CaseHistoryAccordion data={dummyData} />
      </>

    </div>
  );
};

export default ChequeBounceContent;
