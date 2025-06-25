import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './ChequeBounceTrackingResponse.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const ChequeBounceTrackingResponse = () => {
  const { id: caseId } = useParams();

  const [trackingData, setTrackingData] = useState({
    daysRemainingForResponse: '',
    isResponseReceived: false,
    isResponseOverdue: false,
  });

  const [dispositionData, setDispositionData] = useState([]);

  useEffect(() => {
    if (caseId) {
      fetchTrackingData();
    }
  }, [caseId]);

  const fetchTrackingData = async () => {
    try {
      const response = await axios.get(`/api/api/tracking15DayResponseCB/case/${caseId}`, {
        headers: getAuthHeaders()
      });

      const data = response.data.data;

      setTrackingData({
        daysRemainingForResponse: data.daysRemainingForResponse ?? '',
        isResponseReceived: data.isResponseReceived ?? false,
        isResponseOverdue: data.isResponseOverdue ?? false,
      });

      setDispositionData(data.dispositions || []);
      console.log("Tracking 15-Day Response Case ID:", caseId);
    } catch (error) {
      console.error("Error fetching 15-day tracking data:", error);
    }
  };

  const dispositionColumns = [
  { key: "name", label: "Disposition Stage" },
  { key: "description", label: "Comment" },
];

  return (
    <div className="chequeBounce-trackingResponse-container">
      <div className='chequeBounce-trackingResponse-top-container'>
        <div className='chequeBounce-trackingResponse-top-container-heading'>
          <h5 className="chequeBounce-trackingResponse-title">Tracking 15-Day Response:</h5>
        </div>

        <div className="chequeBounce-trackingResponse-box">
          <div className='chequeBounce-trackingResponse-topcontent-box'>
            <h5 className="chequeBounce-trackingResponse-box-title">Days/Time Remaining For Response</h5>
            <input
              type="text"
              value={trackingData.daysRemainingForResponse}
              disabled
              readOnly
              className="chequeBounce-trackingResponse-days-input"
            />

            <div className="chequeBounce-trackingResponse-radio-container">
              <div className="chequeBounce-trackingResponse-radio-group1">
                <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Received?</strong></p>
                <div className='chequeBounce-trackingResponse-radio-btn'>
                  <label>
                    <input
                      type="radio"
                      name="responseReceived"
                      disabled
                      checked={trackingData.isResponseReceived === true}
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="responseReceived"
                      disabled
                      checked={trackingData.isResponseReceived === false}
                    /> No
                  </label>
                </div>
              </div>

              <div className="chequeBounce-trackingResponse-radio-group2">
                <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Overdue?</strong></p>
                <div className='chequeBounce-trackingResponse-radio-btn'>
                  <label>
                    <input
                      type="radio"
                      name="responseOverdue"
                      disabled
                      checked={trackingData.isResponseOverdue === true}
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="responseOverdue"
                      disabled
                      checked={trackingData.isResponseOverdue === false}
                    /> No
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='chequeBounce-trackingResponse-middle-content'>
        <div className='chequeBounce-trackingResponse-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='chequeBounce-trackingResponse-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>
    </div>
  );
};

export default ChequeBounceTrackingResponse;
