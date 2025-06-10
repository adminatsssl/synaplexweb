import React, { useState, useEffect } from 'react';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './ChequeBounceTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DemandNotice/DispositionModal';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChequeBounceTrackingResponse = ({ caseId, onStageComplete }) => {
    if (!caseId) {
        console.error('No caseId provided to ChequeBounceTrackingResponse');
        return null;
    }



    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        daysRemainingForResponse: '',
        isResponseReceived: false,
        isResponseOverdue: false,
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
            const response = await axios.get(`/api/api/tracking15DayResponseCB/case/${caseId}`,{
                headers: getAuthHeaders()
            });
            console.log("GET Response:", response.data);
            
            if (response.data && response.data.status === 'SUCCESS' && response.data.data) {
                const trackingData = response.data.data;
                setHasExistingData(true);
                setFormData({
                    daysRemainingForResponse: trackingData.daysRemainingForResponse || '',
                    isResponseReceived: trackingData.isResponseReceived || false,
                    isResponseOverdue: trackingData.isResponseOverdue || false,
                    dispositions: trackingData.dispositions || []
                });
            }
        } catch (error) {
            console.error('Error fetching tracking response:', error.response || error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
    };

    const handleInputChange = (e) => {
        if (hasExistingData) return;
        
        const { name, value, type } = e.target;
        if (type === 'radio') {
            setFormData(prev => ({
                ...prev,
                [name]: value === 'true'
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
            await axios.post('/api/api/tracking15DayResponseCB', payload,{
                headers: getAuthHeaders()
            });
            setHasExistingData(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving tracking response:', error);
        } finally {
            setLoading(false);
        }
    };

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    return (
        <div className="chequeBounce-trackingResponse-container">
            <div className='chequeBounce-trackingResponse-top-container'>
                <div className='chequeBounce-trackingResponse-top-container-heading'> 
                    <h5 className="chequeBounce-trackingResponse-title">
                        Tracking 15-Day Response {hasExistingData && '(Completed - Fields are Read Only)'}
                    </h5>
                </div>
                
                <div className="chequeBounce-trackingResponse-box">
                    <div className='chequeBounce-trackingResponse-topcontent-box'>
                        <h5 className="chequeBounce-trackingResponse-box-title">Days/Time Remaining For Response</h5>
                        <input
                            type="number"
                            name="daysRemainingForResponse"
                            value={formData.daysRemainingForResponse}
                            onChange={handleInputChange}
                            className={`chequeBounce-trackingResponse-days-input ${hasExistingData ? 'readonly-field' : ''}`}
                            readOnly={hasExistingData}
                            style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                        />
                        <div className="chequeBounce-trackingResponse-radio-container">
                            <div className="chequeBounce-trackingResponse-radio-group1">
                                <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Received ?</strong></p>
                                <div className='chequeBounce-trackingResponse-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="isResponseReceived" 
                                            value="true"
                                            checked={formData.isResponseReceived === true}
                                            onChange={handleInputChange}
                                            disabled={hasExistingData}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="isResponseReceived" 
                                            value="false"
                                            checked={formData.isResponseReceived === false}
                                            onChange={handleInputChange}
                                            disabled={hasExistingData}
                                        /> No
                                    </label>
                                </div>
                            </div>
                            <div className="chequeBounce-trackingResponse-radio-group2">
                                <p className="chequeBounce-trackingResponse-radio-title"><strong>Is Response Overdue ?</strong></p>
                                <div className='chequeBounce-trackingResponse-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="isResponseOverdue" 
                                            value="true"
                                            checked={formData.isResponseOverdue === true}
                                            onChange={handleInputChange}
                                            disabled={hasExistingData}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="isResponseOverdue" 
                                            value="false"
                                            checked={formData.isResponseOverdue === false}
                                            onChange={handleInputChange}
                                            disabled={hasExistingData}
                                        /> No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chequeBounce-trackingResponse-middle-content'>
                <div className='chequeBounce-trackingResponse-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton 
                        text="Add" 
                        onClick={openDispositionModal} 
                        disabled={hasExistingData}
                        style={hasExistingData ? { opacity: 0.7 } : {}}
                    />
                </div>
                <div className='chequeBounce-trackingResponse-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
                </div>
            </div>

            <div className='chequeBounce-trackingResponse-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={hasExistingData ? 'Next' : 'Save & Next'} 
                    onClick={handleSaveAndNext}
                    disabled={loading || (!hasExistingData && !formData.daysRemainingForResponse)}
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

ChequeBounceTrackingResponse.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default ChequeBounceTrackingResponse;
