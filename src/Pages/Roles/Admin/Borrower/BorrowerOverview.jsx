import React, { useEffect, useState } from "react";
import axios from "axios";
import JSONBig from "json-bigint";
import IconButton from "../../../ReusableComponents/IconButton";
import AddBorrower from "./AddBorrower";
import "./BorrowerOverview.css";
import Layout from "../../../Layout/Layout";
import AddButton from "../../../ReusableComponents/AddButton";

const BorrowerOverview = () => {
  const username = localStorage.getItem("username");
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const fetchBorrowers = () => {
    setLoading(true);
    axios
      .get("/odata/postapiservice/Borrowers", {
        transformResponse: [
          function (data) {
            try {
              return JSONBig.parse(data).value || JSONBig.parse(data);
            } catch (err) {
              console.warn("JSONBig parse error:", err);
              return [];
            }
          },
        ],
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBorrowers(response.data);
        } else {
          console.warn("Unexpected response format:", response.data);
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
    const stringId = id.toString(); // Use JSONBig stringified ID
    console.log("Deleting ID:", stringId);
    try {
      const response = await fetch(
        `/odata/postapiservice/Borrowers(${stringId})`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Borrower ${stringId} deleted successfully.`);
        fetchBorrowers(); // Refresh list
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
          <table className="borrower-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Credit Score</th>
                <th>Job Title</th>
                <th>Monthly Income</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowers.map((b, index) => (
                <tr key={index}>
                  <td>{b.Name}</td>
                  <td>{b.Phone}</td>
                  <td>{b.Email}</td>
                  <td>{b.Address}</td>
                  <td>{b.CreditScore}</td>
                  <td>{b.JobTitle}</td>
                  <td>{b.MonthlyIncome}</td>
                  <td>
                    <IconButton
                      type="edit"
                      onClick={() => handleEditBorrower(b)}
                    />
                    <IconButton
                      type="delete"
                      onClick={() => handleDelete(b.ID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
