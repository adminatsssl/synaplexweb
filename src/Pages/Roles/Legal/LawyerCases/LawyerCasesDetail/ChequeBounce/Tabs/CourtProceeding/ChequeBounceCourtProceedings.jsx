import React from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import './ChequeBounceCourtProceedings.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


const ChequeBounceCourtProceedings = () => {
    // Sample data for disposition summary
    const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

    // Sample data for uploaded documents
    const documentData = [
        { name: "Aadhar", createdDate: "Hello world", uploadedBy: "Hello world" },
    ];

    const documentColumns = [
        { key: "name", label: "Document Name" },
        { key: "createdDate", label: "Created Date" },
        { key: "uploadedBy", label: "Uploaded By" },
    ];

    return (
        <div className='chequeBounce-courtProceeding-container'>

            <div className='chequeBounce-courtProceeding-topcontent-container'>
                <div className='chequeBounce-courtProceeding-topcontent-heading'>
                    <h5>Court Hearing</h5>
                </div>
                <div className='chequeBounce-courtProceeding-topcontent'>

                    <div className='chequeBounce-courtProceeding-topcontent-leftside'>
                        <div className="chequeBounce-courtProceeding-form-row">
                            <div className='chequeBounce-courtProceeding-form-row-content'>
                                <div className="chequeBounce-courtProceeding-form-group">
                                <label>Hearing Date</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="chequeBounce-courtProceeding-form-group">
                                <label>Supporting Evidence</label>
                                <input type="text" className="notice-input" />
                            </div>

                            </div>
                            
                            <div className='chequeBounce-courtProceeding-form-row-content'>
                                <div className="chequeBounce-courtProceeding-form-group">
                                <label>Judge Name</label>
                                <input type='text'/>
                            </div>
                            <div className="chequeBounce-courtProceeding-form-group">
                            <label>Notes</label>
                            <textarea className="chequeBounce-courtProceeding-textarea" rows="3"></textarea>
                        </div>

                            </div>
                            

                        </div>
                        
                    </div>

                </div>
            </div>

            <div className='chequeBounce-courtProceeding-middle-content'>
                <div className='chequeBounce-courtProceeding-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='chequeBounce-courtProceeding-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='chequeBounce-courtProceeding-Bottom-content'>
                <div className='chequeBounce-courtProceeding-Bottom-content-heading'>
                    <h5>Uploaded Documents</h5>
                </div>
                <div className='chequeBounce-courtProceeding-Bottom-content-formdata'>
                    <ReusableGrid columns={documentColumns} data={documentData} />
                </div>

            </div>

            <div className='chequeBounce-courtProceeding-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>

        </div>
    );
};

export default ChequeBounceCourtProceedings;
