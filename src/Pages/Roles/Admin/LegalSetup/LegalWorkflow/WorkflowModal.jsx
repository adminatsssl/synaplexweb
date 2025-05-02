import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./LegalWorkflow.css";
import IconButton from "../../../../ReusableComponents/IconButton";
import Addworkflowstages from "./Addworkflowstages";
import JSONbig from "json-bigint";

const caseTypes = [
  "Arbitration",
  "SARFAESI",
  "Cheque_Bounce",
  "Debt_Recovery_Tribunal__DRT_",
  "Civil_Court",
  "IBC_NCLT",
  "Criminal_Complaints",
];

const WorkflowModal = ({ onClose, workflow }) => {
  const [caseType, setCaseType] = useState(workflow?.CaseType || "");
  const [description, setDescription] = useState(workflow?.Description || "");
  const [dispositionStages, setDispositionStages] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [showStagePopup, setShowStagePopup] = useState(false);

  const handleAddStage = (newStage) => {
    setWorkflowStages([...workflowStages, newStage]);
  };

  const isEdit = !!workflow;
  const [workflowStages, setWorkflowStages] = useState([
    {
      name: "Initiation",
      order: 1,
      displayName: "Initiation",
      mouseOver: "Initiation",
      isActive: "Yes",
      autoNotice: "No",
      autoFrequency: 0,
      autoValue: 0,
    },
    {
      name: "Demand Notice",
      order: 2,
      displayName: "Demand Notice",
      mouseOver: "Demand Notice",
      isActive: "Yes",
      autoNotice: "No",
      autoFrequency: 0,
      autoValue: 0,
    },
  ]);
  const addStage = () => {
    const newStage = {
      name: `New Stage ${workflowStages.length + 1}`,
      order: workflowStages.length + 1,
      displayName: `New Stage ${workflowStages.length + 1}`,
      mouseOver: `New Stage ${workflowStages.length + 1}`,
      isActive: "Yes",
      autoNotice: "No",
      autoFrequency: 0,
      autoValue: 0,
    };
    setWorkflowStages([...workflowStages, newStage]);
  };

  const deleteStage = (index) => {
    const updated = [...workflowStages];
    updated.splice(index, 1);
    setWorkflowStages(updated);
  };

  useEffect(() => {
    fetchCsrfToken();
    fetchDispositionStages();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch("/odata/legal/$metadata", {
        method: "GET",
        headers: {
          "X-CSRF-Token": "fetch",
        },
        credentials: "include",
      });
      const token = response.headers.get("x-csrf-token");
      setCsrfToken(token || "");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const fetchDispositionStages = async () => {
    try {
      const res = await fetch("/odata/legal/WorkflowDispositionStages", {
        credentials: "include",
      });
      const text = await res.text();
      const data = JSONbig.parse(text);
      setDispositionStages(data.value);

      if (workflow?.WorkflowDispositionStages) {
        const preSelected = data.value.filter((stage) =>
          workflow.WorkflowDispositionStages.some((s) => s.ID === stage.ID)
        );
        setSelectedStages(preSelected);
      }
    } catch (error) {
      console.error("Error fetching disposition stages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      CaseType: caseType,
      Description: description,
    };

    // Only include associations if stages are selected
    if (selectedStages.length > 0) {
      payload.WorkflowDispositionStages = selectedStages.map((stage) => ({
        _id: `WorkflowDispositionStages(${stage.ID})`,
      }));
    }

    try {
      const url = `/odata/legal/LegalWorkflows${
        isEdit ? `(${workflow.ID})` : ""
      }`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error response:", errorData);
        alert(`Failed to save: ${errorData.message || res.statusText}`);
        return;
      }

      onClose();
    } catch (err) {
      console.error("Error saving workflow:", err);
      alert("Network error occurred while saving.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isEdit ? "Edit" : "Add"} Workflow</h3>
        <form onSubmit={handleSubmit}>
          <label>Case Type</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            required
          >
            <option value="">Select Case Type</option>
            {caseTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct.replace(/_/g, " ")}
              </option>
            ))}
          </select>

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Disposition Stages</label>
          <Autocomplete
            multiple
            options={dispositionStages}
            getOptionLabel={(option) => option.Name}
            value={selectedStages}
            onChange={(event, newValue) => setSelectedStages(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Stages"
              />
            )}
          />
          <h4 style={{marginTop:'20px'}}>Workflow Stages</h4>
          <button
            type="button"
            className="add-stage-btn"
            onClick={() => setShowStagePopup(true)}
          >
            +
          </button>

          <div className="table-scroll-container">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stage Order</th>
                  <th>DisplayName</th>
                  <th>MouseOver</th>
                  <th>Is Active</th>
                  <th>Auto Notice</th>
                  <th>Auto Frequency</th>
                  <th>Auto Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workflowStages.map((stage, idx) => (
                  <tr key={idx}>
                    <td>{stage.name}</td>
                    <td>{stage.order}</td>
                    <td>{stage.displayName}</td>
                    <td>{stage.mouseOver}</td>
                    <td>{stage.isActive}</td>
                    <td>{stage.autoNotice}</td>
                    <td>{stage.autoFrequency}</td>
                    <td>{stage.autoValue}</td>
                    <td>
                      <IconButton type="edit" />
                      <IconButton type="delete"  onClick={() => deleteStage(idx)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
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
