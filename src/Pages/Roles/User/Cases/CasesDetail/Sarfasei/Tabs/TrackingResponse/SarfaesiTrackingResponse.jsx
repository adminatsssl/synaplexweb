import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const dispositionColumns = [
  { key: "stage", label: "Disposition Stage" },
  { key: "comment", label: "Comment" },
];

const SarfaesiTrackingResponse = () => {
  const { id } = useParams();
  const [responseData, setResponseData] = useState({
    daysRemainingForResponse: '',
    isResponseReceived: false,
    isResponseOverdue: false,
    dispositions: []
  });

  useEffect(() => {
  const fetchResponseData = async () => {
    try {
      const res = await axios.get(`/api/api/tracking60DayResponse/case/${id}`, {
        headers: getAuthHeaders()
      });
      const data = res.data;

      // Map API's dispositions to match grid expectations
      const mappedDispositions = (data.dispositions || []).map(d => ({
        stage: d.name,
        comment: d.description
      }));

      setResponseData({
        daysRemainingForResponse: data.daysRemainingForResponse?.toString() || '',
        isResponseReceived: data.isResponseReceived,
        isResponseOverdue: data.isResponseOverdue,
        dispositions: mappedDispositions
      });
    } catch (error) {
      console.error("Error fetching tracking response data:", error);
    }
  };

  if (id) {
    fetchResponseData();
  }
}, [id]);

  return (
    <div className="sarfaesi-tracking-response-container">
      <div className='sarfaesi-tracking-response-top-container'>
        <div className='sarfaesi-tracking-response-top-container-heading'> 
          <h5 className="sarfaesi-tracking-response-title">Tracking 15-Day Response:</h5>
        </div>

        <div className="sarfaesi-tracking-response-box">
          <div className='sarfaesi-tracking-response-topcontent-box'>
            <h5 className="sarfaesi-tracking-response-box-title">Days/Time Remaining For Response</h5>
            <input
              type="text"
              readOnly
              disabled
              className="sarfaesi-tracking-response-days-input"
              value={responseData.daysRemainingForResponse}
            />

            <div className="sarfaesi-tracking-response-radio-container">
              <div className="sarfaesi-tracking-response-radio-group1">
                <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Received?</strong></p>
                <div className='sarfaesi-tracking-response-radio-btn'>
                  <label>
                    <input type="radio" disabled name="responseReceived" checked={responseData.isResponseReceived === true} readOnly /> Yes
                  </label>
                  <label>
                    <input type="radio" disabled name="responseReceived" checked={responseData.isResponseReceived === false} readOnly /> No
                  </label>
                </div>
              </div>

              <div className="sarfaesi-tracking-response-radio-group2">
                <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Overdue?</strong></p>
                <div className='sarfaesi-tracking-response-radio-btn'>
                  <label>
                    <input type="radio" disabled name="responseOverdue" checked={responseData.isResponseOverdue === true} readOnly /> Yes
                  </label>
                  <label>
                    <input type="radio" disabled name="responseOverdue" checked={responseData.isResponseOverdue === false} readOnly /> No
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='sarfaesi-tracking-response-middle-content'>
        <div className='sarfaesi-tracking-response-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='sarfaesi-tracking-response-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={responseData.dispositions} />
        </div>
      </div>

      {/* <div className='sarfaesi-tracking-response-Bottom-btn'>
        <CancelButton />
        <SaveButton label='Save & Next' />
      </div> */}
    </div>
  );
};

export default SarfaesiTrackingResponse;
