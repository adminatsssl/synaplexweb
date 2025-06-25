import React from "react";
import "./ReusableCaseStage.css";

export default function ReusableCaseStage({
  steps = [],
  activeStep = 1,
  viewedStep = null,
  onStepClick = null,
  showArrow = true,
  disabledSteps = [],
}) {
  const currentlyViewedStep = viewedStep || activeStep;

  return (
    <div>
      <div className="reusable-case-stage-progress-container">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < activeStep;
          const isActive = stepNumber === activeStep;
          const isViewed = stepNumber === currentlyViewedStep;
          const isDisabled = disabledSteps.includes(stepNumber);

          const stepClass = `
            reusable-case-stage-step-box
            ${isActive ? "reusable-case-stage-active" : ""}
            ${isCompleted ? "reusable-case-stage-completed" : ""}
            ${!isCompleted && !isActive ? "reusable-case-stage-upcoming" : ""}
            ${!isDisabled ? "reusable-case-stage-clickable" : "reusable-case-stage-disabled"}
          `.replace(/\s+/g, ' ').trim();

          const handleClick = () => {
            if (!isDisabled && onStepClick) {
              onStepClick(stepNumber);
            }
          };

          return (
            <div
              key={index}
              className={stepClass}
              onClick={handleClick}
              style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
            >
              <div className="reusable-case-stage-step-title">
                Step {stepNumber}
              </div>
              <div className="reusable-case-stage-step-label">
                {typeof step === "string" ? step : step.label}
              </div>
              {isActive && showArrow && (
                <div className="reusable-case-stage-arrow-down"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="reusable-case-stage-content">
        {steps[currentlyViewedStep - 1]?.content}
      </div>
    </div>
  );
}
