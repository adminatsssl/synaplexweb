import React, { useState } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './LawyerDRTContent.css';


const steps = [
  { label: "Initiation" },
  { label: "Document Preparation & Filing" },
  { label: "Hearings & Recovery Certificates" },
  { label: "Order Issuance" },
  { label: "Execution" },
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

const LawyerDRTContent = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to "Demand Notice Generation" step

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);

  };

  return (
    <div className="DRT-content-container-top">
      <div className="DRT-content-container">
         <h4>CASE PROGRESS</h4>
      <div className="DRT-resuable-content">
        <ReusableCaseStage
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

    
      {/* {activeStep === 2 && <ArbitrationNoticeGeneration  />}
      {activeStep === 3 && <ArbitratorAppointment  />}
      {activeStep === 4 && <ArbitrationHearing/>}
      {activeStep === 5 && <ArbitrationResolutionAndAward/>}
      {activeStep === 6 && <ArbitrationExecutionAndAward/>}
      {activeStep === 7 && <CaseDetailClose/>} */}

      

      </div>
      <>
      <CaseHistoryAccordion data={dummyData} />
      </>
     


    </div>
    
  );
};


export default LawyerDRTContent;