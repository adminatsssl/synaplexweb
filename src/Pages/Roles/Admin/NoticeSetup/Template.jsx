import React, { useState } from "react";
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

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  const handleAdd = () => {
    setSelectedTemplate(null);
    setShowPopup(true);
  };

  const templates = [
    { id: 1, name: "Template", createdOn: "2/2/2025", isDefault: true },
  ];

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
          <IconButton type="delete" />
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
          <ReusableGrid columns={columns} data={templates} />
        </div>

        {showPopup && (
          <TemplatePopup
            onClose={() => setShowPopup(false)}
            templateData={selectedTemplate}
          />
        )}
      </div>
    </Layout>
  );
};

export default NoticeSetupTemplate;
