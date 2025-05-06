import React, { useEffect, useState } from "react";
import DispositionPopup from "./DispositionPopup";
import AddButton from "../../../../ReusableComponents/AddButton";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid"; // ✅ import
import JSONbig from "json-bigint";
import "./DispositionSetup.css";

const DispositionSetup = () => {
  const [dispositions, setDispositions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchDispositions = async () => {
    const res = await fetch("/odata/WorkflowDispositionStages");
    const text = await res.text();
    const data = JSONbig.parse(text);
    setDispositions(data.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const stringId = id.toString();
    await fetch(`/odata/WorkflowDispositionStages(${stringId})`, {
      method: "DELETE",
    });
    fetchDispositions();
  };

  useEffect(() => {
    fetchDispositions();
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
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
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
            text="Add Disposition"
            onClick={() => {
              setSelectedItem(null);
              setShowPopup(true);
            }}
          />
        </div>

        {/* ✅ Replace table with reusable grid */}
        <ReusableGrid columns={columns} data={dispositions} />
      </div>

      {showPopup && (
        <DispositionPopup
          onClose={() => setShowPopup(false)}
          onSave={fetchDispositions}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default DispositionSetup;
