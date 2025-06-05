import React, { useEffect, useState } from "react";
import DispositionPopup from "./DispositionPopup";
import AddButton from "../../../../ReusableComponents/AddButton";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import JSONbig from "json-bigint";
import "./DispositionSetup.css";

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const DispositionSetup = () => {
  const [dispositions, setDispositions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchDispositions = async () => {
    try {
      const res = await fetch("/api/api/dispositions", {
        headers: getAuthHeaders()
      });
      const text = await res.text();
      const parsed = JSONbig.parse(text);

      if (parsed.status === "SUCCESS") {
        setDispositions(parsed.data);
      } else {
        console.error("Failed to fetch dispositions:", parsed.message);
      }
    } catch (error) {
      console.error("Error fetching dispositions:", error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    try {
      const stringId = id.toString();
      await fetch(`/api/api/dispositions/${stringId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      fetchDispositions();
    } catch (error) {
      console.error("Error deleting disposition:", error);
    }
  };

  useEffect(() => {
    fetchDispositions();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
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
            text="Add Disposition"
            onClick={() => {
              setSelectedItem(null);
              setShowPopup(true);
            }}
          />
        </div>

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
