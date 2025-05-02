import React from "react";
import Layout from "../../Layout/Layout";
import "./UserPage.css";

// import CalendarComponent from "./CalendarComponent"; // Replace with real component
// import MapComponent from "./MapComponent";           // Replace with real component

export default function UserPage() {
  const username = localStorage.getItem("username");

  return (
    <Layout username={username}>
      <div className="userpage-container">
        <div className="userpage-popup userpage-popup-left">
          <h2>Cases:</h2>
          {/* <CalendarComponent /> */}
        </div>

        <div className="userpage-popup userpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
          {/* <MapComponent /> */}
        </div>
      </div>
    </Layout>
  );
}
