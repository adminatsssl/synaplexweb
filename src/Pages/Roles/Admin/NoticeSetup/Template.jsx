import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../Layout/Layout.jsx";
import "./Template.css";
import IconButton from "../../../ReusableComponents/IconButton";
import AddButton from "../../../ReusableComponents/AddButton";
import { CiImport } from "react-icons/ci";
import TemplatePopup from "./TemplatePopup";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const NoticeSetupTemplate = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  const handleAdd = () => {
    setSelectedTemplate(null);
    setShowPopup(true);
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("/api/api/templates");
      if (response.data.status === "SUCCESS") {
        const formattedData = response.data.data.map((template) => ({
          ...template,
          createdOn: new Date().toLocaleDateString(), // If no date is returned by API
        }));
        setTemplates(formattedData);
      } else {
        console.error("Failed to fetch templates:", response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSave = () => {
    fetchTemplates(); // Refresh the templates list
  };

  const handleDelete = async (template) => {
    if (!template.id) {
      alert('Cannot delete template: Missing template ID');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete the template "${template.name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/api/templates/${template.id}`);
      if (response.data.status === 'SUCCESS') {
        alert('Template deleted successfully!');
        fetchTemplates(); // Refresh the list
      } else {
        alert('Failed to delete template: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      alert('Failed to delete template: ' + errorMessage);
    }
  };

  const columns = [
    { key: "name", label: "Template Name" },
    { key: "createdOn", label: "Created On" },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (template) => (
        <div className="text-right space-x-2">
          <IconButton type="edit" onClick={() => handleEdit(template)} />
          <IconButton 
            type="delete" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent any parent handlers from firing
              handleDelete(template);
            }} 
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="noticesetuptemplate">
        <div className="noticesetuptemplate-topbar">
          <div className="noticesetuptemplate-heading">
            <h1>Templates</h1>
          </div>

          <div className="noticesetuptemplate-btn">
            <button className="noticesetuptemplate-importbtn">
              <CiImport /> Import
            </button>
            <AddButton text="Template" onClick={handleAdd} />
          </div>
        </div>

        <div className="border rounded shadow bg-white overflow-x-auto">
          {loading ? (
            <p className="p-4">Loading templates...</p>
          ) : (
            <ReusableGrid columns={columns} data={templates} />
          )}
        </div>

        {showPopup && (
          <TemplatePopup
            onClose={() => setShowPopup(false)}
            templateData={selectedTemplate}
            onSave={handleSave}
          />
        )}
      </div>
    </Layout>
  );
};

export default NoticeSetupTemplate;
