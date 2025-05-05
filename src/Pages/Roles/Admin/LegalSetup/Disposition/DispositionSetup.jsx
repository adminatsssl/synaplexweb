// DispositionSetup.jsx
import React, { useEffect, useState } from "react";
import DispositionPopup from "./DispositionPopup";
import AddButton from "../../../../ReusableComponents/AddButton";
import IconButton from "../../../../ReusableComponents/IconButton";
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

  return (
    <div className="legal-case-type-container">
      <div className="card">
        <div className="card-header">
          {/* <h3>Disposition Stages</h3> */}
          <AddButton
            text="Add Disposition"
            onClick={() => {
              setSelectedItem(null);
              setShowPopup(true);
            }}
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
              {dispositions.map((item) => (
                <tr key={item.ID}>
                  <td>{item.Name}</td>
                  <td>{item.Description}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <IconButton type="edit" onClick={() => handleEdit(item)} />
                    <IconButton
                      type="delete"
                      onClick={() => handleDelete(item.ID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
