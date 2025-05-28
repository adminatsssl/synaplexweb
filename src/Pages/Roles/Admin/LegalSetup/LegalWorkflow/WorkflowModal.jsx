import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./LegalWorkflow.css";
import IconButton from "../../../../ReusableComponents/IconButton";
import Addworkflowstages from "./Addworkflowstages";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";
import axios from "axios";

const WorkflowModal = ({ onClose, workflow }) => {
  const [name, setName] = useState(workflow?.name || "");
  const [description, setDescription] = useState(workflow?.description || "");
  const [workflowStages, setWorkflowStages] = useState([]);
  const [showStagePopup, setShowStagePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map workflow stages when workflow prop changes
  useEffect(() => {
    if (workflow?.workflowStages) {
      const mappedStages = workflow.workflowStages.map(stage => ({
        name: stage.stageName,
        order: stage.stageOrder,
        displayName: stage.stageName,
        mouseOver: stage.stageName,
        isActive: true
      }));
      setWorkflowStages(mappedStages);
    }
  }, [workflow]);

  const handleSave = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!name.trim()) {
      alert("Workflow name is required");
      return;
    }

    if (workflowStages.length === 0) {
      alert("At least one workflow stage is required");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        workflowStages: workflowStages.map(stage => ({
          stageName: stage.name,
          stageOrder: stage.order
        }))
      };

      let response;
      if (workflow?.id) {
        response = await axios.put(`/api/api/workflowType/${workflow.id}`, payload);
      } else {
        response = await axios.post('/api/api/workflowType', payload);
      }

      if (response.data.status === 'SUCCESS') {
        alert(`Workflow ${workflow?.id ? 'updated' : 'created'} successfully!`);
        onClose();
      } else {
        alert(`Failed to ${workflow?.id ? 'update' : 'create'} workflow: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert(`Failed to ${workflow?.id ? 'update' : 'create'} workflow: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStage = (newStage) => {
    // Check if stage order already exists
    const orderExists = workflowStages.some(stage => stage.order === newStage.order);
    if (orderExists) {
      alert(`Stage order ${newStage.order} already exists. Please use a different order number.`);
      return;
    }

    setWorkflowStages([...workflowStages, {
      name: newStage.name,
      order: newStage.order,
      displayName: newStage.displayName,
      mouseOver: newStage.mouseOver,
      isActive: newStage.isActive === "Yes"
    }]);
  };

  const deleteStage = (index) => {
    const updated = [...workflowStages];
    updated.splice(index, 1);
    setWorkflowStages(updated);
  };

  const stageColumns = [
    { key: "name", label: "Stage Name" },
    { key: "order", label: "Stage Order" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row, index) => (
        <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
          <IconButton type="delete" onClick={() => deleteStage(index)} />
        </div>
      ),
    },
  ];

  return (
    <div className="LegalWorkFlow-modal-overlay">
      <div className="LegalWorkFlow-modal">
        <div className="LegalWorkFlow-Heading">
          <h3>{workflow ? "Edit" : "Add"} Workflow</h3>
          <button className="LegalWorkFlow-closebutton" onClick={onClose}>X</button>
        </div>
        
        <div className="LegalWorkFlow-MiddleContent">
          <form onSubmit={handleSave}>
            <label>Workflow Name<span style={{ color: 'red' }}>*</span></label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter workflow name"
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter workflow description"
            />

            <h4 style={{ marginTop: "20px" }}>Workflow Stages<span style={{ color: 'red' }}>*</span></h4>
            <button
              type="button"
              className="LegalWorkFlow-add-stage-btn"
              onClick={() => setShowStagePopup(true)}
            >
              +
            </button>

            <div className="LegalWorkFlow-table-scroll-container">
              <ReusableGrid columns={stageColumns} data={workflowStages} />
            </div>

            <div className="LegalWorkFlow-modal-actions">
              <CancelButton onClick={onClose} className="cancel-btn" />
              <SaveButton
                type="submit"
                className="save-btn"
                label={loading ? "Saving..." : (workflow ? "Update" : "Save")}
                disabled={loading}
              />
            </div>
          </form>
        </div>

        {showStagePopup && (
          <Addworkflowstages
            onClose={() => setShowStagePopup(false)}
            onSave={handleAddStage}
          />
        )}
      </div>
    </div>
  );
};

export default WorkflowModal;
