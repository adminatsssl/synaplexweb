import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBorrower.css";
import JSONBig from "json-bigint";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const AddBorrower = ({ onClose, onSave, selectedBorrower }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    CreditScore: "",
    JobTitle: "",
    MonthlyIncome: "",
  });

  useEffect(() => {
    if (selectedBorrower) {
      setFormData({
        Name: selectedBorrower.Name || "",
        Phone: selectedBorrower.Phone || "",
        Email: selectedBorrower.Email || "",
        Address: selectedBorrower.Address || "",
        CreditScore: selectedBorrower.CreditScore || "",
        JobTitle: selectedBorrower.JobTitle || "",
        MonthlyIncome: selectedBorrower.MonthlyIncome || "",
      });
    }
  }, [selectedBorrower]);

  useEffect(() => {
    if (selectedBorrower) {
      setFormData({
        Name: selectedBorrower.Name || "",
        Phone: selectedBorrower.Phone || "",
        Email: selectedBorrower.Email || "",
        Address: selectedBorrower.Address || "",
        CreditScore: selectedBorrower.CreditScore || "",
        JobTitle: selectedBorrower.JobTitle || "",
        MonthlyIncome: selectedBorrower.MonthlyIncome || "",
      });
    }
  }, [selectedBorrower]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "CreditScore"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
      [name]:
        name === "CreditScore"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: formData.Name,
      Phone: formData.Phone,
      Email: formData.Email,
      Address: formData.Address,
      CreditScore: formData.CreditScore,
      JobTitle: formData.JobTitle,
      MonthlyIncome: formData.MonthlyIncome, // Leave as string
    };

    try {
      let response;

      const borrowerId = selectedBorrower?.ID || selectedBorrower?.id;

      if (borrowerId) {
        // Patch using json-bigint for safe stringification
        response = await axios.patch(
          `/odata/postapiservice/Borrowers(${borrowerId})`,
          JSONBig.stringify(payload), // Use json-bigint to stringify
          {
            headers: {
              "Content-Type": "application/json",
            },
            transformRequest: [(data) => data], // Prevent axios from auto-stringifying
          }
        );
      } else {
        // Standard POST, default JSON.stringify is fine
        response = await axios.post(
          "/odata/postapiservice/Borrowers",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if ([200, 201, 204].includes(response.status)) {
        onSave();
      } else {
        alert("Failed to save borrower data.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Save error:", error);
        alert(`Error: ${error.message}`);
      }
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Save error:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="addborrower-modal">
      <div className="addborrower-content">
        <div className="addborrower-header">
          {selectedBorrower ? "Edit Borrower" : "Add Borrower"}
        </div>
        <div className="addborrower-middlecontent">
        <form onSubmit={handleSubmit}>
          <div className="addborrower-body grid-2">
            {[
              "Name",
              "Phone",
              "Email",
              "Address",
              "CreditScore",
              "JobTitle",
              "MonthlyIncome",
            ].map((field) => (
              <div className="form-item" key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  name={field}
                  type={
                    field === "CreditScore" || field === "MonthlyIncome"
                      ? "number"
                      : "text"
                  }
                  placeholder={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div
            className="addborrower-footer"
            style={{ display: "flex", gap: "10px" }}
          >
            <CancelButton onClick={onClose} />
            <SaveButton
              onClick={handleSubmit}
              label={selectedBorrower ? "Update" : "Save"}
            />
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default AddBorrower;
