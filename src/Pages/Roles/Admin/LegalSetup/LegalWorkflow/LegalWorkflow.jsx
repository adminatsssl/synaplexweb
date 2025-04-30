// LegalWorkflow.jsx
import React, { useEffect, useState } from "react";
import "./LegalWorkflow.css";
import AddButton from '../../../../ReusableComponents/AddButton';
import IconButton from "../../../../ReusableComponents/IconButton";
import WorkflowModal from "./WorkflowModal";
import JSONbig from "json-bigint";

const LegalWorkflow = () => {
  const [workflows, setWorkflows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(null);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch(
        "/odata/legal/LegalWorkflows?$expand=LegalWorkflowStages"
      );
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
    if (!window.confirm("Are you sure you want to delete this workflow?"))
      return;
    try {
      await fetch(`/odata/legal/LegalWorkflows(${stringId})`, {
        method: "DELETE",
      });
      fetchWorkflows();
    } catch (err) {
      console.error("Error deleting workflow:", err);
    }
  };

  return (
    <div className="legal-workflow-container">
      <div className="header">
        <h2>Legal Workflows</h2>
        <AddButton text="Add Workflow" onClick={() => setModalOpen(true)} />
      </div>

      <table className="workflow-table">
        <thead>
          <tr>
            <th>Case Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow) => (
            <tr key={workflow.ID.toString()}>
              <td>{workflow.CaseType.replace(/_/g, " ")}</td>
              <td>{workflow.Description}</td>
              <td>
                <IconButton
                  type="edit"
                  onClick={() => {
                    setEditWorkflow(workflow);
                    setModalOpen(true);
                  }}
                />
                <IconButton
                  type="delete"
                  onClick={() => handleDelete(workflow.ID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
