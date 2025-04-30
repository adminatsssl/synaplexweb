
import React, { useEffect, useState } from "react";
import "./LegalCaseTypeSetup.css";
import LegalCaseTypePopup from "./LegalCaseTypePopup";
import IconButton from "../../../../ReusableComponents/IconButton";
import JSONbig from 'json-bigint';
import AddButton from '../../../../ReusableComponents/AddButton';

const LegalCaseTypeSetup = () => {
  const [legalCaseTypes, setLegalCaseTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchLegalCaseTypes = async () => {
    const res = await fetch("/legalcasetype/LegalCaseTypes");
    const text = await res.text();
    const data = JSONbig.parse(text);
  
    setLegalCaseTypes(data.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const stringId = id.toString(); // Ensures precision
    console.log("Deleting ID: " + stringId);
    await fetch(`/legalcasetype/LegalCaseTypes(${stringId})`, {
      method: "DELETE",
    });
    fetchLegalCaseTypes();
  };
  

  useEffect(() => {
    fetchLegalCaseTypes();
  }, []);

  return (
    <div className="legal-case-type-container">
      <div className="card">
        <div className="card-header">
          <h3>Legal Case Type</h3>
          <AddButton
            text="Add Case-Type"
            onClick={() => { setSelectedItem(null); setShowPopup(true); }}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {legalCaseTypes.map((item) => (
                <tr key={item.ID}>
                  <td>{item.Name}</td>
                  <td>{item.Description}</td>
                  <td style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <IconButton type="edit" onClick={() => handleEdit(item)} />
                    <IconButton type="delete" onClick={() => handleDelete(item.ID)} />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <LegalCaseTypePopup
          onClose={() => setShowPopup(false)}
          onSave={fetchLegalCaseTypes}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default LegalCaseTypeSetup;
