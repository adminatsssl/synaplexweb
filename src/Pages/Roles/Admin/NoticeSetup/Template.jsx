// Import statements remain the same
import React, { useState } from "react";
import Layout from '../../../Layout/Layout.jsx'
import './Template.css'
import IconButton from "../../../ReusableComponents/IconButton";
import AddButton from "../../../ReusableComponents/AddButton";
import { CiImport } from "react-icons/ci";
import TemplatePopup from "./TemplatePopup"; // Import the popup component

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

  // Dummy template data
  const templates = [
    { id: 1, name: "Template", createdOn: "2/2/2025", isDefault: true },
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
              <CiImport />Import
            </button>
            <AddButton text="Template" onClick={handleAdd} />
          </div>
        </div>

        <div className="border rounded shadow bg-white overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border-b font-semibold">Template Name</th>
                <th className="p-4 border-b font-semibold">Created On</th>
                <th className="p-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {templates.map(template => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{template.name}</td>
                  <td className="px-4 py-3">{template.createdOn}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <IconButton type="edit" onClick={() => handleEdit(template)} />
                    <IconButton type="delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
