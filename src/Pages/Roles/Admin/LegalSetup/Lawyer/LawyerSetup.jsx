import React, { useEffect, useState } from "react";
import EditLawyerPopup from "./EditLawyerPopup";
import IconButton from "../../../../ReusableComponents/IconButton";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid";
import "./EditLawyerPopup.css";

function LawyerSetup() {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLawyers = () => {
    fetch("/api/api/lawyers")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === "SUCCESS") {
          setLawyers(data.data);
        } else {
          console.error("API responded with failure:", data.message);
        }
      })
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
    { key: "name", label: "Full Name" },
    { key: "primaryNo", label: "Phone", render: (row) => row.primaryNo || "N/A" },
    { key: "email", label: "Email" },
    {
      key: "courts",
      label: "Court",
      render: (row) =>
        row.courts && row.courts.length > 0 ? row.courts[0] : "N/A",
    },
    {
      key: "totalExperience",
      label: "Experience",
      render: (row) => `${row.totalExperience ?? "N/A"} yrs`,
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => row.rating || "N/A",
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
