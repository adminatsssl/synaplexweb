import React, { useState, useEffect } from "react";
import "./StageConfig.css";

const StageTemplateModal = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    caseType: "",
    stageName: "",
    templateName: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        caseType: initialData.caseType || "",
        stageName: initialData.name || "",
        templateName: initialData.templateName || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement save logic here
    // For editing, update the existing item
    // For adding, create a new item
    onClose();
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
              <option value="SARFAESI">SARFAESI</option>
              <option value="Cheque Bounce">Cheque Bounce</option>
              {/* Add more options as needed */}
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
              <option value="Demand Notice Generation">Demand Notice Generation</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label>
            Template Name
            <select
              name="templateName"
              value={formData.templateName}
              onChange={handleChange}
            >
              <option value="">Select Template Name</option>
              <option value="Template A">Template A</option>
              <option value="Template B">Template B</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <hr />
        <div className="stageconfig-modal-footer">
          <button className="stageconfig-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="stageconfig-save-btn" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageTemplateModal;
