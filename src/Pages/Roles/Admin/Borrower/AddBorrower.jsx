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
          <div className="addborrower-closebtn" onClick={onClose} >X</div>
        </div>
        
        <div className="addborrower-middlecontent">
          <form onSubmit={handleSubmit}>
            <div className="addborrower-body grid-2">
              <div className="addborrower-form-item">
                <label htmlFor="Name">Name</label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>

              <div className="addborrower-form-item">
                <label htmlFor="Phone">Phone</label>
                <input
                  id="Phone"
                  name="Phone"
                  type="text"
                  placeholder="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                />
              </div>

              <div className="addborrower-form-item">
                <label htmlFor="Email">Email</label>
                <input
                  id="Email"
                  name="Email"
                  type="text"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>
              <div className="addborrower-form-item">
                <label htmlFor="CreditScore">Credit Score</label>
                <input
                  id="CreditScore"
                  name="CreditScore"
                  type="number"
                  placeholder="Credit Score"
                  value={formData.CreditScore}
                  onChange={handleChange}
                />
              </div>

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
                  <div className="addborrower-form-item">
                    <label htmlFor="City">City</label>
                    <input
                      id="City"
                      name="City"
                      type="text"
                      placeholder="City"
                      value={formData.City}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="addborrower-form-item">
                    <label htmlFor="State">State</label>
                    <input
                      id="State"
                      name="State"
                      type="text"
                      placeholder="State"
                      value={formData.State}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="addborrower-form-item">
                    <label htmlFor="Pincode">Pincode</label>
                    <input
                      id="Pincode"
                      name="Pincode"
                      type="text"
                      placeholder="Pincode"
                      value={formData.Pincode}
                      onChange={handleChange}
                    />
                  </div>


                </div>




              </div>





              <div className="addborrower-form-item">
                <label htmlFor="JobTitle">Job Title</label>
                <input
                  id="JobTitle"
                  name="JobTitle"
                  type="text"
                  placeholder="Job Title"
                  value={formData.JobTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="addborrower-form-item">
                <label htmlFor="MonthlyIncome">Monthly Income</label>
                <input
                  id="MonthlyIncome"
                  name="MonthlyIncome"
                  type="number"
                  placeholder="Monthly Income"
                  value={formData.MonthlyIncome}
                  onChange={handleChange}
                />
              </div>
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
