import React, { useState, useEffect } from "react";
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

const stageToStepMap = {
  "Initiation": 1,
  "Demand Notice Generation": 2,
  "Tracking 15-Day Response": 3,
  "Complaint Filing": 4,
  "Court Proceedings": 5,
  "Final Judgement": 6,
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

const ChequeBounceContent = ({ caseId, activeStageName, initialActiveStep  }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [viewedStep, setViewedStep] = useState(initialActiveStep);

  useEffect(() => {
      if (activeStageName) {
        const step = stageToStepMap[activeStageName] || 2;
        setActiveStep(step);
        setViewedStep(step);
      }
    }, [activeStageName]);

  const handleStepClick = (stepNum) => {
    if (stepNum <= activeStep && stepNum !== 1) {
      setViewedStep(stepNum);
    }
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
    <div className="ChequeBounce-content-container-topbar">
      <div className="ChequeBounce-content-container">
        <h4>CASE PROGRESS</h4>
        <div className="ChequeBounce-resuable-content">
          <ReusableCaseStage
            steps={steps}
            activeStep={activeStep}
            viewedStep={viewedStep}
            onStepClick={handleStepClick}
            disabledSteps={getDisabledSteps()}
          />
        </div>

        {viewedStep === 2 && <ChequeBounceDemandNotice onStageComplete={handleStageComplete} />}
        {viewedStep === 3 && <ChequeBounceTrackingResponse onStageComplete={handleStageComplete} />}
        {viewedStep === 4 && <ChequeBounceComplaintFilling onStageComplete={handleStageComplete} />}
        {viewedStep === 5 && <ChequeBounceCourtProceedings onStageComplete={handleStageComplete} />}
        {viewedStep === 6 && <ChequeBounceFinalJudgement onStageComplete={handleStageComplete} />}
        {viewedStep === 7 && <CaseDetailClose onStageComplete={handleStageComplete} />}
      </div>

      <CaseHistoryAccordion data={dummyData} />
    </div>
  );
};

export default ChequeBounceContent;
