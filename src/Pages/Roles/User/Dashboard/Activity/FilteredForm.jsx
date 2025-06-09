import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FilteredForm.css";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid.jsx";
import { useNavigate } from "react-router-dom";

export default function FilteredForm({ activeTab, activeStage }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
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

        const transformed = caseData.map((item) => ({
          CaseID: item.id,
          cnr: item.cnrnumber || "-",
          createdDate: item.createdAt ? item.createdAt.split("T")[0] : "-",
          status: item.status || "-",
          borrower: item.loan?.borrower?.name || "-",
          court: item.loan?.borrower?.address?.city || "-",
          hearingDate: item.hearingDate ? item.hearingDate.split("T")[0] : "-",
          lawyer: "-", // Placeholder
          tab: item.workflowType?.toUpperCase()?.trim() || "-",
          stage: item.activeStageName?.trim() || "-"
        }));

        // console.log("Fetched data:", transformed);
        setData(transformed);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCases();
  }, []);

  useEffect(() => {
    if (!activeTab || !activeStage) return;

    const normalizedStage = activeStage.trim().toLowerCase();
    const normalizedTab = activeTab.trim().toUpperCase();
    

    const filteredData = data.filter(
      (d) =>
        d.tab === normalizedTab &&
        d.stage.trim().toLowerCase() === normalizedStage
    );

    // console.log("Filtered:", {
    //   activeTab,
    //   activeStage,
    //   filteredData
    // });

    setFiltered(filteredData);
  }, [activeTab, activeStage, data]);

  const handleRowClick = (row) => {
    if (row?.CaseID) {
      navigate(`/case/${row.CaseID}`);
    }
  };

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
      {filtered.length === 0 ? (
        <div className="no-data-msg">No cases found for selected stage.</div>
      ) : (
        <ReusableGrid
          columns={columns}
          data={filtered}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
}
