import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StageConfig.css";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";
import Select from 'react-select';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const StageTemplateModal = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    caseType: "",
    stageName: "",
    selectedTemplates: [],
  });

  const [workflowData, setWorkflowData] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

  // Load initial form data
  useEffect(() => {
    if (initialData) {
      setFormData({
        caseType: initialData.caseType || "",
        stageName: initialData.stageName || "",
        selectedTemplates: initialData.templateNames ? 
          initialData.templateNames.map(name => ({ value: name, label: name })) : [],
      });
    }
  }, [initialData]);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/api/templates", {
          headers: getAuthHeaders()
        });
        const dataArray = response.data.data;
        if (Array.isArray(dataArray)) {
          const options = dataArray.map((template) => ({
            value: template.name,
            label: template.name
          }));
          setTemplateOptions(options);
        } else {
          console.warn("API 'data' property is not an array:", dataArray);
          setTemplateOptions([]);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        setTemplateOptions([]);
      }
    };
    fetchTemplates();
  }, []);

  // Fetch workflow types and stages
  useEffect(() => {
    const fetchWorkflowData = async () => {
      try {
        const response = await axios.get("/api/api/workflowType", {
          headers: getAuthHeaders()
        });
        const workflowTypes = response.data.data;
        if (Array.isArray(workflowTypes)) {
          setWorkflowData(workflowTypes);
        } else {
          console.warn("API 'data' property is not an array:", workflowTypes);
          setWorkflowData([]);
        }
      } catch (error) {
        console.error("Error fetching workflow data:", error);
        setWorkflowData([]);
      }
    };
    fetchWorkflowData();
  }, []);

  // Update stage options based on selected caseType
  useEffect(() => {
    const selectedWorkflow = workflowData.find(
      (workflow) => workflow.name === formData.caseType
    );
    if (selectedWorkflow && Array.isArray(selectedWorkflow.workflowStages)) {
      setStageOptions(selectedWorkflow.workflowStages);
    } else {
      setStageOptions([]);
    }
  }, [formData.caseType, workflowData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle template selection
  const handleTemplateChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      selectedTemplates: selectedOptions || []
    }));
  };

  // Final save handler
  const handleSave = async () => {
    console.log("Form data to save:", formData);

    const postData = {
      workflowTypeName: formData.caseType,
      stageName: formData.stageName,
      templateNames: formData.selectedTemplates.map(template => template.value),
    };

    try {
      const response = await axios.post("/api/api/templates/attachTemplate", postData, {
        headers: getAuthHeaders()
      });
      console.log("Save response:", response.data);
      alert("Templates attached successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to attach templates. Please try again.");
    }
  };

  return (
    <div className="stageconfig-modal-overlay">
      <div className="stageconfig-modal">
        <div className="stageconfig-modal-header">
          <h2>Stages Template</h2>
          <button className="stageconfig-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="stageconfig-modal-body">
          <label>
            Case Type
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
            >
              <option value="">Select Case Type</option>
              {workflowData.map((workflow) => (
                <option key={workflow.id} value={workflow.name}>
                  {workflow.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Stage Name
            <select
              name="stageName"
              value={formData.stageName}
              onChange={handleChange}
            >
              <option value="">Select Stage Name</option>
              {stageOptions.map((stage) => (
                <option key={stage.id} value={stage.stageName}>
                  {stage.stageName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Template Names
            <Select
              isMulti
              name="templates"
              options={templateOptions}
              value={formData.selectedTemplates}
              onChange={handleTemplateChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select templates..."
            />
          </label>
        
          <hr />
          <div className="stageconfig-modal-footer">
            <CancelButton onClick={onClose} className="stageconfig-cancel-btn" />
            <SaveButton
              onClick={handleSave}
              className="stageconfig-save-btn"
              label="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageTemplateModal;
