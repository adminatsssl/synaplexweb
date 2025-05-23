import React, { useEffect, useState } from "react";
import "./LegalCaseTypeSetup.css";
import LegalCaseTypePopup from "./LegalCaseTypePopup";
import IconButton from "../../../../ReusableComponents/IconButton";
import JSONbig from 'json-bigint';
import AddButton from '../../../../ReusableComponents/AddButton';
import ReusableGrid from '../../../../ReusableComponents/ReusableGrid';

const LegalCaseTypeSetup = () => {
  const [legalCaseTypes, setLegalCaseTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchLegalCaseTypes = async () => {
    try {
      const res = await fetch("/api/api/legalCaseTypes");
      const text = await res.text();
      const parsed = JSONbig.parse(text);
      console.log(parsed);

      if (parsed.status === "SUCCESS") {
        setLegalCaseTypes(parsed.data);
      } else {
        console.error("Failed to fetch case types:", parsed.message);
      }
    } catch (error) {
      console.error("Error fetching legal case types:", error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    try {
      const stringId = id.toString();
      console.log("Deleting ID: " + stringId);
      await fetch(`/api/api/legalCaseTypes/${stringId}`, {
        method: "DELETE",
      });

      fetchLegalCaseTypes();
    } catch (error) {
      console.error("Error deleting legal case type:", error);
    }
  };

  useEffect(() => {
    fetchLegalCaseTypes();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <IconButton type="edit" onClick={() => handleEdit(item)} />
          <IconButton type="delete" onClick={() => handleDelete(item.id)} />
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
