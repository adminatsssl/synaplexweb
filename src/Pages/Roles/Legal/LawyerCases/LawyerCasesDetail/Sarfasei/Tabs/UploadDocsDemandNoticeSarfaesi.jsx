import React, { useState } from "react";
import "./UploadDocs.css";
import SaveButton from "../../../../../../ReusableComponents/SaveButton";
import CancelButton from "../../../../../../ReusableComponents/CancelButton";

const UploadDocsDemandNoticeSarfaesi = ({ isOpen, onClose, onSave }) => {
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (docName && file) {
      onSave({ docName, file });
      setDocName("");
      setFile(null);
    }
  };

  return (
    <div className="upload-docs-modal-overlay">
      <div className="upload-docs-modal">
        <div className="upload-docs-header">
          <span className="upload-docs-title">Documents</span>
          <button className="upload-docs-close" onClick={onClose}>&times;</button>
        </div>
        <div className="upload-docs-body">
          <label className="upload-docs-label">Document Name</label>
          <input
            className="upload-docs-input"
            type="text"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Enter document name"
          />
          <div className="upload-docs-file-section">
            <label className="upload-docs-file-label">Select File</label>
            <div className="upload-docs-file-box">
              <input
                className="upload-docs-file-input"
                type="file"
                onChange={handleFileChange}
              />
              {file && <span className="upload-docs-file-name">{file.name}</span>}
            </div>
          </div>
        </div>
        <div className="upload-docs-footer">
          {/* <button className="upload-docs-cancel" onClick={onClose}>Cancel</button>
          <button className="upload-docs-save" onClick={handleSave}>SAVE</button> */}

          <CancelButton className="upload-docs-cancel" onClick={onClose} />
          <SaveButton className="upload-docs-save" onClick={handleSave} label={"Save"}/>
        </div>
      </div>
    </div>
  );
};

export default UploadDocsDemandNoticeSarfaesi;
