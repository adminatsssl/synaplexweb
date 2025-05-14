// ActivityCaseTabs.js
import React, { useState, useEffect } from "react";
import StageBar from "./StageReusable";
import FilteredForm from "./FilteredForm";
import "./ActivityCaseTabs.css";

const tabs = [
    { name: "SARFASEI", count: 1 },
    { name: "Cheque Bounce", count: 1 },
    { name: "Arbitration", count: 0 }
];

const stageMap = {
    SARFASEI: [
        { label: "Initiated", count: 0 },
        { label: "Demand Notice Generation - Section 13(2)", count: 1 },
        { label: "Tracking 60 Day Response - Section 13(3A)", count: 0 },
        { label: "Possession Notice - Section 13(4)", count: 1 },
        { label: "Asset Valuation Auction", count: 0 },
        { label: "Auction & Recovery - Section 13(4)", count: 0 },
        { label: "Close", count: 0 }
    ],
    "Cheque Bounce": [
        { label: "Initiated", count: 0 },
        { label: "Demand Notice Generation - Section 138(b)", count: 0 },
        { label: "Tracking 60 Day Response - Section 138(c)", count: 1 },
        { label: "Compliant Filling in the Court - Section 142(1)(a)", count: 0 },
        { label: "Court Proceedings - Section 143", count: 0 },
        { label: "Final Judgment - Section 138 and 147", count: 0 },
        { label: "Close", count: 0 }
    ],
    Arbitration: [
        { label: "Initiated", count: 0 },
        { label: "Demand Notice Generation - Section 13(2)", count: 0 },
        { label: "Tracking 60 Day Response - Section 13(3A)", count: 1 },
        { label: "Possession Notice - Section 13(4)", count: 0 },
        { label: "Asset Valuation Auction", count: 0 },
        { label: "Auction & Recovery - Section 13(4)", count: 0 },
        { label: "Close", count: 0 }
    ]
};

export default function ActivityCaseTabs() {
    const [activeTab, setActiveTab] = useState("SARFASEI");
    const [selectedStage, setSelectedStage] = useState(() => {
        return stageMap[activeTab]?.[1] || null;
    });

    useEffect(() => {
        const secondStage = stageMap[activeTab]?.[1] || null;
        setSelectedStage(secondStage);
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
                            className={`activitybadge ${activeTab === tab.name && tab.count >= 0 ? "red" : "grey"
                                }`}
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
                <div>
                {selectedStage && (
                    <FilteredForm activeTab={activeTab} selectedStage={selectedStage} />
                )}
                </div>
               

            </div>

        </div>
    );
}
