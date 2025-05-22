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
  const [autoNotice, setAutoNotice] = useState("No");
  const [autoFrequency, setAutoFrequency] = useState(0);
  const [autoValue, setAutoValue] = useState(0);

  const handleSave = () => {
    const newStage = {
      name,
      order: parseInt(order),
      displayName,
      mouseOver,
      isActive,
      autoNotice,
      autoFrequency: parseInt(autoFrequency),
      autoValue: parseInt(autoValue),
    };
    onSave(newStage);
    onClose();
  };

  return (
    <div className="add-workflow-overlay">
      <div className="add-workflow-modal">
        <div className="add-workflow-heading" >
        <h4>Legal Workflow Stages</h4>
        <button className="add-workflow-closebutton" onClick={onClose}> X</button>
        </div>
    
        <div className="add-workflow-middleContent">
        <div className="add-workflow-form-grid">
          
          <div className="add-workflow-top-barcontent">

            <div className="add-workflow-top-barcontent-one">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="add-workflow-top-barcontent-one">
            <label>Stage Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              required
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
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isActive"
                  value="No"
                  checked={isActive === "No"}
                  onChange={() => setIsActive("No")}
                />{" "}
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
            />
          </div>

          <div className="add-workflow-full-width">
            <label>Mouse Over</label>
            <input
              value={mouseOver}
              onChange={(e) => setMouseOver(e.target.value)}
            />
          </div>


          <div className="add-workflow-section-divider full-width">
          </div>

          <div className="add-workflow-field-inline-group full-width">
            <div>
              <label className="add-workflow-checkbox-label">
              Auto Notice Generation  
              <input
                type="checkbox"
                checked={autoNotice === "Yes"}
                onChange={(e) => setAutoNotice(e.target.checked ? "Yes" : "No")}
              />
            </label>


            </div>

            <div className="add-workflow-time-content-tab">
              <select
              value={autoFrequency}
              onChange={(e) => setAutoFrequency(e.target.value)}
              plaecholder="Time"
            >
              <option value="0" plaecholder='Time'></option>
              <option value="1">Day</option>
              <option value="2">Hour</option>
              <option value="3">Minute</option>
            </select>

            </div>

            <div className="add-workflow-autonotice-content-tab">
               <input
              type="number"
              value={autoValue}
              onChange={(e) => setAutoValue(e.target.value)}
              className="add-workflow-small-input"
            />

            </div>
            
            
           
          </div>

          <div className="add-workflow-section-divider">

          </div>

          <div className="add-workflow-full-width">
            <label className="required">Disposition Stages</label>
            <select>
              <option>Select...</option>
              <option>Stage A</option>
              <option>Stage B</option>
            </select>
          </div>
        </div>

        </div>
        

        <div className="add-workflow-modal-actions">
          <CancelButton onClick={onClose} className="add-workflow-cancel-btn" />
          <SaveButton
            onClick={handleSave} className="add-workflow-save-btn"
            label={"Save"}
          />

        </div>
      </div>
    </div>
  );
};

export default Addworkflowstages;
