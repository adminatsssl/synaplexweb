import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import "./UserPage.css";
import { UserMap } from "./Dashboard/Map/UserMap";
import CalendarCases from "./Dashboard/Calendar/CalendarCases";
import ActivityCaseTabs from "./Dashboard/Activity/ActivityTab";

export default function UserPage() {
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
      <div className="userpage-container">
        <div className="userpage-popup userpage-popup-left">
          <h2>Cases:</h2>
          <CalendarCases />
        </div>

        <div className="userpage-popup userpage-popup-right">
          <h2>Case Distribution by Geography :</h2>
          {loading ? (
            <p>Loading map data...</p>
          ) : (
            <UserMap jsonData={JSON.stringify(mapData)} />
          )}
        </div>
      </div>

      <div className="userpage-activity-container">
        <div className="userpage-activity">
          <h2>Litigation Activity type distribution</h2>
          <ActivityCaseTabs />
        </div>
      </div>
    </Layout>
  );
}
