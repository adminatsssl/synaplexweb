import React, { useState } from "react";
import IconButton from "../../../ReusableComponents/IconButton";
import Layout from "../../../Layout/Layout";
import "./KeyConfig.css";
import AddButton from "../../../ReusableComponents/AddButton";
import KeyConfigModal from "./KeyConfigModal";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const KeyConfig = () => {
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

  const keyData = [
    { keyname: "Google Maps", apikey: "AIza123..." },
    { keyname: "SendGrid", apikey: "SG.abc123..." },
  ];

  const columns = [
    { key: "keyname", label: "Key Name" },
    { key: "apikey", label: "API Key" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (item) => (
        <div className="text-right space-x-2">
          <IconButton type="edit" onClick={() => handleEditClick(item)} />
          <IconButton type="delete" />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen text-sm font-medium text-gray-800">
        <div className="flex items-center justify-between mb-4 keyconfig-topbar">
          <div className="keyconfig-heading">
            <h1 className="text-2xl font-semibold text-gray-900">
              API Key Configuration
            </h1>
          </div>
          <div className="keyconfig-addbtn" onClick={handleAddClick}>
            <AddButton text="Add API Key" />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded">
          <ReusableGrid columns={columns} data={keyData} />
        </div>

        {showModal && (
          <KeyConfigModal
            onClose={handleCloseModal}
            initialData={editingItem}
          />
        )}
      </div>
    </Layout>
  );
};

export default KeyConfig;
