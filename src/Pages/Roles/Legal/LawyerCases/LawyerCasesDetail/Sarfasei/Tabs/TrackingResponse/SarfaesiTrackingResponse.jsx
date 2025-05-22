import React from 'react';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"

const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

const SarfaesiTrackingResponse = () => {
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
          value="13.78"
          readOnly
          className="sarfaesi-tracking-response-days-input"
        />
        <div className="sarfaesi-tracking-response-radio-container">
          <div className="sarfaesi-tracking-response-radio-group1">
            <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Received ?</strong></p>

            <div className='sarfaesi-tracking-response-radio-btn'>
                <label>
              <input type="radio" name="responseReceived" /> Yes
            </label>
            <label>
              <input type="radio" name="responseReceived" defaultChecked /> No
            </label>

            </div>
            
          </div>
          <div className="sarfaesi-tracking-response-radio-group2">
            <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Overdue ?</strong></p>
            <div className='sarfaesi-tracking-response-radio-btn'>
                <label>
              <input type="radio" name="responseOverdue" /> Yes
            </label>
            <label>
              <input type="radio" name="responseOverdue" defaultChecked /> No
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
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='sarfaesi-tracking-response-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>
    </div>
  );
};

export default SarfaesiTrackingResponse;
