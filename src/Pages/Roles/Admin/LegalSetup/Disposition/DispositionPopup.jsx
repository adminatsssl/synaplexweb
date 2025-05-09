import React, { useEffect, useState } from "react";
import './DispositionSetup.css'; // Make sure this points to the correct file
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

const DispositionPopup = ({ onClose, onSave, item }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.Name || "");
      setDescription(item.Description || "");
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Name: name,
      Description: description,
    };

    if (item) {
      await fetch(`/odata/WorkflowDispositionStages(${item.ID})`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/odata/WorkflowDispositionStages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    onSave();
    onClose();
  };

  return (
    <div className="Disposition-modal-overlay">
      <div className="Disposition-modal">
        <div className="Disposition-modal-title">
          {item ? "Edit Disposition" : "Add Disposition"}
          <button className="Disposition-modal-closebutton" onClick={onClose}>X</button>
          
          </div>

        <div className="Disposition-middle-content">
          <form onSubmit={handleSubmit}>
            <div className="Disposition-form-section">
              <div className="Disposition-form-item">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="Disposition-form-item">
                <label>Description</label>
                <textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>


            <div className="Disposition-modal-buttons">
              <CancelButton onClick={onClose} className="Disposition-cancel-btn" />
              <SaveButton
                onClick={handleSubmit} className="Disposition-save-btn"
                label={item ? "Update" : "Save"}
              />
            </div>
          </form>


        </div>


      </div>
    </div>
  );
};

export default DispositionPopup;
