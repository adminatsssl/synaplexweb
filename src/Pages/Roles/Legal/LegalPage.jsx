import React from "react";
import Layout from "../../Layout/Layout";
import "./LegalPage.css";

// import CalendarComponent from "./CalendarComponent";
// import MapComponent from "./MapComponent";

export default function LegalPage() {
  const username = localStorage.getItem("username");

  return (
    <Layout username={username}>
      <div className="legalpage-container">
        <div className="legalpage-popup legalpage-popup-left">
          <h2>Cases:</h2>
          {/* <CalendarComponent /> */}
        </div>

        <div className="legalpage-popup legalpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
          {/* <MapComponent /> */}
        </div>
      </div>
    </Layout>
  );
}
