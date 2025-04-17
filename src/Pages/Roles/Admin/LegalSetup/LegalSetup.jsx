import React, { useState } from 'react';
import Layout from '../../../Layout/Layout';
import './LegalSetup.css'; // Import the CSS file
import CourtSetup from './Court/CourtSetup';
import LegalCaseTypeSetup from './LegalCaseType/LegalCaseTypeSetup';



const tabs = [
  "Court",
  "Legal Case Type",
  "Disposition",
  "Law Firm",
  "Law Group",
  "Lawyer",
  "Legal Workflow"
];

export default function LegalSetup() {
  const username = localStorage.getItem("username");
  const [activeTab, setActiveTab] = useState("Court");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Court":
        return <div className="tab-content"><CourtSetup/></div>;
      case "Legal Case Type":
        return <div className="tab-content"><LegalCaseTypeSetup/></div>;
      case "Disposition":
        return <div className="tab-content">Disposition content</div>;
      case "Law Firm":
        return <div className="tab-content">Law Firm content</div>;
      case "Law Group":
        return <div className="tab-content">Law Group content</div>;
      case "Lawyer":
        return <div className="tab-content">Lawyer content</div>;
      case "Legal Workflow":
        return <div className="tab-content">Legal Workflow content</div>;
      default:
        return null;
    }
  };

  return (
    <Layout username={username}>
      <h1 className="page-title">Legal Setup</h1>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </Layout>
  );
}
