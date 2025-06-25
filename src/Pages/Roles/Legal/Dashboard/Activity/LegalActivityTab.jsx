// ActivityCaseTabs.js
import React, { useState, useEffect } from "react";
import StageBar from "./StageReusable";
import FilteredForm from "./FilteredForm";
import "./ActivityCaseTabs.css";
import axios from "axios";


export default function LegalActivityCaseTabs() {
    const [activeTab, setActiveTab] = useState("SARFAESI");
  const [selectedStage, setSelectedStage] = useState(null);

  const [tabs, setTabs] = useState([
    { name: "SARFAESI", count: 0 },
    { name: "CHEQUE BOUNCE", count: 0 },
    { name: "ARBITRATION", count: 0 }
  ]);

  const [stageMap, setStageMap] = useState({
    SARFAESI: [],
    "CHEQUE BOUNCE": [],
    ARBITRATION: []
  });

  const staticStages = {
    SARFAESI: [
      "Initiation",
      "Demand Notice Generation",
      "Tracking 60-Day Response",
      "Possession Notice",
      "Asset Valuation & Auction",
      "Auction & Recovery",
      "Closure"
    ],
    "CHEQUE BOUNCE": [
      "Initiation",
      "Demand Notice Generation",
      "Tracking 15-Day Response",
      "Complaint Filing",
      "Court Proceedings",
      "Final Judgment",
      "Closure"
    ],
    ARBITRATION: [
      "Initiation",
      "Notice Generation",
      "Arbitrator Appointment",
      "Arbitration Hearing Scheduling",
      "Resolution & Award",
      "Execution of Award",
      "Closure"
    ]
  };
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
  const fetchCases = async () => {
    try {
      const response = await axios.get(`api/api/cases/ActivityDeatils`, {
        headers: getAuthHeaders()
      });

      const workflowGroups = response.data || [];

      const counts = {
        SARFAESI: 0,
        "CHEQUE BOUNCE": 0,
        ARBITRATION: 0
      };

      const stages = {
        SARFAESI: {},
        "CHEQUE BOUNCE": {},
        ARBITRATION: {}
      };

      workflowGroups.forEach((group) => {
        const type = group.workflowType?.toUpperCase()?.trim();
        const workflowCount = parseInt(group.workflowCount) || 0;

        if (type && counts.hasOwnProperty(type)) {
          // Set total count for tab
          counts[type] = workflowCount;

          // Iterate through nested cases
          group.cases?.forEach((caseItem) => {
            const rawStage = caseItem.activeStageName;

            const matchedStage =
              rawStage &&
              staticStages[type]?.find(
                (s) => s.trim().toLowerCase() === rawStage.trim().toLowerCase()
              );

            if (matchedStage) {
              stages[type][matchedStage] = (stages[type][matchedStage] || 0) + 1;
            } else if (rawStage && rawStage.trim() !== "") {
              console.warn(`⚠️ Unmatched stage for ${type}: "${rawStage}"`);
            }
          });
        }
      });

      // Format the stage map for UI
      const formattedStageMap = {};
      Object.keys(staticStages).forEach((type) => {
        formattedStageMap[type] = staticStages[type].map((stageLabel) => ({
          label: stageLabel,
          count: stages[type]?.[stageLabel] || 0
        }));
      });

      // Update React state
      setTabs([
        { name: "SARFAESI", count: counts.SARFAESI },
        { name: "CHEQUE BOUNCE", count: counts["CHEQUE BOUNCE"] },
        { name: "ARBITRATION", count: counts.ARBITRATION }
      ]);
      setStageMap(formattedStageMap);
    } catch (error) {
      console.error("Failed to fetch workflow cases:", error);
    }
  };

  fetchCases();
}, []);



  useEffect(() => {
    const defaultStage = stageMap[activeTab]?.[1] || null;
    setSelectedStage(defaultStage);
  }, [activeTab, stageMap]);

  return (
    <div className="activitytabs-container">
      <div className="activitytabs">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`activitytab ${activeTab === tab.name ? "active" : ""}`}
          >
            {tab.name}
            <span className={`activitybadge ${tab.count > 0 ? "red" : "grey"}`}>
              {tab.count}
            </span>
          </div>
        ))}
      </div>

      <div className="activity-middle-content">
        <div className="activity-stage-bar-middle">
          <StageBar
            stages={stageMap[activeTab] || []}
            activeStage={selectedStage}
            onStageClick={setSelectedStage}
          />
        </div>

        {selectedStage && (
          <FilteredForm
            activeTab={activeTab}
            activeStage={selectedStage.label}
          />
        )}
      </div>
    </div>
  );
}
