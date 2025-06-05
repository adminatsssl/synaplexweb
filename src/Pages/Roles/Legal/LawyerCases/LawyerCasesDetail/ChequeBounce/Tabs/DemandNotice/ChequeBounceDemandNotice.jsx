import React, { useState, useEffect } from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceDemandNotice.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import NoticePreviewModal from './NoticePreviewModal';
import DispositionModal from './DispositionModal';
import PropTypes from 'prop-types';
import axios from 'axios';

// Import icons
import whatsappIcon from '../../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../../assets/icons/mailbox.png';

const ChequeBounceDemandNotice = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to ChequeBounceDemandNotice');
        return null;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        noticeDeadline: '',
        noticeSentDate: '',
        noticeType: 'Cheque Bounce',
        comment: '',
        dispositions: []
    });

    useEffect(() => {
        fetchExistingData();
    }, [caseId]);

    const fetchExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/demandnoticeCB/case/${caseId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setHasExistingData(true);
                setFormData({
                    noticeDeadline: response.data.noticeDeadline || '',
                    noticeSentDate: response.data.noticeSentDate || '',
                    noticeType: response.data.noticeType || 'Cheque Bounce',
                    comment: response.data.comment || '',
                    dispositions: response.data.dispositions || []
                });
            }
        } catch (error) {
            console.log('No existing notice data found');
        }
    };

    const handleInputChange = (e) => {
        if (hasExistingData) return;
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openDispositionModal = () => setIsDispositionModalOpen(true);
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const handleSaveDisposition = (dispositionData) => {
        if (hasExistingData) return;
        setFormData(prev => ({
            ...prev,
            dispositions: [...prev.dispositions, dispositionData]
        }));
        closeDispositionModal();
    };

    const handleSaveAndNext = async () => {
        if (hasExistingData) {
            if (onStageComplete) {
                onStageComplete();
            }
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...formData,
                caseId: caseId
            };
            console.log("Payload : ", payload);
            await axios.post('/api/api/demandnoticeCB', payload);
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
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

    return (
        <div className='chequeBounce-demandNotice-container'>
            <div className='chequeBounce-demandNotice-topcontent-container'>
                <div className='chequeBounce-demandNotice-topcontent-heading'>
                    <h5>
                        Demand Notice Generation - Section 13(2) 
                        {hasExistingData && ' (Completed - Fields are Read Only)'}
                    </h5>
                </div>
                <div className='chequeBounce-demandNotice-topcontent'>
                    <div className='chequeBounce-demandNotice-topcontent-leftside'>
                        <div className="chequeBounce-demandNotice-form-row">
                            <div className="chequeBounce-demandNotice-form-row-content">
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Deadline</label>
                                    <input 
                                        type="date" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="noticeDeadline"
                                        value={formData.noticeDeadline}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Sent Date</label>
                                    <input 
                                        type="date" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="noticeSentDate"
                                        value={formData.noticeSentDate}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>

                            <div className="chequeBounce-demandNotice-form-row-content">
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Type</label>
                                    <select 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="noticeType"
                                        value={formData.noticeType}
                                        onChange={handleInputChange}
                                        disabled={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    >
                                        <option value="Cheque Bounce">Cheque Bounce</option>
                                    </select>
                                </div>
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Comment</label>
                                    <textarea 
                                        className={`chequeBounce-demandNotice-textarea ${hasExistingData ? 'readonly-field' : ''}`}
                                        rows="3"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='chequeBounce-demandNotice-topcontent-rightside'>
                        <button 
                            onClick={openModal} 
                            className='assetValuation-generatenotice-btn'
                            disabled={loading || !formData.noticeDeadline || !formData.noticeSentDate}
                            style={hasExistingData ? { opacity: 0.7 } : {}}
                        >
                            Generate Notice
                        </button>
                        <h4>View Generated Notice</h4>
                        <div className='chequeBounce-demandNotice-topcontent-rightside-icon'>
                            <div className='chequeBounce-demandNotice-icon'>
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" />
                            </div>
                            <div className='chequeBounce-demandNotice-icon'>
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" />
                                <img src={mailboxIcon} alt="Physical Mail" className="custom-icon physical-mail-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chequeBounce-demandNotice-middle-content'>
                <div className='chequeBounce-demandNotice-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton 
                        text="Add" 
                        onClick={openDispositionModal} 
                        disabled={hasExistingData}
                        style={hasExistingData ? { opacity: 0.7 } : {}}
                    />
                </div>
                <div className='chequeBounce-demandNotice-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
                </div>
            </div>

            <div className='chequeBounce-demandNotice-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'} 
                    onClick={handleSaveAndNext}
                    disabled={loading || (!hasExistingData && (!formData.noticeDeadline || !formData.noticeSentDate))}
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

ChequeBounceDemandNotice.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default ChequeBounceDemandNotice;
