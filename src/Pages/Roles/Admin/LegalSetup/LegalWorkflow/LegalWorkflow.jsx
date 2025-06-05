// LegalWorkflow.jsx
import React, { useEffect, useState } from "react";
import "./LegalWorkflow.css";
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import WorkflowModal from "./WorkflowModal";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import axios from "axios";

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const LegalWorkflow = () => {
  const [workflows, setWorkflows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(null);

  const fetchWorkflows = async () => {
    try {
      const response = await axios.get("/api/api/workflowType", {
        headers: getAuthHeaders()
      });
      if (response.data.status === "SUCCESS" && Array.isArray(response.data.data)) {
        // Process the workflows to ensure no duplicate stages
        const processedWorkflows = response.data.data.map(workflow => ({
          ...workflow,
          workflowStages: workflow.workflowStages
            ? [...new Map(workflow.workflowStages
                .map(stage => [`${stage.stageName}-${stage.stageOrder}`, stage])
              ).values()]
              .sort((a, b) => a.stageOrder - b.stageOrder)
            : []
        }));
        setWorkflows(processedWorkflows);
      } else {
        console.error("Failed to fetch workflows or invalid data format:", response.data);
        setWorkflows([]);
      }
    } catch (err) {
      console.error("Error fetching workflows:", err);
      setWorkflows([]);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    try {
      const response = await axios.delete(`/api/api/workflowType/${id}`, {
        headers: getAuthHeaders()
      });
      if (response.data.status === "SUCCESS") {
        await fetchWorkflows();
      } else {
        alert("Failed to delete workflow: " + (response.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error deleting workflow:", err);
      alert("Error deleting workflow: " + (err.response?.data?.message || err.message));
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
          <IconButton 
            type="edit" 
            onClick={() => {
              // Clean up the workflow data before editing
              const cleanWorkflow = {
                ...row,
                workflowStages: row.workflowStages
                  ? [...new Set(row.workflowStages.map(JSON.stringify))]
                      .map(JSON.parse)
                      .sort((a, b) => a.stageOrder - b.stageOrder)
                  : []
              };
              setEditWorkflow(cleanWorkflow);
              setModalOpen(true);
            }} 
          />
          <IconButton type="delete" onClick={() => handleDelete(row.id)} />
        </>
      ),
    },
  ];

  return (
    <div className="legal-workflow-container">
      <div className="headerWorkflow">
        <AddButton text="Add Workflow" onClick={() => {
          setEditWorkflow(null);
          setModalOpen(true);
        }} />
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
