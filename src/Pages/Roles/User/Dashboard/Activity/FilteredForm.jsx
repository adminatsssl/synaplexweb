import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FilteredForm.css";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid.jsx";

export default function FilteredForm({ activeTab }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get("/api/api/cases");
        const caseData = response.data?.data || [];

        const transformed = caseData.map((item) => ({
          cnr: item.cnrnumber || "-",
          createdDate: item.createdAt ? item.createdAt.split("T")[0] : "-",
          status: item.status || "-",
          borrower: item.loan?.borrower?.name || "-",
          court: item.loan?.borrower?.address?.city || "-",
          hearingDate: item.hearingDate ? item.hearingDate.split("T")[0] : "-",
          lawyer: "-", // Placeholder
          tab: item.workflowType?.toUpperCase() || "-"
        }));

        setData(transformed);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCases();
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    const filteredData = data.filter(
      (d) => d.tab === activeTab.toUpperCase()
    );

    console.log("Filtered by Case Type:", activeTab, filteredData);
    setFiltered(filteredData);
  }, [activeTab, data]);

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
        data={filtered}
      />
    </div>
  );
}
