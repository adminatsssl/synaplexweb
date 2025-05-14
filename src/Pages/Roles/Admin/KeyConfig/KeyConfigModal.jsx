import React, { useState, useEffect } from "react";
import "./KeyConfig.css";

const KeyConfigModal = ({ onClose, initialData }) => {
  const [keyname, setKeyname] = useState("");
  const [apikey, setApikey] = useState("");

  useEffect(() => {
    if (initialData) {
      setKeyname(initialData.keyname);
      setApikey(initialData.apikey);
    }
  }, [initialData]);

  const handleSave = () => {
    const payload = { keyname, apikey };
    console.log("Save Data:", payload);
    onClose();
  };

  return (
    <div className="keyconfig-modal-overlay">
      <div className="keyconfig-modal">
        <div className="keyconfig-modal-header">
          {initialData ? "Edit API Key" : "Add API Key"}
          <button className="keyconfig-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="keyconfig-modal-body">
          <label>
            Key Name:
            <input
              type="text"
              value={keyname}
              onChange={(e) => setKeyname(e.target.value)}
            />
          </label>
          <label>
            API Key:
            <input
              type="text"
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
            />
          </label>
        </div>
        <div className="keyconfig-modal-footer">
          <button className="keyconfig-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyConfigModal;
