// LegalWorkflow.jsx
import React, { useEffect, useState } from "react";
import "./LegalWorkflow.css";
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import WorkflowModal from "./WorkflowModal";
import JSONbig from "json-bigint";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";

const LegalWorkflow = () => {
  const [workflows, setWorkflows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(null);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch("/odata/legal/LegalWorkflows?$expand=LegalWorkflowStages");
      const text = await res.text();
      const data = JSONbig.parse(text);
      setWorkflows(data.value);
    } catch (err) {
      console.error("Error fetching workflows:", err);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleDelete = async (id) => {
    const stringId = id.toString();
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    try {
      await fetch(`/odata/legal/LegalWorkflows(${stringId})`, { method: "DELETE" });
      fetchWorkflows();
    } catch (err) {
      console.error("Error deleting workflow:", err);
    }
  };

  const columns = [
    { key: "CaseType", label: "Case Type", render: (row) => row.CaseType.replace(/_/g, " ") },
    { key: "Description", label: "Description" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <>
          <IconButton type="edit" onClick={() => { setEditWorkflow(row); setModalOpen(true); }} />
          <IconButton type="delete" onClick={() => handleDelete(row.ID)} />
        </>
      ),
    },
  ];

  return (
    <div className="legal-workflow-container">
      <div className="headerWorkflow">
        <AddButton text="Add Workflow" onClick={() => setModalOpen(true)} />
      </div>

      {workflows.length === 0 ? (
        <div className="info-message">No workflows found.</div>
      ) : (
        <ReusableGrid columns={columns} data={workflows} />
      )}

      {modalOpen && (
        <WorkflowModal
          onClose={() => {
            setModalOpen(false);
            setEditWorkflow(null);
            fetchWorkflows();
          }}
          workflow={editWorkflow}
        />
      )}
    </div>
  );
};

export default LegalWorkflow;
