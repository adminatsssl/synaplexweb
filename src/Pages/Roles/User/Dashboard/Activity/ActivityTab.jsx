import React, { useState, useEffect } from "react";
import axios from "axios";
import StageBar from "./StageReusable";
import FilteredForm from "./FilteredForm";
import "./ActivityCaseTabs.css";

const stageMap = {
  SARFAESI: [
    { label: "Initial", count: 0 },
    { label: "Demand Notice Generation - Section 13(2)", count: 0 },
    { label: "Tracking 60 Day Response - Section 13(3A)", count: 0 },
    { label: "Possession Notice - Section 13(4)", count: 0 },
    { label: "Asset Valuation Auction", count: 0 },
    { label: "Auction & Recovery - Section 13(4)", count: 0 },
    { label: "Close", count: 0 }
  ],
  CHEQUE_BOUNCE: [
    { label: "Initial", count: 0 },
    { label: "Demand Notice Generation - Section 138(b)", count: 0 },
    { label: "Tracking 60 Day Response - Section 138(c)", count: 0 },
    { label: "Compliant Filling in the Court - Section 142(1)(a)", count: 0 },
    { label: "Court Proceedings - Section 143", count: 0 },
    { label: "Final Judgment - Section 138 and 147", count: 0 },
    { label: "Close", count: 0 }
  ],
  ARBITRATION: [
    { label: "Initial", count: 0 },
    { label: "Demand Notice Generation - Section 13(2)", count: 0 },
    { label: "Tracking 60 Day Response - Section 13(3A)", count: 0 },
    { label: "Possession Notice - Section 13(4)", count: 0 },
    { label: "Asset Valuation Auction", count: 0 },
    { label: "Auction & Recovery - Section 13(4)", count: 0 },
    { label: "Close", count: 0 }
  ]
};

export default function ActivityCaseTabs() {
  const [activeTab, setActiveTab] = useState("SARFAESI");
  const [selectedStage, setSelectedStage] = useState(null);
  const [tabs, setTabs] = useState([
    { name: "SARFAESI", count: 0 }, 
    { name: "CHEQUE_BOUNCE", count: 0 },
    { name: "ARBITRATION", count: 0 }
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("/api/api/cases");
        const caseData = response.data?.data || [];

        // Count by workflowType (caseType)
        const counts = {
          SARFAESI: 0,
          CHEQUE_BOUNCE: 0,
          ARBITRATION: 0
        };

        caseData.forEach((c) => {
          const type = c.workflowType?.toUpperCase();
          if (counts[type] !== undefined) counts[type]++;
        });

        setTabs([
          { name: "SARFAESI", count: counts.SARFAESI },
          { name: "CHEQUE_BOUNCE", count: counts.CHEQUE_BOUNCE },
          { name: "ARBITRATION", count: counts.ARBITRATION }
        ]);
      } catch (error) {
        console.error("Failed to fetch case counts:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    // Automatically select first available stage in the selected tab
    const defaultStage = stageMap[activeTab]?.[0] || null;
    setSelectedStage(defaultStage);
  }, [activeTab]);

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
            <span
              className={`activitybadge ${tab.count > 0 ? "red" : "grey"}`}
            >
              {tab.count}
            </span>
          </div>
        ))}
      </div>

      <div className="activity-middle-content">
        <div className="activity-stage-bar-middle">
          <StageBar
            stages={stageMap[activeTab]}
            activeStage={selectedStage}
            onStageClick={setSelectedStage}
          />
        </div>

        {selectedStage && (
          <FilteredForm activeTab={activeTab}  />
        )}
      </div>
    </div>
  );
}
