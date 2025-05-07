import React, { useState, useEffect } from "react";
import "./LegalCaseTypeSetup.css";
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

const LegalCaseTypePopup = ({ onClose, onSave, item }) => {
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
    const body = { Name: name, Description: description };
  
    if (item) {
      // Update
      await fetch(`/legalcasetype/LegalCaseTypes(${item.ID.toString()})`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      // Create
      await fetch("/legalcasetype/LegalCaseTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
  
    onSave();
    onClose();
  };
  

  return (
    <div className="legalcasetype-popup">
      <div className="legalcasetype-popup-content">
        <div className="legalcasetype-header">
        <h3>{item ? "Edit" : "Add"} Legal Case Type</h3>
        </div>
        
        <div className="legalcasetype-middlecontent">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="legalcasetype-buttons">
          <CancelButton onClick={onClose} />
            <SaveButton
              onClick={handleSubmit}
              label={item ? "Update" : "Save"}
            />
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default LegalCaseTypePopup;
