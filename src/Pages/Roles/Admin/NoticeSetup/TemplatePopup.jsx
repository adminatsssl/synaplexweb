import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Template.css";
import PlainTextTab from "./TemplateSetUp/PlainText/PlainTextTab.jsx";
import EmailTab from './TemplateSetUp/Email/EmailTab.jsx';
import PDFTab from './TemplateSetUp/PDF/PDFTab.jsx';
import WhatsAppTab from "./TemplateSetUp/Whatsapp/WhatsappTab.jsx";
import AttachmentsTab from "./TemplateSetUp/Attachment/AttachmentsTab.jsx";
import SaveButton from "../../../ReusableComponents/SaveButton";
import CancelButton from "../../../ReusableComponents/CancelButton";

const tabs = ["Plain text", "Email", "PDF", "WhatsApp", "Attachments"];

const TemplatePopup = ({ onClose, templateData, onSave }) => {
  const [activeTab, setActiveTab] = useState("Plain text");
  const [formData, setFormData] = useState({
    name: "",
    defaultTemplate: false,
    emailSubject: "",
    emailBody: "",
    smsBody: "",
    pdfBody: "",
    whatsappBody: "",
  });

  useEffect(() => {
    if (templateData) {
      setFormData({
        name: templateData.name || "",
        defaultTemplate: templateData.defaultTemplate || false,
        emailSubject: templateData.emailSubject || "",
        emailBody: templateData.emailBody || "",
        smsBody: templateData.smsBody || "",
        pdfBody: templateData.pdfBody || "",
        whatsappBody: templateData.whatsappBody || "",
      });
    }
  }, [templateData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.name) {
        alert('Template name is required');
        return;
      }

      // Ensure at least one content type is filled
      if (!formData.smsBody && !formData.emailBody && !formData.pdfBody && !formData.whatsappBody) {
        alert('At least one template content (SMS, Email, PDF, or WhatsApp) is required');
        return;
      }

      const response = await axios.post('/api/api/templates', {
        name: formData.name,
        defaultTemplate: formData.defaultTemplate,
        emailSubject: formData.emailSubject,
        emailBody: formData.emailBody,
        smsBody: formData.smsBody,
        pdfBody: formData.pdfBody,
        whatsappBody: formData.whatsappBody
      });

      if (response.data.status === 'SUCCESS') {
        alert('Template created successfully!');
        if (onSave) onSave();
        onClose();
      } else {
        alert('Failed to create template: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating template:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      alert('Failed to create template: ' + errorMessage);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Plain text":
        return (
          <PlainTextTab 
            value={formData.smsBody}
            onChange={(e) => handleInputChange({ target: { name: 'smsBody', value: e.target.value } })}
          />
        );
      case "Email":
        return (
          <EmailTab 
            subject={formData.emailSubject}
            body={formData.emailBody}
            onSubjectChange={(e) => handleInputChange({ target: { name: 'emailSubject', value: e.target.value } })}
            onBodyChange={(e) => handleInputChange({ target: { name: 'emailBody', value: e.target.value } })}
          />
        );
      case "PDF":
        return (
          <PDFTab 
            value={formData.pdfBody}
            onChange={(e) => handleInputChange({ target: { name: 'pdfBody', value: e.target.value } })}
          />
        );
      case "WhatsApp":
        return (
          <WhatsAppTab 
            value={formData.whatsappBody}
            onChange={(e) => handleInputChange({ target: { name: 'whatsappBody', value: e.target.value } })}
          />
        );
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
                <label>Template Name<span className="required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter template name"
                />
              </div>

              <div className="templatesetup-templatecheckbox">
                <label className="templatesetup-switch-label">
                  Default Template
                  <label className="templatesetup-switch">
                    <input
                      type="checkbox"
                      name="defaultTemplate"
                      checked={formData.defaultTemplate}
                      onChange={handleInputChange}
                    />
                    <span className="templatesetup-slider templatesetup-round"></span>
                  </label>
                </label>
              </div>
            </div>
          </div>

          <div className="templatesetup-midpartheading">
            <h3>Template Content<span className="required">*</span></h3>
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
              onClick={handleSave}
              className="templatesetup-save-btn"
              label="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePopup;
