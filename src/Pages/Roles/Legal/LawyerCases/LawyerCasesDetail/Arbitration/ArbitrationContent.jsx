import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReusableCaseStage from "../ReusableCaseStage";
import './ArbitrationContent.css';
import ArbitrationNoticeGeneration from "./Tabs/NoticeGeneration/ArbitrationNoticeGeneration";
import ArbitratorAppointment from "./Tabs/ArbitratorAppointment/ArbitratorAppointment";
import ArbitrationHearing from "./Tabs/ArbitrationHearing/ArbitrationHearing";
import ArbitrationResolutionAndAward from "./Tabs/Resolution&Award/ArbitrationResolutionAndAward";
import ArbitrationExecutionAndAward from "./Tabs/Execution&Award/ArbitrationExecutionAndAward";
import CaseDetailClose from "../Sarfasei/Tabs/Close/CaseDetailClose.jsx";
import CaseHistoryAccordion from "../CaseHistory.jsx";

const steps = [
  { label: "Initiation" },
  { label: "Notice Generation" },
  { label: "Arbitrator Appointment" },
  { label: "Arbitration Hearing Scheduling" },
  { label: "Resolution and Award" },
  { label: "Execution and Award" },
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

const ArbitrationContent = ({ caseId, initialActiveStep = 2 }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [viewedStep, setViewedStep] = useState(initialActiveStep);

  useEffect(() => {
    setActiveStep(initialActiveStep);
    setViewedStep(initialActiveStep);
  }, [initialActiveStep]);

  const handleStepClick = (stepNum) => {
    if (stepNum === 1 || stepNum > activeStep) return;
    setViewedStep(stepNum);
  };

  const handleStageComplete = () => {
    if (activeStep < steps.length) {
      const next = activeStep + 1;
      setActiveStep(next);
      setViewedStep(next);
    }
  };

  const getDisabledSteps = () => {
    const disabled = [1]; // Disable "Initiation"
    for (let i = activeStep + 1; i <= steps.length; i++) {
      disabled.push(i);
    }
    return disabled;
  };

  if (!caseId) {
    console.error("No caseId provided to ArbitrationContent");
    return null;
  }

  return (
    <div className="Arbitration-content-container-top">
      <div className="Arbitration-content-container">
        <h4>CASE PROGRESS</h4>
        <div className="Arbitration-resuable-content">
          <ReusableCaseStage
            steps={steps}
            activeStep={activeStep}
            viewedStep={viewedStep}
            onStepClick={handleStepClick}
            disabledSteps={getDisabledSteps()}
          />
        </div>

        {viewedStep === 2 && (
          <ArbitrationNoticeGeneration caseId={caseId} onStageComplete={handleStageComplete} />
        )}
        {viewedStep === 3 && (
          <ArbitratorAppointment caseId={caseId} onStageComplete={handleStageComplete} />
        )}
        {viewedStep === 4 && (
          <ArbitrationHearing caseId={caseId} onStageComplete={handleStageComplete} />
        )}
        {viewedStep === 5 && (
          <ArbitrationResolutionAndAward caseId={caseId} onStageComplete={handleStageComplete} />
        )}
        {viewedStep === 6 && (
          <ArbitrationExecutionAndAward caseId={caseId} onStageComplete={handleStageComplete} />
        )}
        {viewedStep === 7 && (
          <CaseDetailClose caseId={caseId} onStageComplete={handleStageComplete} />
        )}
      </div>

      <CaseHistoryAccordion data={dummyData} />
    </div>
  );
};

ArbitrationContent.propTypes = {
  caseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialActiveStep: PropTypes.number
};

export default ArbitrationContent;
