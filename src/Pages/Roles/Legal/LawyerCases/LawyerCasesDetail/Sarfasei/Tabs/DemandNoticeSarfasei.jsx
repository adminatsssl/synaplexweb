// import React from 'react';
import React, { useState } from 'react'; // ✅ Fix
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import ReusableGrid from "../../../../../../ReusableComponents/ReusableGrid.jsx"; // Adjust path as needed
import './DemandNoticeSarfaesi.css';
import SaveButton from "../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../ReusableComponents/CancelButton.jsx"
import NoticePreviewModal from './NoticePreviewModal';
import AddButton from "../../../../../../ReusableComponents/AddButton.jsx";
import DispositionModal from './DispositionModal';

const DemandNoticeSarfasei = ({ caseId }) => {
    if (!caseId) {
        console.error('No caseId provided to DemandNoticeSarfasei');
        return null;
    }

    // Sample data for disposition summary
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openDispositionModal = () => setIsDispositionModalOpen(true);
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

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

    const handleSaveDisposition = () => {
        // Handle saving disposition data
        closeDispositionModal();
    };

    return (
        <div className='demandNotice-Sarfasei-container'>

            <div className='demandNotice-Sarfasei-topcontent-container'>
                <div className='demandNotice-Sarfasei-topcontent-heading'>
                    <h5>Demand Notice Generation - Section 13(2)</h5>
                </div>
                <div className='demandNotice-Sarfasei-topcontent'>

                    <div className='demandNotice-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-notice-form-row">
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Deadline</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Sent Date</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Type</label>
                                <select className="notice-input">
                                    <option value="business">Taking control of existing business</option>
                                    <option value="receiver">Appointing a receiver to manage assets</option>
                                    <option value="possession">Taking possession of assets</option>
                                </select>
                            </div>
                        </div>
                        <div className="Sarfasei-notice-form-group">
                            <label>Remarks</label>
                            <textarea className="Sarfasei-notice-textarea" rows="3"></textarea>
                        </div>
                    </div>

                    <div className='demandNotice-Sarfasei-topcontent-rightside'>
                        <button onClick={openModal} className='assetValuation-generatenotice-btn'>Generate Notice</button>
                        <h4>View Generated Notice</h4>
                        <div className='demandNotice-Sarfasei-topcontent-rightside-icon'>
                            <div className='emandNotice-Sarfasei-icon'>
                                <GiMailbox />
                                <FaSms />
                            </div>
                            <div className='emandNotice-Sarfasei-icon'>
                                <IoMdMail />
                                <IoLogoWhatsapp />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='demandNotice-Sarfasei-middle-content'>
                <div className='demandNotice-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} />
                </div>
                <div className='demandNotice-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='demandNotice-Sarfasei-Bottom-content'>
                <div className='demandNotice-Sarfasei-Bottom-content-heading'>
                    <h5>Uploaded Documents</h5>
                    <AddButton text="Add " onClick={""} />
                </div>
                <div className='demandNotice-Sarfasei-Bottom-content-formdata'>
                    <ReusableGrid columns={documentColumns} data={documentData} />
                </div>

            </div>

            <div className='demandNotice-Sarfasei-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />

            </div>
            <NoticePreviewModal isOpen={isModalOpen} onClose={closeModal} caseId={caseId} />
            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

        </div>

    );
};

export default DemandNoticeSarfasei;
