import React, { useEffect, useState } from "react";
import './DispositionSetup.css'; // Make sure this points to the correct file

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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">{item ? "Edit Disposition" : "Add Disposition"}</div>
        <form onSubmit={handleSubmit}>
        <div className="form-section">
  <div className="form-item">
    <label>Name</label>
    <input
      type="text"
      placeholder="Enter name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="form-item">
    <label>Description</label>
    <textarea
      placeholder="Enter description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={3}
    />
  </div>
</div>


          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {item ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DispositionPopup;
