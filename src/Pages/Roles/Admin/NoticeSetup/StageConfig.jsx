import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "../../../ReusableComponents/IconButton";
import Layout from "../../../Layout/Layout";
import "./StageConfig.css";
import AddButton from "../../../ReusableComponents/AddButton";
import StageTemplateModal from "./StageTemplateModal";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const StageConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stageData, setStageData] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/api/templates/attachedTemplatesList", {
        headers: getAuthHeaders()
      });
      // Map the API response to the structure expected by your table
      const mappedData = response.data.map((item) => ({
        caseType: item.workflowTypeName,
        name: item.stageName,
        templateName: item.templateName,
      }));
      setStageData(mappedData);
    } catch (error) {
      console.error("Error fetching stage data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const columns = [
    { key: "caseType", label: "Case Type" },
    { key: "name", label: "Stage Name" },
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
        <div className="flex items-center justify-between mb-4 stageconfigtopbar">
          <div className="stageconfigHeading">
            <h1 className="text-2xl font-semibold text-gray-900">
              Stages Template
            </h1>
          </div>
          <div className="stageconfigaddbtn" onClick={handleAddClick}>
            <AddButton text="Add Stages" />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded">
          <ReusableGrid columns={columns} data={stageData} />
        </div>

        {showModal && (
          <StageTemplateModal
            onClose={handleCloseModal}
            initialData={editingItem}
            onSave={fetchData}
          />
        )}
      </div>
    </Layout>
  );
};

export default StageConfig;
