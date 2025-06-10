import React, { useState, useEffect } from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import './ChequeBounceCourtProceedings.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DemandNotice/DispositionModal';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChequeBounceCourtProceedings = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to ChequeBounceCourtProceedings');
        return null;
    }

    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hearingDate: '',
        judgeName: '',
        supportingEvidence: '',
        notes: '',
        dispositions: []
    });

    useEffect(() => {
        fetchExistingData();
    }, [caseId]);

    const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

    const fetchExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/courtProceedingsCB/case/${caseId}`,{
                headers: getAuthHeaders()
            });
            console.log("GET Response:", response.data);
            
            if (response.data && response.data.status === 'SUCCESS' && response.data.data) {
                const courtData = response.data.data;
                setHasExistingData(true);
                setFormData({
                    hearingDate: courtData.hearingDate || '',
                    judgeName: courtData.judgeName || '',
                    supportingEvidence: courtData.supportingEvidence || '',
                    notes: courtData.notes || '',
                    dispositions: courtData.dispositions || []
                });
            }
        } catch (error) {
            console.error('Error fetching court proceedings:', error.response || error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
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
            await axios.post('/api/api/courtProceedingsCB', payload,{
                headers: getAuthHeaders()
            });
            setHasExistingData(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving court proceedings:', error);
        } finally {
            setLoading(false);
        }
    };

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    return (
        <div className='chequeBounce-courtProceeding-container'>
            <div className='chequeBounce-courtProceeding-topcontent-container'>
                <div className='chequeBounce-courtProceeding-topcontent-heading'>
                    <h5>Court Hearing {hasExistingData && '(Completed - Fields are Read Only)'}</h5>
                </div>
                <div className='chequeBounce-courtProceeding-topcontent'>
                    <div className='chequeBounce-courtProceeding-topcontent-leftside'>
                        <div className="chequeBounce-courtProceeding-form-row">
                            <div className='chequeBounce-courtProceeding-form-row-content'>
                                <div className="chequeBounce-courtProceeding-form-group">
                                    <label>Hearing Date</label>
                                    <input 
                                        type="date" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="hearingDate"
                                        value={formData.hearingDate}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-courtProceeding-form-group">
                                    <label>Supporting Evidence</label>
                                    <input 
                                        type="text" 
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="supportingEvidence"
                                        value={formData.supportingEvidence}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>
                            
                            <div className='chequeBounce-courtProceeding-form-row-content'>
                                <div className="chequeBounce-courtProceeding-form-group">
                                    <label>Judge Name</label>
                                    <input 
                                        type='text'
                                        className={`notice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="judgeName"
                                        value={formData.judgeName}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-courtProceeding-form-group">
                                    <label>Notes</label>
                                    <textarea 
                                        className={`chequeBounce-courtProceeding-textarea ${hasExistingData ? 'readonly-field' : ''}`}
                                        rows="3"
                                        name="notes"
                                        value={formData.notes}
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

            <div className='chequeBounce-courtProceeding-middle-content'>
                <div className='chequeBounce-courtProceeding-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton 
                        text="Add" 
                        onClick={openDispositionModal} 
                        disabled={hasExistingData}
                        style={hasExistingData ? { opacity: 0.7 } : {}}
                    />
                </div>
                <div className='chequeBounce-courtProceeding-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
                </div>
            </div>

            <div className='chequeBounce-courtProceeding-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'} 
                    onClick={handleSaveAndNext}
                    disabled={loading || (!hasExistingData && (!formData.hearingDate || !formData.judgeName))}
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

ChequeBounceCourtProceedings.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default ChequeBounceCourtProceedings;
