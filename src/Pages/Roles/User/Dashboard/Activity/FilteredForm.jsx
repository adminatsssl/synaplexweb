// FilteredForm.js
import React, { useState, useEffect } from "react";
import "./FilteredForm.css";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid.jsx";

export default function FilteredForm({ activeTab, selectedStage }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Mock data to simulate fetch
    const mock = [
        {
          cnr: "CNR123",
          createdDate: "2024-05-01",
          status: "Open",
          borrower: "John Doe",
          court: "Delhi Court",
          hearingDate: "2024-06-10",
          lawyer: "Amit",
          tab: "SARFASEI",
          stage: "Demand Notice Generation - Section 13(2)"
        },
        {
          cnr: "CNR999",
          createdDate: "2024-05-05",
          status: "Closed",
          borrower: "Jane Smith",
          court: "Mumbai Court",
          hearingDate: "2024-07-01",
          lawyer: "Priya",
          tab: "Cheque Bounce",
          stage: "Tracking 60 Day Response - Section 138(c)"
        },
        {
          cnr: "CNR456",
          createdDate: "2024-05-10",
          status: "Open",
          borrower: "Ravi Kumar",
          court: "Chennai Court",
          hearingDate: "2024-06-20",
          lawyer: "Suman",
          tab: "SARFASEI",
          stage: "Possession Notice - Section 13(4)"  // 👈 This matches the selected stage
        }
      ];
      

    setData(mock);
  }, []);

  useEffect(() => {
    if (!activeTab || !selectedStage) return;

    const tabStageFiltered = data.filter(
      (d) => d.tab === activeTab && d.stage === selectedStage.label
    );

    setFiltered(tabStageFiltered);
  }, [activeTab, selectedStage, data]);

  const columns = [
    { key: "cnr", label: "CNR No." },
    { key: "createdDate", label: "Created Date" },
    { key: "status", label: "Status" },
    { key: "borrower", label: "Borrower" },
    { key: "court", label: "Court" },
    { key: "hearingDate", label: "Hearing Date" },
    { key: "lawyer", label: "Lawyer" }
  ];

  return (
    <div className="activity-form-wrapper">
      <ReusableGrid 
        columns={columns} 
        data={selectedStage?.count > 0 ? filtered : []} 
      />
    </div>
  );
  
  
}
