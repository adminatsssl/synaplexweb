import React, { useEffect, useState } from "react";
import EditLawyerPopup from "./EditLawyerPopup";
import IconButton from "../../../../ReusableComponents/IconButton";
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lawyers</h1>
      <div className="bg-white border rounded shadow">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Full Name</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Court</th>
              <th className="border px-4 py-2 text-left">Experience</th>
              <th className="border px-4 py-2 text-left">Rating</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer.ID}>
                <td className="border px-4 py-2">{lawyer.Account?.FullName || "N/A"}</td>
                <td className="border px-4 py-2">{lawyer.PrimaryNo || "N/A"}</td>
                <td className="border px-4 py-2">{lawyer.Email || "N/A"}</td>
                <td className="border px-4 py-2">
                  {lawyer.Courts && lawyer.Courts.length > 0
                    ? lawyer.Courts[0].Name
                    : "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {lawyer.ExperienceYears ?? "N/A"}
                </td>
                <td className="border px-4 py-2">{lawyer.Rating ?? "N/A"}</td>
                <td className="border px-4 py-2">
                <IconButton type="edit" onClick={() => handleEdit(lawyer)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Replaced EditModal with external EditLawyerPopup */}
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
