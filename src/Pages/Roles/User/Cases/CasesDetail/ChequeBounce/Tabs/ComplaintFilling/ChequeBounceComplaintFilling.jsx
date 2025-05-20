import React from 'react';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceComplaintFilling.css'

const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

const ChequeBounceComplaintFilling = ()=>{
    return(
        <div className='chequeBounce-complaintFilling-container'>

            <div className='chequeBounce-complaintFilling-topcontent-container'>
                <div className='chequeBounce-complaintFilling-topcontent-heading'>
                    <h5>Complaint Filing</h5>
                </div>
                <div className='chequeBounce-complaintFilling-topcontent'>

                    <div className='chequeBounce-complaintFilling-topcontent-leftside'>
                        <div className="chequeBounce-complaintFilling-form-row">
                            <div className="chequeBounce-complaintFilling-form-row-content">
                                <div className="chequeBounce-complaintFilling-form-group">
                                <label>Case Number</label>
                                <input type="text" className="possessionnotice-input" />
                            </div>
                            <div className="chequeBounce-complaintFilling-form-group">
                                <label>Court Name</label>
                                <input type="text" className="possessionnotice-input" />
                            </div>

                            </div>
                            <div className="chequeBounce-complaintFilling-form-row-content">
                                <div className="chequeBounce-complaintFilling-form-group">
                               <label>Complaint Date</label>
                            <input type='date'></input>
                            </div>
                            <div className="chequeBounce-complaintFilling-form-group">
                            <label>Notes</label>
                            <textarea className="chequeBounce-complaintFilling-textarea" rows="3"></textarea>
                        </div>

                            </div>
                            
                            
                        </div>
                        
                    </div>


                </div>
            </div>

            <div className='chequeBounce-complaintFilling-middle-content'>
                <div className='chequeBounce-complaintFilling-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='chequeBounce-complaintFilling-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='chequeBounce-complaintFilling-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>

        </div>
    );
};

export default ChequeBounceComplaintFilling;