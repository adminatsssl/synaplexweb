import React, { useState, useEffect } from "react";
import "./Template.css";
import PlainTextTab from "./TemplateSetUp/PlainText/PlainTextTab.jsx";
import EmailTab from './TemplateSetUp/Email/EmailTab.jsx';
import PDFTab from './TemplateSetUp/PDF/PDFTab.jsx';
import WhatsAppTab from "./TemplateSetUp/Whatsapp/WhatsappTab.jsx";
import AttachmentsTab from "./TemplateSetUp/Attachment/AttachmentsTab.jsx";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const tabs = ["Plain text", "Email", "PDF", "WhatsApp", "Attachments"];

const TemplatePopup = ({ onClose, templateData }) => {
  const [activeTab, setActiveTab] = useState("Plain text");
  const [templateName, setTemplateName] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (templateData) {
      setTemplateName(templateData.name || "");
      setIsDefault(templateData.isDefault || false);
    } else {
      setTemplateName("");
      setIsDefault(false);
    }
  }, [templateData]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Plain text":
        return <PlainTextTab />;
      case "Email":
        return <EmailTab />;
      case "PDF":
        return <PDFTab />;
      case "WhatsApp":
        return <WhatsAppTab />;
      case "Attachments":
        return <AttachmentsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="templatesetup-popup-overlay">
      <div className="templatesetup-popup-content">
        <div className="templatesetup-popup-header">
          <h4>{templateData ? "Edit Template" : "New Template"}</h4>
          <button onClick={onClose} className="templatesetup-close-btn">X</button>
        </div>

        <div className="templatesetup-middlecontainer">
          <div className="templatesetup-heading">
            <h3>Template Details</h3>
            <div className="templatesetup-secondtopbarheading">
              <div className="templatesetup-templateinput">
                <label>Template Name</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>

              <div className="templatesetup-templatecheckbox">
                <label className="templatesetup-switch-label">
                  Default Template
                  <label className="templatesetup-switch">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    <span className="templatesetup-slider templatesetup-round"></span>
                  </label>
                </label>
              </div>
            </div>
          </div>

          <div className="templatesetup-midpartheading">
            <h3>Template Content</h3>
          </div>

          <div className="templatesetup-tab-section">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`templatesetup-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="templatesetup-tab-content">{renderTabContent()}</div>

          <div className="templatesetup-popup-actions">

          <CancelButton onClick={onClose} className="templatesetup-cancel-btn" />
        <SaveButton
           className="templatesetup-save-btn"
          label={templateData ? "Update" : "Save"}
        />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePopup;
