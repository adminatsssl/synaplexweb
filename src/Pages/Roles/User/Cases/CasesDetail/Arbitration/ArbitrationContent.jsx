import React, { useState } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './ArbitrationContent.css';
import ArbitrationNoticeGeneration from "./Tabs/NoticeGeneration/ArbitrationNoticeGeneration";
import ArbitratorAppointment from "./Tabs/ArbitratorAppointment/ArbitratorAppointment";
import ArbitrationHearing from "./Tabs/ArbitrationHearing/ArbitrationHearing";
import ArbitrationResolutionAndAward from "./Tabs/Resolution&Award/ArbitrationResolutionAndAward";
import ArbitrationExecutionAndAward from "./Tabs/Execution&Award/ArbitrationExecutionAndAward";
import CaseDetailClose from "../Sarfasei/Tabs/Close/CaseDetailClose.jsx"
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

const ArbitrationContent = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to "Demand Notice Generation" step

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
    console.log("Clicked step:", stepNum);
  };

  return (
    <div className="Arbitration-content-container-top">
      <div className="Arbitration-content-container">
         <h4>CASE PROGRESS</h4>
      <div className="Arbitration-resuable-content">
        <ReusableCaseStage
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

    
      {activeStep === 2 && <ArbitrationNoticeGeneration  />}
      {activeStep === 3 && <ArbitratorAppointment  />}
      {activeStep === 4 && <ArbitrationHearing/>}
      {activeStep === 5 && <ArbitrationResolutionAndAward/>}
      {activeStep === 6 && <ArbitrationExecutionAndAward/>}
      {activeStep === 7 && <CaseDetailClose/>}

      

      </div>
      <>
      <CaseHistoryAccordion data={dummyData} />
      </>
     


    </div>
    
  );
};

export default ArbitrationContent;
