// StageReusable.js
import React from "react";
import "./ActivityStage.css";

export default function StageBar({ stages = [], activeStage, onStageClick }) {
  return (
    <div className="stage-bar">
      {stages.map((stage, idx) => (
        <div
          key={idx}
          className={`stage-item ${
            activeStage?.label === stage.label ? "active" : ""
          }`}
          onClick={() => onStageClick(stage)}
        >
          <div className="stage-label">{stage.label}</div>
          <div
            className={`stage-count ${
              activeStage?.label === stage.label && stage.count >= 0
                ? "red"
                : "grey"
            }`}
          >
            {stage.count}
          </div>
        </div>
      ))}
    </div>
  );
}
