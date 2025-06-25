import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";

import './SarfaesiAssetValuation.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const SarfaesiAssetValuation = () => {
  const { id: caseId } = useParams();  // 👈 Renaming 'id' to 'caseId'

  const [auctionDate, setAuctionDate] = useState("");
  const [auctionLocation, setAuctionLocation] = useState("");
  const [auctionValuation, setAuctionValuation] = useState("");
  const [dispositionData, setDispositionData] = useState([]);

  const dispositionColumns = [
    { key: "name", label: "Disposition Stage" },      // corresponds to `name` in JSON
    { key: "description", label: "Comment" },         // corresponds to `description` in JSON
  ];

  useEffect(() => {
    if (!caseId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/api/assetValuationAuctions/case/${caseId}`, {
          headers: getAuthHeaders()
        });

        const data = response.data;

        setAuctionDate(data.auctionDate ?? "");
        setAuctionLocation(data.auctionLocation ?? "");
        setAuctionValuation(data.auctionValuation?.toString() ?? "");
        if (Array.isArray(data.dispositions)) {
          setDispositionData(data.dispositions); // ✅ directly use the API data
        } else {
          setDispositionData([]);
        }
      } catch (error) {
        console.error("Error fetching Sarfaesi auction data:", error);
      }
    };

    fetchData();
  }, [caseId]);

  return (
    <div className='assetValuation-Sarfasei-container'>
      <div className='assetValuation-Sarfasei-topcontent-container'>
        <div className='assetValuation-Sarfasei-topcontent-heading'>
          <h5>Asset Valuation & Auction</h5>
        </div>
        <div className='assetValuation-Sarfasei-topcontent'>
          <div className='assetValuation-Sarfasei-topcontent-leftside'>
            <div className="Sarfasei-assetValuation-form-row">
              <div className="Sarfasei-assetValuation-form-group">
                <label>Auction Date</label>
                <input
                  type="date"
                  disabled
                  value={auctionDate}
                  className="assetValuation-input"
                />
              </div>
              <div className="Sarfasei-assetValuation-form-group">
                <label>Auction Location</label>
                <input
                  type='text'
                  disabled
                  value={auctionLocation}
                />
              </div>
            </div>
            <div className="Sarfasei-assetValuation-form-group">
              <label>Auction Valuation</label>
              <input
                type='text'
                disabled
                value={auctionValuation}
              />
            </div>
          </div>

        </div>
      </div>

      <div className='assetValuation-Sarfasei-middle-content'>
        <div className='assetValuation-Sarfasei-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='assetValuation-Sarfasei-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

    </div>
  );
};

export default SarfaesiAssetValuation;
