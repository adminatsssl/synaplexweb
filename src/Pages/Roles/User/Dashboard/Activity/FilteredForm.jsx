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
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`api/api/cases/ActivityDeatils`, {
          headers: getAuthHeaders(),
        });
        console.log("Res", response)

        const workflowGroups = response.data || [];
        console.log(workflowGroups)

        // Flatten and transform case data
        const transformed = workflowGroups.flatMap((group) =>
          group.cases.map((item) => ({
            CaseID: item.id,
            cnr: item.cnrNumber || "-",
            createdDate: item.createdDate
              ? item.hearingDate.split(" ")[0]
              : "-",
            status: item.status || "-",
            borrower: item.borrower || "-",
            court: item.court || "-",
            hearingDate: item.hearingDate
              ? item.hearingDate.split(" ")[0]
              : "-",
            lawyer: item.lawyer || "-",
            tab: group.workflowType?.toUpperCase()?.trim() || "-",
            stage: item.activeStageName?.trim() || "-",
          }))
        );

        setData(transformed);
      } catch (error) {
        console.error("Error fetching workflow case data:", error);
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
    { key: "lawyer", label: "Lawyer" },
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
