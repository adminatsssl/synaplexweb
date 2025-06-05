import React, { useState, useEffect } from "react";
import axios from "axios";
import StageBar from "./StageReusable";
import FilteredForm from "./FilteredForm";
import "./ActivityCaseTabs.css";

export default function ActivityCaseTabs() {
  const [activeTab, setActiveTab] = useState("SARFAESI");
  const [selectedStage, setSelectedStage] = useState(null);

  const [tabs, setTabs] = useState([
    { name: "SARFAESI", count: 0 },
    { name: "CHEQUE_BOUNCE", count: 0 },
    { name: "ARBITRATION", count: 0 }
  ]);

  const [stageMap, setStageMap] = useState({
    SARFAESI: [],
    CHEQUE_BOUNCE: [],
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
    CHEQUE_BOUNCE: [
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
        const response = await axios.get(`/api/api/cases`, {
          headers : getAuthHeaders()
        });
        const caseData = response.data?.data || [];

        const counts = {
          SARFAESI: 0,
          CHEQUE_BOUNCE: 0,
          ARBITRATION: 0
        };

        const stages = {
          SARFAESI: {},
          CHEQUE_BOUNCE: {},
          ARBITRATION: {}
        };

        // Count logic
        caseData.forEach((c) => {
          const type = c.workflowType?.toUpperCase();
          const stage = c.activeStageName?.trim();

          if (type && stage) {
            counts[type] = (counts[type] || 0) + 1;
            stages[type][stage] = (stages[type][stage] || 0) + 1;
          }
        });

        const formattedStageMap = {};
        Object.keys(staticStages).forEach((type) => {
          formattedStageMap[type] = staticStages[type].map((stageLabel) => ({
            label: stageLabel,
            count: stages[type]?.[stageLabel] || 0
          }));
        });

        // Update state
        setTabs([
          { name: "SARFAESI", count: counts.SARFAESI },
          { name: "CHEQUE_BOUNCE", count: counts.CHEQUE_BOUNCE },
          { name: "ARBITRATION", count: counts.ARBITRATION }
        ]);
        setStageMap(formattedStageMap);
      } catch (error) {
        console.error("Failed to fetch case data:", error);
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
