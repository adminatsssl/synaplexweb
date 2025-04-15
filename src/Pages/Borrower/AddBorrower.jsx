import React, { useState } from "react";
import axios from "axios";
import "./AddBorrower.css";

const AddBorrower = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    CreditScore: 0,
    JobTitle: "",
    MonthlyIncome: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "CreditScore" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        CreditScore: parseFloat(formData.CreditScore),
        MonthlyIncome: formData.MonthlyIncome.toString(),
      };

      await axios.post("/odata/postapiservice/Borrowers", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Borrower added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding borrower:", error);
      alert("Failed to add borrower. See console for more info.");
    }
  };

  return (
    <div className="borrower-modal">
      <div className="borrower-header">Borrower</div>
      <div className="borrower-body">
        <input name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} />
        <input name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} />
        <input name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
        <input name="Address" placeholder="Address" value={formData.Address} onChange={handleChange} />
        <input name="CreditScore" type="number" placeholder="Credit Score" value={formData.CreditScore} onChange={handleChange} />
        <input name="JobTitle" placeholder="Job Title" value={formData.JobTitle} onChange={handleChange} />
        <input name="MonthlyIncome" placeholder="Monthly Income" value={formData.MonthlyIncome} onChange={handleChange} />
      </div>
      <div className="borrower-footer">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddBorrower;
