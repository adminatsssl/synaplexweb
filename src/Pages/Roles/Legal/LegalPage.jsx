import React from "react";
import Layout from "../../Layout/Layout";
import "./LegalPage.css";
import { LegalMap } from "./Dashboard/Map/LegalMap";
import LegalCalendarCases from "./Dashboard/Calendar/LegalCalendar";

export default function LegalPage() {
  const username = localStorage.getItem("username");
  const sampleData = JSON.stringify([
    { state: "Maharashtra", pendingCount: 200, disposedCount: 50 },
    { state: "Gujarat", pendingCount: 2, disposedCount: 0 },
    { state: "Haryana", pendingCount: 50, disposedCount: 30 },
  ]);
  return (
    <Layout username={username}>
      <div className="legalpage-container">
        <div className="legalpage-popup legalpage-popup-left">
          <h2>Cases:</h2>
          <LegalCalendarCases/>
        </div>

        <div className="legalpage-popup legalpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
         <LegalMap jsonData={sampleData}/>
        </div>
      </div>
    </Layout>
  );
}
