// import React from 'react';
import React, { useState, useEffect } from 'react'; // ✅ Fix
import ReusableGrid from "../../../../../../ReusableComponents/ReusableGrid.jsx"; // Adjust path as needed
import './DemandNoticeSarfaesi.css';  // Fixed CSS filename
import SaveButton from "../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../ReusableComponents/CancelButton.jsx"
import NoticePreviewModal from './NoticePreviewModal';
import AddButton from "../../../../../../ReusableComponents/AddButton.jsx";
import DispositionModal from './DispositionModal';
import axios from 'axios';
import PropTypes from 'prop-types';

// Import icons

import whatsappIcon from '../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../assets/icons/mailbox.png';

const DemandNoticeSarfasei = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to DemandNoticeSarfasei');
        return null;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [noticeData, setNoticeData] = useState({
        noticeDeadline: '',
        noticeSentDate: '',
        noticeType: 'Legal Demand',
        remarks: 'Urgent notice issued',
        dispositions: []
    });

    useEffect(() => {
        if (caseId) {
            checkExistingData();
        }
    }, [caseId]);

    const checkExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/demandNotice/case/${caseId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setHasExistingData(true);
                setNoticeData({
                    noticeDeadline: response.data.noticeDeadline || '',
                    noticeSentDate: response.data.noticeSentDate || '',
                    noticeType: response.data.noticeType || 'Legal Demand',
                    remarks: response.data.remarks || '',
                    dispositions: response.data.dispositions || []
                });
            }
        } catch (error) {
            console.log('No existing notice data found - first time visit');
        }
    };

    const handleInputChange = (e) => {
        if (hasExistingData) return;
        const { name, value } = e.target;
        setNoticeData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openDispositionModal = () => setIsDispositionModalOpen(true);
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const handleSaveDisposition = (dispositionData) => {
        setNoticeData(prev => ({
            ...prev,
            dispositions: [...prev.dispositions, dispositionData]
        }));
        closeDispositionModal();
    };

    const handleSaveAndNext = async () => {
        if (!caseId) {
            console.error('No caseId provided');
            return;
        }

        if (hasExistingData) {
            if (onStageComplete) {
                onStageComplete();
            }
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...noticeData,
                caseId: caseId
            };

            await axios.post('/api/api/demandNotice', payload);
            setHasExistingData(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving demand notice:', error);
        } finally {
            setLoading(false);
        }
    };

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    const documentData = [
        { name: "Aadhar", createdDate: "Hello world", uploadedBy: "Hello world" },
    ];

    const documentColumns = [
        { key: "name", label: "Document Name" },
        { key: "createdDate", label: "Created Date" },
        { key: "uploadedBy", label: "Uploaded By" },
    ];

    return (
        <div className='demandNotice-Sarfasei-container'>
            <div className='demandNotice-Sarfasei-topcontent-container'>
                <div className='demandNotice-Sarfasei-topcontent-heading'>
                    <h5>Demand Notice Generation - Section 13(2) {hasExistingData && '(Completed)'}</h5>
                </div>
                <div className='demandNotice-Sarfasei-topcontent'>
                    <div className='demandNotice-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-notice-form-row">
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Deadline</label>
                                <input 
                                    type="date" 
                                    className="notice-input"
                                    name="noticeDeadline"
                                    value={noticeData.noticeDeadline}
                                    onChange={handleInputChange}
                                    readOnly={hasExistingData}
                                />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Sent Date</label>
                                <input 
                                    type="date" 
                                    className="notice-input"
                                    name="noticeSentDate"
                                    value={noticeData.noticeSentDate}
                                    onChange={handleInputChange}
                                    readOnly={hasExistingData}
                                />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Type</label>
                                <select 
                                    className="notice-input"
                                    name="noticeType"
                                    value={noticeData.noticeType}
                                    onChange={handleInputChange}
                                    disabled={hasExistingData}
                                >
                                    <option value="Legal Demand">Legal Demand</option>
                                    <option value="Taking control of existing business">Taking control of existing business</option>
                                    <option value="Appointing a receiver to manage assets">Appointing a receiver to manage assets</option>
                                    <option value="Taking possession of assets">Taking possession of assets</option>
                                </select>
                            </div>
                        </div>
                        <div className="Sarfasei-notice-form-group">
                            <label>Remarks</label>
                            <textarea 
                                className="Sarfasei-notice-textarea" 
                                rows="3"
                                name="remarks"
                                value={noticeData.remarks}
                                onChange={handleInputChange}
                                readOnly={hasExistingData}
                            ></textarea>
                        </div>
                    </div>

                    <div className='demandNotice-Sarfasei-topcontent-rightside'>
                        <button 
                            onClick={openModal} 
                            className='assetValuation-generatenotice-btn'
                        >
                            Generate Notice
                        </button>
                        <h4>View Generated Notice</h4>
                        <div className='demandNotice-Sarfasei-topcontent-rightside-icon'>
                        <div className='demandNotice-Sarfasei-icon'>
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" />
                            </div>
                            <div className='demandNotice-Sarfasei-icon'>
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" />
                                <img src={mailboxIcon} alt="Physical Mail" className="custom-icon physical-mail-icon" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='demandNotice-Sarfasei-middle-content'>
                <div className='demandNotice-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add" onClick={openDispositionModal} disabled={hasExistingData} />
                </div>
                <div className='demandNotice-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={noticeData.dispositions} />
                </div>
            </div>

            <div className='demandNotice-Sarfasei-Bottom-content'>
                <div className='demandNotice-Sarfasei-Bottom-content-heading'>
                    <h5>Uploaded Documents</h5>
                    <AddButton text="Add" onClick={""} disabled={hasExistingData} />
                </div>
                <div className='demandNotice-Sarfasei-Bottom-content-formdata'>
                    <ReusableGrid columns={documentColumns} data={documentData} />
                </div>
            </div>

            <div className='demandNotice-Sarfasei-Bottom-btn'>
                <CancelButton/>
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'}
                    onClick={handleSaveAndNext}
                    disabled={loading}
                />
            </div>

            <NoticePreviewModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                caseId={caseId} 
            />
            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
                disabled={hasExistingData}
            />
        </div>
    );
};

DemandNoticeSarfasei.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default DemandNoticeSarfasei;
