import React from 'react';
import './ArbitrationHearing.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


const ArbitrationHearing = () => {
  

    return (
        <div className='Arbitrator-Hearing-container'>

            <div className='Arbitrator-Hearing-topcontent-container'>
                <div className='Arbitrator-Hearing-topcontent-heading'>
                    <h5>Arbitration Hearing Scheduling</h5>
                </div>
                <div className='Arbitrator-Hearing-topcontent'>

                    <div className='Arbitrator-Hearing-topcontent-leftside'>
                        <div className="Arbitrator-Hearing-form-row">

                                <div className="Arbitrator-Hearing-form-group">
                                    <label>Hearing ID</label>
                                    <input type="text" className="notice-input" />
                                </div>
                               
                                <div className="Arbitrator-Hearing-form-group">
                                    <label>Hearing Date</label>
                                    <input type="date" className="notice-input" />
                                </div>
                                

                        </div>
                        <div className="Arbitrator-Hearing-form-group-textarea">
                                    <label>Location</label>
                                    <input type='text' rows="3"/>
                                </div>

                    </div>


                </div>
            </div>

            <div className='Arbitrator-Hearing-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />

            </div>

        </div>
    );
};

export default ArbitrationHearing;
