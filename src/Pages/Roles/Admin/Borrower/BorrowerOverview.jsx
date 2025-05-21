import React, { useEffect, useState } from "react";
import axios from "axios";
import JSONBig from "json-bigint";
import IconButton from "../../../ReusableComponents/IconButton";
import AddBorrower from "./AddBorrower";
import "./BorrowerOverview.css";
import Layout from "../../../Layout/Layout";
import AddButton from "../../../ReusableComponents/AddButton";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const BorrowerOverview = () => {
  const username = localStorage.getItem("username");
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const fetchBorrowers = () => {
    setLoading(true);
    axios
      .get("/api/api/borrowers")
      .then((response) => {
        const responseData = response.data;
        if (responseData.status === "SUCCESS" && Array.isArray(responseData.data)) {
          const transformedData = responseData.data.map((item) => ({
            ID: item.id,
            Name: item.name,
            Phone: item.contactNumber ?? "N/A",
            Email: item.email,
            Address: item.address
              ? `${item.address.city}, ${item.address.state}, ${item.address.pincode}`
              : "N/A",
            CreditScore: item.creditScore ?? "N/A",
            JobTitle: item.jobTitle ?? "N/A",
            MonthlyIncome: item.monthlyIncome ?? "N/A",
          }));
          setBorrowers(transformedData);
        } else {
          console.warn("Unexpected response format:", responseData);
          setBorrowers([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowers:", error);
        setBorrowers([]);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/borrowers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchBorrowers();
      } else {
        console.error("Failed to delete. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleAddBorrower = () => {
    setSelectedBorrower(null);
    setShowModal(true);
  };

  const handleEditBorrower = (borrower) => {
    setSelectedBorrower(borrower);
    setShowModal(true);
  };

  const columns = [
    { key: "Name", label: "Name" },
    { key: "Phone", label: "Phone" },
    { key: "Email", label: "Email" },
    { key: "Address", label: "Address" },
    { key: "CreditScore", label: "Credit Score" },
    { key: "JobTitle", label: "Job Title" },
    { key: "MonthlyIncome", label: "Monthly Income" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <IconButton type="edit" onClick={() => handleEditBorrower(row)} />
          <IconButton type="delete" onClick={() => handleDelete(row.ID)} />
        </div>
      ),
    },
  ];

  return (
    <Layout username={username}>
      <div className="borrower-container">
        <div className="borrower-title-row">
          <h2 className="borrower-title">Borrower</h2>
          <AddButton text="Add Borrower" onClick={handleAddBorrower} />
        </div>

        {loading ? (
          <div className="info-message">Loading...</div>
        ) : borrowers.length === 0 ? (
          <div className="info-message">No data found.</div>
        ) : (
          <ReusableGrid columns={columns} data={borrowers} />
        )}

        {showModal && (
          <AddBorrower
            onClose={() => {
              setShowModal(false);
              setSelectedBorrower(null);
            }}
            onSave={() => {
              fetchBorrowers();
              setShowModal(false);
              setSelectedBorrower(null);
            }}
            selectedBorrower={selectedBorrower}
          />
        )}
      </div>
    </Layout>
  );
};

export default BorrowerOverview;
