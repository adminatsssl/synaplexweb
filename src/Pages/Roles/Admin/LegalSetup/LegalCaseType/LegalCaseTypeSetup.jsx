import React, { useEffect, useState } from "react";
import "./LegalCaseTypeSetup.css";
import LegalCaseTypePopup from "./LegalCaseTypePopup";
import IconButton from "../../../../ReusableComponents/IconButton";
import JSONbig from 'json-bigint';
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid'; // ✅ Import it

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
    const stringId = id.toString();
    console.log("Deleting ID: " + stringId);
    await fetch(`/legalcasetype/LegalCaseTypes(${stringId})`, {
      method: "DELETE",
    });
    fetchLegalCaseTypes();
  };

  useEffect(() => {
    fetchLegalCaseTypes();
  }, []);

  // ✅ Define columns
  const columns = [
    { key: "Name", label: "Name" },
    { key: "Description", label: "Description" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <IconButton type="edit" onClick={() => handleEdit(item)} />
          <IconButton type="delete" onClick={() => handleDelete(item.ID)} />
        </div>
      )
    }
  ];

  return (
    <div className="legal-case-type-container">
      <div className="card">
        <div className="card-header">
          <AddButton
            text="Add Case-Type"
            onClick={() => {
              setSelectedItem(null);
              setShowPopup(true);
            }}
          />
        </div>

        {/* ✅ Use ReusableGrid instead of table */}
        <ReusableGrid columns={columns} data={legalCaseTypes} />
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
