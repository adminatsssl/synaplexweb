import React, { useState } from "react";
import "./Addworkflowstages.css";

const Addworkflowstages = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    stageName: "",
    stageOrder: "0",
    isActive: true,
    displayName: "",
    mouseOver: "",
    autoNoticeGeneration: false,
    autoNoticeType: "",
    autoNoticeOrder: "0",
    dispositionStages: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    if (!formData.stageName.trim()) {
      alert("Stage name is required");
      return;
    }

    // Transform the data to match the expected API format
    const payload = {
      name: formData.stageName.trim(),
      order: parseInt(formData.stageOrder),
      isActive: formData.isActive,
      displayName: formData.displayName,
      mouseOver: formData.mouseOver,
      autoNoticeGeneration: formData.autoNoticeGeneration,
      autoNoticeType: formData.autoNoticeType,
      autoNoticeOrder: parseInt(formData.autoNoticeOrder),
      dispositionStages: formData.dispositionStages
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal-title">
          <h2>Legal Workflow Stages</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="stageName"
                value={formData.stageName}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="input-group">
              <label>Stage order</label>
              <input
                type="text"
                name="stageOrder"
                value={formData.stageOrder}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="input-group radio-container">
              <label>Is active</label>
              <div className="radio-options">
                <label>
                  <input
                    type="radio"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isActive"
                    checked={!formData.isActive}
                    onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="input-group full-width">
            <label>Display name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter display name"
            />
          </div>

          <div className="input-group full-width">
            <label>Mouse Over</label>
            <input
              type="text"
              name="mouseOver"
              value={formData.mouseOver}
              onChange={handleChange}
              placeholder="Enter mouse over text"
            />
          </div>

          <div className="notice-section">
            <label>Auto Notice Generation</label>
            <div className="notice-controls">
              <input
                type="checkbox"
                name="autoNoticeGeneration"
                checked={formData.autoNoticeGeneration}
                onChange={handleChange}
              />
              <select
                name="autoNoticeType"
                value={formData.autoNoticeType}
                onChange={handleChange}
                disabled={!formData.autoNoticeGeneration}
              >
                <option value="">Select type</option>
              </select>
              <input
                type="text"
                name="autoNoticeOrder"
                value={formData.autoNoticeOrder}
                onChange={handleChange}
                placeholder="0"
                disabled={!formData.autoNoticeGeneration}
              />
            </div>
          </div>

          <div className="disposition-section">
            <label>Disposition Stages</label>
            <select
              name="dispositionStages"
              value={formData.dispositionStages}
              onChange={handleChange}
              multiple
            >
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default Addworkflowstages;
