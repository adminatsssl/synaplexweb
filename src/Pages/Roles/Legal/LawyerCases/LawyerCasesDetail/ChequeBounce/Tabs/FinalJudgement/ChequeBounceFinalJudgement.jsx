import React, { useState, useEffect } from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import './ChequeBounceFinalJudgement.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DemandNotice/DispositionModal';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChequeBounceFinalJudgement = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to ChequeBounceFinalJudgement');
        return null;
    }

    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        judgmentDate: '',
        judgmentType: '',
        courtOrderDocuments: '',
        judgmentSummary: '',
        dispositions: []
    });

    useEffect(() => {
        fetchExistingData();
    }, [caseId]);

    const fetchExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/finalJudgmentCB/case/${caseId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setHasExistingData(true);
                setFormData({
                    judgmentDate: response.data.judgmentDate || '',
                    judgmentType: response.data.judgmentType || '',
                    courtOrderDocuments: response.data.courtOrderDocuments || '',
                    judgmentSummary: response.data.judgmentSummary || '',
                    dispositions: response.data.dispositions || []
                });
            }
        } catch (error) {
            console.log('No existing final judgment data found');
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
            await axios.post('/api/api/finalJudgmentCB', payload);
            setHasExistingData(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving final judgment:', error);
        } finally {
            setLoading(false);
        }
    };

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    return (
        <div className='chequeBounce-finalJudgement-container'>
            <div className='chequeBounce-finalJudgement-topcontent-container'>
                <div className='chequeBounce-finalJudgement-topcontent-heading'>
                    <h5>Final Judgement {hasExistingData && '(Completed - Fields are Read Only)'}</h5>
                </div>
                <div className='chequeBounce-finalJudgement-topcontent'>
                    <div className='chequeBounce-finalJudgement-topcontent-leftside'>
                        <div className="chequeBounce-finalJudgement-form-row">
                            <div className='chequeBounce-finalJudgement-form-row-content'>
                                <div className="chequeBounce-finalJudgement-form-group">
                                    <label>Judgment Date</label>
                                    <input 
                                        type="date" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="judgmentDate"
                                        value={formData.judgmentDate}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-finalJudgement-form-group">
                                    <label>Court Order Documents</label>
                                    <input 
                                        type="text" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="courtOrderDocuments"
                                        value={formData.courtOrderDocuments}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>
                            
                            <div className='chequeBounce-finalJudgement-form-row-content'>
                                <div className="chequeBounce-finalJudgement-form-group">
                                    <label>Judgment Type</label>
                                    <input 
                                        type='text'
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="judgmentType"
                                        value={formData.judgmentType}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-finalJudgement-form-group">
                                    <label>Judgment Summary</label>
                                    <textarea 
                                        className={`chequeBounce-finalJudgement-textarea ${hasExistingData ? 'readonly-field' : ''}`}
                                        rows="3"
                                        name="judgmentSummary"
                                        value={formData.judgmentSummary}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chequeBounce-finalJudgement-middle-content'>
                <div className='chequeBounce-finalJudgement-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton 
                        text="Add" 
                        onClick={openDispositionModal} 
                        disabled={hasExistingData}
                        style={hasExistingData ? { opacity: 0.7 } : {}}
                    />
                </div>
                <div className='chequeBounce-finalJudgement-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
                </div>
            </div>

            <div className='chequeBounce-finalJudgement-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'} 
                    onClick={handleSaveAndNext}
                    disabled={loading || (!hasExistingData && (!formData.judgmentDate || !formData.judgmentType))}
                />
            </div>

            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
                disabled={hasExistingData}
            />
        </div>
    );
};

ChequeBounceFinalJudgement.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default ChequeBounceFinalJudgement;
