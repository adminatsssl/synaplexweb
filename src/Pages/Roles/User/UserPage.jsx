import React from "react";
import Layout from "../../Layout/Layout";
import "./UserPage.css";
import { UserMap } from "./Dashboard/Map/UserMap";
import CalendarCases from "./Dashboard/Calender/CalendarCases";

export default function UserPage() {
  const username = localStorage.getItem("username");
  const sampleData = JSON.stringify([
    { state: "Maharashtra", pendingCount: 200, disposedCount: 50 },
    { state: "Gujarat", pendingCount: 2, disposedCount: 0 },
    { state: "Haryana", pendingCount: 50, disposedCount: 30 },
  ]);
  return (
    <Layout username={username}>
      <div className="userpage-container">
        <div className="userpage-popup userpage-popup-left">
          <h2>Cases:</h2>
          <CalendarCases/>
        </div>

        <div className="userpage-popup userpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
          <UserMap jsonData={sampleData} />
        </div>
      </div>
    </Layout>
  );
}
