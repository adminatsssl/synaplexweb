import React from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import './ChequeBounceFinalJudgement.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


const ChequeBounceFinalJudgement = () => {
    // Sample data for disposition summary
    const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

  

    return (
        <div className='chequeBounce-finalJudgement-container'>

            <div className='chequeBounce-finalJudgement-topcontent-container'>
                <div className='chequeBounce-finalJudgement-topcontent-heading'>
                    <h5>Final Judgement</h5>
                </div>
                <div className='chequeBounce-finalJudgement-topcontent'>

                    <div className='chequeBounce-finalJudgement-topcontent-leftside'>
                        <div className="chequeBounce-finalJudgement-form-row">
                            <div className='chequeBounce-finalJudgement-form-row-content'>
                                <div className="chequeBounce-finalJudgement-form-group">
                                <label>Judgment Date</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="chequeBounce-finalJudgement-form-group">
                                <label>Court Order Documents</label>
                                <input type="text" className="notice-input" />
                            </div>

                            </div>
                            
                            <div className='chequeBounce-finalJudgement-form-row-content'>
                                <div className="chequeBounce-finalJudgement-form-group">
                                <label>Judgment Type</label>
                                <input type='text'/>
                            </div>
                            <div className="chequeBounce-finalJudgement-form-group">
                            <label>Judgment Summary</label>
                            <textarea className="chequeBounce-finalJudgement-textarea" rows="3"></textarea>
                        </div>

                            </div>
                            

                        </div>
                        
                    </div>

                </div>
            </div>

            <div className='chequeBounce-finalJudgement-middle-content'>
                <div className='chequeBounce-finalJudgement-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='chequeBounce-finalJudgement-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='chequeBounce-finalJudgement-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>

        </div>
    );
};

export default ChequeBounceFinalJudgement;
