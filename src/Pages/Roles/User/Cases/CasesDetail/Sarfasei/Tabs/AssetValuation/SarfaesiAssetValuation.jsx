import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import './SarfaesiAssetValuation.css';

const SarfaesiAssetValuation = ({ caseID }) => {
  const [auctionDate, setAuctionDate] = useState("");
  const [auctionLocation, setAuctionLocation] = useState("");
  const [auctionValuation, setAuctionValuation] = useState("");
  const [dispositionData, setDispositionData] = useState([]);

  const dispositionColumns = [
    { key: "stage", label: "Disposition Stage" },
    { key: "comment", label: "Comment" },
  ];

  useEffect(() => {
    if (!caseID) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`api/api/assetValuationAuctions/case/${caseID}`);
        const data = response.data;

        setAuctionDate(data.auctionDate || "");
        setAuctionLocation(data.auctionLocation || "");
        setAuctionValuation(data.auctionValuation || "");

        // Map dispositions to fit ReusableGrid data format
        if (Array.isArray(data.dispositions)) {
          const mappedDispositions = data.dispositions.map((disp, idx) => ({
            stage: disp.stage || `Stage ${idx + 1}`,
            comment: disp.comment || "",
          }));
          setDispositionData(mappedDispositions);
        } else {
          setDispositionData([]);
        }
      } catch (error) {
        console.error("Error fetching asset valuation data:", error);
      }
    };

    fetchData();
  }, [caseID]);

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
                  className="assetValuation-input"
                  value={auctionDate}
                  onChange={e => setAuctionDate(e.target.value)}
                />
              </div>
              <div className="Sarfasei-assetValuation-form-group">
                <label>Auction Location</label>
                <input 
                  type='text' 
                  disabled
                  value={auctionLocation}
                  onChange={e => setAuctionLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="Sarfasei-assetValuation-form-group">
              <label>Auction Valuation</label>
              <input 
                type='text'
                disabled 
                value={auctionValuation}
                onChange={e => setAuctionValuation(e.target.value)}
              />
            </div>
          </div>

          <div className='assetValuation-Sarfasei-topcontent-rightside'>
            <button className='assetValuation-generatenotice-btn'>Generate Notice</button>
            <h4>View Generated Notice</h4>
            <div className='assetValuation-Sarfasei-topcontent-rightside-icon'>
              <div className='assetValuation-Sarfasei-icon'>
                <GiMailbox />
                <FaSms />
              </div>
              <div className='assetValuation-Sarfasei-icon'>
                <IoMdMail />
                <IoLogoWhatsapp />
              </div>
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

      {/* Uncomment if you want buttons */}
      {/* 
      <div className='assetValuation-Sarfasei-Bottom-btn'>
        <CancelButton/>
        <SaveButton label='Save & Next'/>
      </div> 
      */}
    </div>
  );
};

export default SarfaesiAssetValuation;
