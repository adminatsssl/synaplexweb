import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import './SarfaesiAuctionRecovery.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const SarfaesiAuctionRecovery = ({ caseID }) => {
  const [recoveryAmount, setRecoveryAmount] = useState("");
  const [recoveryDate, setRecoveryDate] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState("");
  const [recoveryMode, setRecoveryMode] = useState("");
  const [remark, setRemark] = useState("");
  const [dispositionData, setDispositionData] = useState([]);

  const dispositionColumns = [
    { key: "stage", label: "Disposition Stage" },
    { key: "comment", label: "Comment" },
  ];

  useEffect(() => {
    if (!caseID) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`api/api/auctionRecovery/case/${caseID}`, {
          headers: getAuthHeaders()
        });
        const data = response.data;

        setRecoveryAmount(data.recoveryAmount ?? "");
        setRecoveryDate(data.recoveryDate ?? "");
        setRecoveryStatus(data.recoveryStatus ?? "");
        setRecoveryMode(data.recoveryMode ?? "");
        setRemark(data.remark ?? "");

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
        console.error("Error fetching auction recovery data:", error);
      }
    };

    fetchData();
  }, [caseID]);

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
                  onChange={e => setRecoveryAmount(e.target.value)} 
                />
              </div>
              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Date</label>
                <input 
                  type='date' 
                  placeholder='mm/dd/yyyy' 
                  value={recoveryDate}
                  disabled
                  onChange={e => setRecoveryDate(e.target.value)} 
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
                  onChange={e => setRecoveryStatus(e.target.value)} 
                />
              </div>

              <div className='sarfaesi-auctionRecovery-input'>
                <label>Recovery Mode</label>
                <input 
                  type="text" 
                  placeholder="Enter recovery mode"
                  disabled
                  value={recoveryMode} 
                  onChange={e => setRecoveryMode(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label>Remark</label>
              <textarea 
                value={remark} 
                disabled
                onChange={e => setRemark(e.target.value)} 
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

      <div className='sarfaesi-auctionRecovery-Bottom-btn'>
        <CancelButton />
        <SaveButton label='Save & Next' />
      </div>
    </div>
  );
};

export default SarfaesiAuctionRecovery;
