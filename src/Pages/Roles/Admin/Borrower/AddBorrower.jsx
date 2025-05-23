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
      Name: selectedBorrower.name || "",
      Phone: selectedBorrower.contactNumber || "",
      Email: selectedBorrower.email || "",
      Address: selectedBorrower.address?.addressLine || "",
      City: selectedBorrower.address?.city || "",
      State: selectedBorrower.address?.state || "",
      Pincode: selectedBorrower.address?.pincode || "",
      CreditScore: selectedBorrower.creditScore ?? "",
      JobTitle: selectedBorrower.jobTitle || "",
      MonthlyIncome: selectedBorrower.monthlyIncome ?? "",
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
    name: formData.Name,
    contactNumber: formData.Phone,
    email: formData.Email,
    creditScore: formData.CreditScore,
    jobTitle: formData.JobTitle,
    monthlyIncome: formData.MonthlyIncome,
    address: {
      addressLine: formData.Address,
      city: formData.City,
      state: formData.State,
      pincode: formData.Pincode,
    },
  };

  try {
    if (selectedBorrower?.id) {
      // PUT request for update
      const response = await axios.put(
        `/api/api/borrowers/${selectedBorrower.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if ([200, 204].includes(response.status)) {
        onSave();
      } else {
        alert("Failed to update borrower.");
      }
    } else {
      // POST request for new
      const response = await axios.post("/api/api/borrowers", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if ([200, 201].includes(response.status)) {
        onSave();
      } else {
        alert("Failed to create borrower.");
      }
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
