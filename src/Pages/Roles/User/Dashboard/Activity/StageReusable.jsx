// StageReusable.js
import React from "react";
import "./ActivityStage.css";

export default function StageBar({ stages = [], activeStage, onStageClick }) {
  return (
    <div className="stage-bar">
      {stages.map((stage, idx) => {
        const isActive = activeStage?.label === stage.label;
        const isDisabled = idx === 0; // Disable first stage

        return (
          <div
            key={idx}
            className={`stage-item ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
            onClick={() => {
              if (!isDisabled) {
                onStageClick(stage);
              }
            }}
          >
            <div className="stage-label">{stage.label}</div>
            <div
              className={`stage-count ${
                isActive && stage.count >= 0 ? "red" : "grey"
              }`}
            >
              {stage.count}
            </div>
          </div>
        );
      })}
    </div>
  );
}
