import React, { useState } from "react";
import IconButton from "../../../ReusableComponents/IconButton";
import Layout from "../../../Layout/Layout";
import "./StageConfig.css";
import AddButton from "../../../ReusableComponents/AddButton";
import StageTemplateModal from "./StageTemplateModal";

const StageConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddClick = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen text-sm font-medium text-gray-800">
        <div className="flex items-center justify-between mb-4 stageconfigtopbar">
          <div className="stageconfigHeading">
            <h1 className="text-2xl font-semibold text-gray-900">
              Stages Template
            </h1>
          </div>
          <div className="stageconfigaddbtn" onClick={handleAddClick}>
            <AddButton text="" />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Case Type</th>
                <th className="px-4 py-3 text-left">Stage Name</th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { caseType: "SARFAESI", name: "Demand Notice Generation" },
                { caseType: "Cheque Bounce", name: "Demand Notice Generation" },
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.caseType}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <IconButton type="edit" onClick={() => handleEditClick(item)} />
                    <IconButton type="delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <StageTemplateModal
            onClose={handleCloseModal}
            initialData={editingItem}
          />
        )}
      </div>
    </Layout>
  );
};

export default StageConfig;
