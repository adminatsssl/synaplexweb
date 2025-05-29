import React, { useState } from 'react';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DispositionModal';
import './SarfaesiPossessionNotice.css'

const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

const SarfaesiPossessionNotice = ()=>{
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);

    const openDispositionModal = () => setIsDispositionModalOpen(true);
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const handleSaveDisposition = () => {
        // Handle saving disposition data
        closeDispositionModal();
    };

    return(
        <div className='possessionNotice-Sarfasei-container'>

            <div className='possessionNotice-Sarfasei-topcontent-container'>
                <div className='possessionNotice-Sarfasei-topcontent-heading'>
                    <h5>Possession Notice - Section 13(4)</h5>
                </div>
                <div className='possessionNotice-Sarfasei-topcontent'>

                    <div className='possessionNotice-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-possessionnotice-form-row">
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Notice Sent Date</label>
                                <input type="date" className="possessionnotice-input" />
                            </div>
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Possession Date</label>
                                <input type="date" className="possessionnotice-input" />
                            </div>
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Notice Type</label>
                                <select className="possessionnotice-input">
                                    <option value="business">Taking control of existing business</option>
                                    <option value="receiver">Appointing a receiver to manage assets</option>
                                    <option value="possession">Taking possession of assets</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>Asset Details</label>
                            <input type='text'></input>
                        </div>
                        <div className="Sarfasei-possessionnotice-form-group">
                            <label>Remarks</label>
                            <textarea className="Sarfasei-possessionnotice-textarea" rows="3"></textarea>
                        </div>
                    </div>


                </div>
            </div>

            <div className='possessionNotice-Sarfasei-middle-content'>
                <div className='possessionNotice-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} />
                </div>
                <div className='possessionNotice-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='possessionNotice-Sarfasei-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>

        </div>
    );
};

export default SarfaesiPossessionNotice;