import React from "react";
import "./ReusableCaseStage.css";

export default function ReusableCaseStage({
  steps = [],
  activeStep = 1,
  onStepClick = null,
  showArrow = true,
}) {
  return (
    <div>
      <div className="reusable-case-stage-progress-container">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < activeStep;
          const isActive = stepNumber === activeStep;

          const stepClass = `reusable-case-stage-step-box ${
            isActive
              ? "reusable-case-stage-active"
              : isCompleted
              ? "reusable-case-stage-completed"
              : "reusable-case-stage-upcoming reusable-case-stage-clickable"
          }`;

          const handleClick = () => {
            if (onStepClick) {
              onStepClick(stepNumber);
            }
          };

          return (
            <div
              key={index}
              className={stepClass}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
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
        {steps[activeStep - 1]?.content}
      </div>
    </div>
  );
}
