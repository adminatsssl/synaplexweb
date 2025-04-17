import React, { useState, useEffect } from "react";
import "./LegalCaseTypeSetup.css";

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
    <div className="popup">
      <div className="popup-content">
        <h3>{item ? "Edit" : "Add"} Legal Case Type</h3>
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
          <div className="buttons">
            <button type="submit">{item ? "Update" : "Create"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LegalCaseTypePopup;
