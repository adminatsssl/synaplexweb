import React, { useState } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './CriminalComplaintContent.css';


const steps = [
  { label: "Initiation" },
  { label: "FIR Filing" },
  { label: "Criminal Investigation & Court Case" },
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

const CriminalComplaintContentContent = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to "Demand Notice Generation" step

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);

  };

  return (
    <div className="CriminalComplaintContent-content-container-top">
      <div className="CriminalComplaintContent-content-container">
         <h4>CASE PROGRESS</h4>
      <div className="CriminalComplaintContent-resuable-content">
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


export default CriminalComplaintContentContent;