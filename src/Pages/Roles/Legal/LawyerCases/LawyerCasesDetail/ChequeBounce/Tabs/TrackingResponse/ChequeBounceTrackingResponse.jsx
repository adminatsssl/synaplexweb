import React from 'react';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './ChequeBounceTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"

const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

const ChequeBounceTrackingResponse = () => {
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
          value="13.78"
          readOnly
          className="chequeBounce-trackingResponse-days-input"
        />
        <div className="chequeBounce-trackingResponse-radio-container">
          <div className="chequeBounce-trackingResponse-radio-group1">
            <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Received ?</strong></p>

            <div className='chequeBounce-trackingResponse-radio-btn'>
                <label>
              <input type="radio" name="responseReceived" /> Yes
            </label>
            <label>
              <input type="radio" name="responseReceived" defaultChecked /> No
            </label>

            </div>
            
          </div>
          <div className="chequeBounce-trackingResponse-radio-group2">
            <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Overdue ?</strong></p>
            <div className='chequeBounce-trackingResponse-radio-btn'>
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
      

      <div className='chequeBounce-trackingResponse-middle-content'>
                <div className='chequeBounce-trackingResponse-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='chequeBounce-trackingResponse-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='chequeBounce-trackingResponse-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>
    </div>
  );
};

export default ChequeBounceTrackingResponse;
