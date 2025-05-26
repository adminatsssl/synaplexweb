import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StageConfig.css";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const StageTemplateModal = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    caseType: "",
    stageName: "",
    templateName: "",
  });

  const [templateNames, setTemplateNames] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        caseType: initialData.caseType || "",
        stageName: initialData.name || "",
        templateName: initialData.templateName || "",
      });
    }
  }, [initialData]);

  // Fetch templates from the API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/api/templates");
        console.log("Raw response data:", response.data);

        // The actual data array is in response.data.data
        const dataArray = response.data.data;

        if (Array.isArray(dataArray)) {
          const names = dataArray.map((template) => template.name);
          console.log("Extracted template names:", names);
          setTemplateNames(names);
        } else {
          console.warn("API 'data' property is not an array:", dataArray);
          setTemplateNames([]);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        setTemplateNames([]);
      }
    };

    fetchTemplates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved form data:", formData);
    // TODO: Implement actual save logic here!
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
              <option value="Demand Notice Generation">
                Demand Notice Generation
              </option>
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
              {templateNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
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
  );
};

export default StageTemplateModal;
