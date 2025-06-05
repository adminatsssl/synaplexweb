import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import "./LegalPage.css";
import { LegalMap } from "./Dashboard/Map/LegalMap";
import LegalCalendarCases from "./Dashboard/Calendar/LegalCalendar";
import LegalActivityCaseTabs from "./Dashboard/Activity/LegalActivityTab";

export default function LegalPage() {
  const username = localStorage.getItem("username");
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(`/api/api/cases/summaryByState`, {
          headers : getAuthHeaders()
        });
        if (response.status === 200) {
          setMapData(response.data);
        } else {
          console.error("Failed to fetch summary data");
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <Layout username={username}>
      <div className="legalpage-container">
        <div className="legalpage-popup legalpage-popup-left">
          <h2>Cases:</h2>
          <LegalCalendarCases />
        </div>

        <div className="legalpage-popup legalpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
          {loading ? (
            <p>Loading map data...</p>
          ) : (
            <LegalMap jsonData={JSON.stringify(mapData)} />
          )}
        </div>
      </div>

      <div className="legalpage-activity-container">
        <div className="legalpage-activity">
          <h2>Litigation Activity type distribution</h2>
          <LegalActivityCaseTabs />
        </div>
      </div>
    </Layout>
  );
}
