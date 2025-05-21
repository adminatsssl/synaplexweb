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
    const res = await fetch("/api/api/workflowType");
    const json = await res.json();
    if (json.status === "SUCCESS") {
      setWorkflows(json.data); // Extract the actual data array
    } else {
      console.error("Failed to fetch workflows:", json.message);
    }
  } catch (err) {
    console.error("Error fetching workflows:", err);
  }
};


  useEffect(() => {
    fetchWorkflows();
  }, []);

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this workflow?")) return;
  try {
    await fetch(`/api/api/workflowType/${id}`, { method: "DELETE" });
    fetchWorkflows();
  } catch (err) {
    console.error("Error deleting workflow:", err);
  }
};


  const columns = [
  { key: "name", label: "Workflow Name" },
  { key: "description", label: "Description" },
  {
    key: "actions",
    label: "",
    disableFilter: true,
    render: (row) => (
      <>
        <IconButton type="edit" onClick={() => { setEditWorkflow(row); setModalOpen(true); }} />
        <IconButton type="delete" onClick={() => handleDelete(row.id)} />
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
