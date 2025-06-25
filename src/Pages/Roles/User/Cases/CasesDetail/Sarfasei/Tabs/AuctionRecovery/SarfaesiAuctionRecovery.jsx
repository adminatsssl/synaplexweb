import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiAuctionRecovery.css';
import { useParams } from "react-router-dom";

// ✅ Utility to fetch auth headers
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const SarfaesiAuctionRecovery = () => {
  // ✅ FIXED: Call useParams as a function to extract caseId from URL
  const { id: caseId } = useParams();

  const [recoveryAmount, setRecoveryAmount] = useState("");
  const [recoveryDate, setRecoveryDate] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState("");
  const [recoveryMode, setRecoveryMode] = useState("");
  const [remark, setRemark] = useState("");
  const [dispositionData, setDispositionData] = useState([]);

  const dispositionColumns = [
    { key: "name", label: "Disposition Stage" },      // correct keys
    { key: "description", label: "Comment" },
  ];

  useEffect(() => {
    if (!caseId) return;

    const fetchData = async () => {
      try {
        // ✅ API call with caseId in the URL
        const response = await axios.get(`/api/api/auctionRecovery/case/${caseId}`, {
          headers: getAuthHeaders()
        });

        const data = response.data;

        // ✅ Populate fields safely using nullish coalescing
        setRecoveryAmount(data.recoveryAmount ?? "");
        setRecoveryDate(data.recoveryDate ?? "");
        setRecoveryStatus(data.recoveryStatus ?? "");
        setRecoveryMode(data.recoveryMode ?? "");
        setRemark(data.remark ?? "");

        // ✅ Map disposition data if it's an array
        if (Array.isArray(data.dispositions)) {
          setDispositionData(data.dispositions); // ✅ directly use the API data
        } else {
          setDispositionData([]);
        }
      } catch (error) {
        console.error("Error fetching auction recovery data:", error);
      }
    };

    fetchData();
  }, [caseId]); // ✅ Refetch if caseId changes

  return (
    <div className="sarfaesi-auctionRecovery-container">
      <div className='sarfaesi-auctionRecovery-top-container'>
        <div className='sarfaesi-auctionRecovery-top-container-heading'>
          <h5 className="sarfaesi-auctionRecovery-title">Auction and Recovery</h5>
        </div>

        <div className="sarfaesi-auctionRecovery-box">
          <div className='sarfaesi-auctionRecovery-topcontent-box'>
            <div className='sarfaesi-auctionRecovery-input-container'>
              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Amount</label>
                <input
                  type='text'
                  placeholder='0.00'
                  value={recoveryAmount}
                  disabled
                />
              </div>
              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Date</label>
                <input
                  type='date'
                  placeholder='mm/dd/yyyy'
                  value={recoveryDate}
                  disabled
                />
              </div>
            </div>

            <div className="sarfaesi-auctionRecovery-input-container">
              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Status</label>
                <input
                  type="text"
                  placeholder="Enter recovery status"
                  value={recoveryStatus}
                  disabled
                />
              </div>

              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Mode</label>
                <input
                  type="text"
                  placeholder="Enter recovery mode"
                  disabled
                  value={recoveryMode}
                />
              </div>
            </div>

            <div>
              <label>Remark</label>
              <textarea
                value={remark}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className='sarfaesi-auctionRecovery-middle-content'>
        <div className='sarfaesi-auctionRecovery-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='sarfaesi-auctionRecovery-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

    </div>
  );
};

export default SarfaesiAuctionRecovery;
