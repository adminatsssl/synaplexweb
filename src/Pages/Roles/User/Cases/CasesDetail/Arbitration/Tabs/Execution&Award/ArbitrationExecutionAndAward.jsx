import React from 'react';
import './ArbitrationExecutionAndAward.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


const ArbitrationExecutionAndAward = () => {
  

    return (
        <div className='Arbitrator-Execution-Award-container'>

            <div className='Arbitrator-Execution-Award-topcontent-container'>
                <div className='Arbitrator-Execution-Award-topcontent-heading'>
                    <h5>Execution of Award</h5>
                </div>
                <div className='Arbitrator-Execution-Award-topcontent'>

                    <div className='Arbitrator-Execution-Award-topcontent-leftside'>
                        <div className="Arbitrator-Execution-Award-form-row">

                                <div className="Arbitrator-Execution-Award-form-group">
                                    <label>Enforcement ID</label>
                                    <input type="text" className="notice-input" />
                                </div>
                                <div className="Arbitrator-Execution-Award-form-group">
                                    <label>Escalation Date</label>
                                    <input type="date" className="notice-input" />
                                    
                                </div>
                                <div className="Arbitrator-Execution-Award-form-group-select">
                                    <label>Compaliance Status</label>
                                    <select className="notice-input">
                                        <option value="Draft">Complied</option>
                                        <option value="Finalized">Non-Complied</option>
                                        <option value="Shared">Escalated</option>
                                    </select>
                                </div>
                                

                        </div>
                        <div className="Arbitrator-Execution-Award-form-group-textarea">
                                    <label>Compaliance Details</label>
                                    <textarea className="Arbitrator-Execution-Award-textarea" rows="3"></textarea>
                                </div>

                    </div>


                </div>
            </div>

            <div className='Arbitrator-Execution-Award-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />

            </div>

        </div>
    );
};

export default ArbitrationExecutionAndAward;
