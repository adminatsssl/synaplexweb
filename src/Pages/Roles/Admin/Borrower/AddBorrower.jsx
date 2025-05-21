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
    City: "",
    State: "",
    Pincode: "",
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
        City: selectedBorrower.City || "",
        State: selectedBorrower.State || "",
        Pincode: selectedBorrower.Pincode || "",
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
      [name]: name === "CreditScore" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: formData.Name,
      Phone: formData.Phone,
      Email: formData.Email,
      Address: formData.Address,
      City: formData.City,
      State: formData.State,
      Pincode: formData.Pincode,
      CreditScore: formData.CreditScore,
      JobTitle: formData.JobTitle,
      MonthlyIncome: formData.MonthlyIncome,
    };

    try {
      const borrowerId = selectedBorrower?.ID || selectedBorrower?.id;
      const response = borrowerId
        ? await axios.patch(
            `/odata/postapiservice/Borrowers(${borrowerId})`,
            JSONBig.stringify(payload),
            {
              headers: { "Content-Type": "application/json" },
              transformRequest: [(data) => data],
            }
          )
        : await axios.post("/odata/postapiservice/Borrowers", payload, {
            headers: { "Content-Type": "application/json" },
          });

      if ([200, 201, 204].includes(response.status)) {
        onSave();
      } else {
        alert("Failed to save borrower data.");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data || error.message || "Unknown error occurred";
      console.error("Error saving borrower:", errorMsg);
      alert(`Error: ${JSON.stringify(errorMsg)}`);
    }
  };

  return (
    <div className="addborrower-modal">
      <div className="addborrower-content">
        <div className="addborrower-header">
          {selectedBorrower ? "Edit Borrower" : "Add Borrower"}
          <div className="addborrower-closebtn" onClick={onClose}>X</div>
        </div>

        <div className="addborrower-middlecontent">
          <form onSubmit={handleSubmit}>
            <div className="addborrower-body grid-2">
              {["Name", "Phone", "Email", "CreditScore", "JobTitle", "MonthlyIncome"].map((field) => (
                <div className="addborrower-form-item" key={field}>
                  <label htmlFor={field}>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    id={field}
                    name={field}
                    type={field === "CreditScore" || field === "MonthlyIncome" ? "number" : "text"}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="addborrower-address-container">
                <div className="addborrower-addressline">
                  <div className="addborrower-form-item">
                    <label htmlFor="Address">Address Line</label>
                    <input
                      id="Address"
                      name="Address"
                      type="text"
                      placeholder="Address"
                      value={formData.Address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="addborrower-pincode-city-state">
                  {["City", "State", "Pincode"].map((field) => (
                    <div className="addborrower-form-item" key={field}>
                      <label htmlFor={field}>{field}</label>
                      <input
                        id={field}
                        name={field}
                        type="text"
                        placeholder={field}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="addborrower-footer" style={{ display: "flex", gap: "10px" }}>
              <CancelButton onClick={onClose} />
              <SaveButton onClick={handleSubmit} label={selectedBorrower ? "Update" : "Save"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBorrower;
