import React, { useState } from "react";
import "./Addworkflowstages.css";
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

const Addworkflowstages = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mouseOver, setMouseOver] = useState("");
  const [isActive, setIsActive] = useState("Yes");

  const handleSave = () => {
    if (!name.trim()) {
      alert("Stage name is required");
      return;
    }

    if (!order || order <= 0) {
      alert("Valid stage order is required");
      return;
    }

    const newStage = {
      name,
      order: parseInt(order),
      displayName: displayName || name,
      mouseOver: mouseOver || name,
      isActive
    };
    onSave(newStage);
    onClose();
  };

  return (
    <div className="add-workflow-overlay">
      <div className="add-workflow-modal">
        <div className="add-workflow-heading">
          <h4>Add Workflow Stage</h4>
          <button className="add-workflow-closebutton" onClick={onClose}>X</button>
        </div>
    
        <div className="add-workflow-middleContent">
          <div className="add-workflow-form-grid">
            <div className="add-workflow-top-barcontent">
              <div className="add-workflow-top-barcontent-one">
                <label>Stage Name<span style={{ color: 'red' }}>*</span></label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter stage name"
                />
              </div>

              <div className="add-workflow-top-barcontent-one">
                <label>Stage Order<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  required
                  placeholder="Enter stage order"
                  min="1"
                />
              </div>

              <div className="add-workflow-top-barcontent-one-checkbox">
                <label>Is Active:</label>
                <div className="add-workflow-radio-options">
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="Yes"
                      checked={isActive === "Yes"}
                      onChange={() => setIsActive("Yes")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="No"
                      checked={isActive === "No"}
                      onChange={() => setIsActive("No")}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="add-workflow-full-width">
              <label>Display Name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter display name (optional)"
              />
            </div>

            <div className="add-workflow-full-width">
              <label>Mouse Over Text</label>
              <input
                value={mouseOver}
                onChange={(e) => setMouseOver(e.target.value)}
                placeholder="Enter mouse over text (optional)"
              />
            </div>
          </div>
        </div>

        <div className="add-workflow-modal-actions">
          <CancelButton onClick={onClose} className="add-workflow-cancel-btn" />
          <SaveButton
            onClick={handleSave}
            className="add-workflow-save-btn"
            label="Save"
          />
        </div>
      </div>
    </div>
  );
};

export default Addworkflowstages;
