import React, { useEffect, useState } from "react";
import EditLawyerPopup from "./EditLawyerPopup";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid"; // Adjust path as needed
import "./EditLawyerPopup.css";

function LawyerSetup() {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLawyers = () => {
    fetch("/odata/v1/Lawyers?$expand=Courts,Account")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setLawyers(data.value))
      .catch((err) => console.error("Error fetching lawyers:", err));
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleEdit = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLawyer(null);
  };

  const columns = [
    {
      key: "Account.FullName",
      label: "Full Name",
      render: (row) => row.Account?.FullName || "N/A",
    },
    { key: "PrimaryNo", label: "Phone" },
    { key: "Email", label: "Email" },
    {
      key: "Courts.Name",
      label: "Court",
      render: (row) =>
        row.Courts && row.Courts.length > 0 ? row.Courts[0].Name : "N/A",
    },
    {
      key: "ExperienceYears",
      label: "Experience",
      render: (row) => row.ExperienceYears ?? "N/A",
    },
    {
      key: "Rating",
      label: "Rating",
      render: (row) => row.Rating ?? "N/A",
    },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <IconButton type="edit" onClick={() => handleEdit(row)} />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="lawyer-setup-container">
        <ReusableGrid columns={columns} data={lawyers} />
      </div>

      <EditLawyerPopup
        isOpen={isModalOpen}
        lawyer={selectedLawyer}
        onClose={handleCloseModal}
        onSave={fetchLawyers}
      />
    </div>
  );
}

export default LawyerSetup;
