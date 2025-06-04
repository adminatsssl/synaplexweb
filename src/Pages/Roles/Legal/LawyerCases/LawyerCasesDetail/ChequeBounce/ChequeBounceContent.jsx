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
import PropTypes from 'prop-types';

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

const ChequeBounceContent = ({ caseId }) => {
  const [activeStep, setActiveStep] = useState(2); 

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
  };

  const handleStageComplete = () => {
    setActiveStep(prev => prev + 1);
  };

  if (!caseId) {
    console.error('No caseId provided to ChequeBounceContent');
    return null;
  }

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

        {activeStep === 2 && (
          <ChequeBounceDemandNotice 
            caseId={caseId} 
            onStageComplete={handleStageComplete}
          />
        )}
        {activeStep === 3 && (
          <ChequeBounceTrackingResponse 
            caseId={caseId}
            onStageComplete={handleStageComplete}
          />
        )}
        {activeStep === 4 && <ChequeBounceComplaintFilling caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {activeStep === 5 && <ChequeBounceCourtProceedings  caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {activeStep === 6 && <ChequeBounceFinalJudgement caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {activeStep === 7 && <CaseDetailClose  caseId={caseId}
            onStageComplete={handleStageComplete} />}
      </div>

      <CaseHistoryAccordion data={dummyData} />
    </div>
  );
};

ChequeBounceContent.propTypes = {
  caseId: PropTypes.number.isRequired
};

export default ChequeBounceContent;
