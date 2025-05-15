import React, { useState } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './SarfaseiContent.css';
import DemandNoticeSarfasei from "./Tabs/DemandNoticeSarfaseo";

const steps = [
  { label: "Initiation" },
  { label: "Demand Notice Generation" },
  { label: "Tracking 60-Day Response" },
  { label: "Possession Notice" },
  { label: "Asset Valuation & Auction" },
  { label: "Auction & Recovery" },
  { label: "Closure" },
];

const SarfaseiContent = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to "Demand Notice Generation" step

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
    console.log("Clicked step:", stepNum);
  };

  return (
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
      {activeStep === 2 && <DemandNoticeSarfasei />}
    </div>
  );
};

export default SarfaseiContent;
