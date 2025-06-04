import React, { useState, useEffect } from 'react';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DemandNotice/DispositionModal';
import './ChequeBounceComplaintFilling.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChequeBounceComplaintFilling = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to ChequeBounceComplaintFilling');
        return null;
    }

    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        caseNumber: '',
        complaintDate: '',
        courtName: '',
        notes: '',
        dispositions: []
    });

    useEffect(() => {
        fetchExistingData();
    }, [caseId]);

    const fetchExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/complaintFilingCB/case/${caseId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setHasExistingData(true);
                setFormData({
                    caseNumber: response.data.caseNumber || '',
                    complaintDate: response.data.complaintDate || '',
                    courtName: response.data.courtName || '',
                    notes: response.data.notes || '',
                    dispositions: response.data.dispositions || []
                });
            }
        } catch (error) {
            console.log('No existing complaint filing data found');
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
            await axios.post('/api/api/complaintFilingCB', payload);
            setHasExistingData(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving complaint filing:', error);
        } finally {
            setLoading(false);
        }
    };

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    return (
        <div className='chequeBounce-complaintFilling-container'>
            <div className='chequeBounce-complaintFilling-topcontent-container'>
                <div className='chequeBounce-complaintFilling-topcontent-heading'>
                    <h5>Complaint Filing {hasExistingData && '(Completed - Fields are Read Only)'}</h5>
                </div>
                <div className='chequeBounce-complaintFilling-topcontent'>
                    <div className='chequeBounce-complaintFilling-topcontent-leftside'>
                        <div className="chequeBounce-complaintFilling-form-row">
                            <div className="chequeBounce-complaintFilling-form-row-content">
                                <div className="chequeBounce-complaintFilling-form-group">
                                    <label>Case Number</label>
                                    <input 
                                        type="text" 
                                        className={`possessionnotice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="caseNumber"
                                        value={formData.caseNumber}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-complaintFilling-form-group">
                                    <label>Court Name</label>
                                    <input 
                                        type="text" 
                                        className={`possessionnotice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="courtName"
                                        value={formData.courtName}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                            </div>
                            <div className="chequeBounce-complaintFilling-form-row-content">
                                <div className="chequeBounce-complaintFilling-form-group">
                                    <label>Complaint Date</label>
                                    <input 
                                        type='date'
                                        className={`possessionnotice-input ${hasExistingData ? 'readonly-field' : ''}`}
                                        name="complaintDate"
                                        value={formData.complaintDate}
                                        onChange={handleInputChange}
                                        readOnly={hasExistingData}
                                        style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                </div>
                                <div className="chequeBounce-complaintFilling-form-group">
                                    <label>Notes</label>
                                    <textarea 
                                        className={`chequeBounce-complaintFilling-textarea ${hasExistingData ? 'readonly-field' : ''}`}
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

            <div className='chequeBounce-complaintFilling-middle-content'>
                <div className='chequeBounce-complaintFilling-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton 
                        text="Add" 
                        onClick={openDispositionModal} 
                        disabled={hasExistingData}
                        style={hasExistingData ? { opacity: 0.7 } : {}}
                    />
                </div>
                <div className='chequeBounce-complaintFilling-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
                </div>
            </div>

            <div className='chequeBounce-complaintFilling-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'} 
                    onClick={handleSaveAndNext}
                    disabled={loading || (!hasExistingData && (!formData.caseNumber || !formData.complaintDate || !formData.courtName))}
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

ChequeBounceComplaintFilling.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default ChequeBounceComplaintFilling;