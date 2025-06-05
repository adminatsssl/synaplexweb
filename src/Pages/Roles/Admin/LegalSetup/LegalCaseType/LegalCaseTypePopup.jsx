import React, { useState, useEffect } from "react";
import "./LegalCaseTypeSetup.css";
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const LegalCaseTypePopup = ({ onClose, onSave, item }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

useEffect(() => {
  if (item) {
    setName(item.name || "");
    setDescription(item.description || "");
  }
}, [item]);


  const handleSubmit = async (e) => {
  e.preventDefault();
  const body = { name, description }; 

  const id = item?.id?.toString(); // use 'id', not 'ID'

  try {
    if (item) {
      // Update
      await fetch(`/api/api/legalCaseTypes/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
    } else {
      // Create
      await fetch("/api/api/legalCaseTypes", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
    }

    onSave();
    onClose();
  } catch (error) {
    console.error("Error saving LegalCaseType:", error);
  }
};



  return (
    <div className="legalcasetype-popup">
      <div className="legalcasetype-popup-content">
        <div className="legalcasetype-header">
          <h3>{item ? "Edit" : "Add"} Legal Case Type</h3>
          <button className="legalcasetype-closebutton" onClick={onClose}>X</button>
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
