import React, { useEffect, useState } from "react";
import "./LegalWorkflow.css";
import IconButton from "../../../../ReusableComponents/IconButton";
import Addworkflowstages from "./Addworkflowstages";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";
import axios from "axios";

const WorkflowModal = ({ onClose, workflow }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workflowStages, setWorkflowStages] = useState([]);
  const [showStagePopup, setShowStagePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDispositionDropdown, setShowDispositionDropdown] = useState(false);
  const [selectedDispositions, setSelectedDispositions] = useState([]);

  // Dummy disposition stages
  const dispositionStages = [
    { id: 1, name: "Initial Review" },
    { id: 2, name: "Document Verification" },
    { id: 3, name: "Legal Assessment" },
    { id: 4, name: "Court Filing" },
    { id: 5, name: "Case Hearing" },
    { id: 6, name: "Final Disposition" }
  ];

  // Reset form when workflow changes (including when modal opens/closes)
  useEffect(() => {
    setName("");
    setDescription("");
    setWorkflowStages([]);
    setSelectedDispositions([]);
    
    if (workflow) {
      setName(workflow.name || "");
      setDescription(workflow.description || "");
      if (workflow.workflowStages && Array.isArray(workflow.workflowStages)) {
        const mappedStages = workflow.workflowStages
          .map(stage => ({
            name: stage.stageName,
            order: stage.stageOrder
          }))
          .sort((a, b) => a.order - b.order);
        setWorkflowStages(mappedStages);
      }
      if (workflow.dispositions) {
        setSelectedDispositions(workflow.dispositions.map(d => d.id));
      }
    }
  }, [workflow]);

  const toggleDisposition = (id) => {
    setSelectedDispositions(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

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

    // Remove any duplicate stages before saving
    const uniqueStages = workflowStages.reduce((acc, current) => {
      const isDuplicate = acc.find(
        item => item.name.toLowerCase() === current.name.toLowerCase() && 
               item.order === current.order
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        workflowStages: uniqueStages.map(stage => ({
          stageName: stage.name,
          stageOrder: stage.order
        })),
        dispositionIds: selectedDispositions
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
    // Check if stage name already exists (case insensitive)
    const nameExists = workflowStages.some(
      stage => stage.name.toLowerCase() === newStage.name.toLowerCase()
    );
    if (nameExists) {
      alert(`Stage name "${newStage.name}" already exists. Please use a different name.`);
      return;
    }

    // Check if stage order already exists
    const orderExists = workflowStages.some(
      stage => stage.order === newStage.order
    );
    if (orderExists) {
      alert(`Stage order ${newStage.order} already exists. Please use a different order number.`);
      return;
    }

    // Add new stage and sort by order
    setWorkflowStages(prevStages => 
      [...prevStages, {
        name: newStage.name,
        order: newStage.order
      }].sort((a, b) => a.order - b.order)
    );
    
    // Close the add stage popup
    setShowStagePopup(false);
  };

  const deleteStage = (index) => {
    setWorkflowStages(prevStages => prevStages.filter((_, i) => i !== index));
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

            <div className="disposition-dropdown-container">
              <label>Case Disposition Stages</label>
              <div 
                className="disposition-dropdown-header"
                onClick={() => setShowDispositionDropdown(!showDispositionDropdown)}
              >
                <span>
                  {selectedDispositions.length 
                    ? `${selectedDispositions.length} stages selected` 
                    : "Select disposition stages"}
                </span>
                <span className="dropdown-arrow">{showDispositionDropdown ? '▼' : '▶'}</span>
              </div>
              {showDispositionDropdown && (
                <div className="disposition-dropdown-list">
                  {dispositionStages.map(stage => (
                    <div 
                      key={stage.id} 
                      className="disposition-dropdown-item"
                      onClick={() => toggleDisposition(stage.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedDispositions.includes(stage.id)}
                        onChange={() => {}}
                      />
                      <span>{stage.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
