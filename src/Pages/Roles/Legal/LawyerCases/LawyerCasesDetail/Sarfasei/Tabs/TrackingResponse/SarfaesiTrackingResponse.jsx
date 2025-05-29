import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DispositionModal';
import axios from 'axios';

const dispositionData = [
    { stage: "Stage 1", comment: "Hello world" },
];

const dispositionColumns = [
    { key: "stage", label: "Disposition Stage" },
    { key: "comment", label: "Comment" },
];

const initialTrackingData = {
    daysRemainingForResponse: 0,
    isResponseReceived: false,
    isResponseOverdue: false
};

const SarfaesiTrackingResponse = ({ caseId, onStageComplete }) => {
    const [trackingData, setTrackingData] = useState(initialTrackingData);
    const [loading, setLoading] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);

    useEffect(() => {
        if (caseId) {
            checkExistingData();
        }
    }, [caseId]);

    const checkExistingData = async () => {
        try {
            const response = await axios.get(`/api/api/tracking60DayResponse/case/${caseId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setHasExistingData(true);
                setTrackingData({
                    daysRemainingForResponse: response.data.daysRemainingForResponse || 0,
                    isResponseReceived: response.data.isResponseReceived || false,
                    isResponseOverdue: response.data.isResponseOverdue || false
                });
            }
        } catch (error) {
            // If 404 or no data, it means this is first time
            // We don't need to show any error as this is expected for first visit
            console.log('No existing tracking data found - first time visit');
        }
    };

    const handleInputChange = (e) => {
        if (hasExistingData) return; // Prevent changes if data exists
        const { name, value } = e.target;
        const newValue = e.target.type === 'number' ? parseFloat(value) : value;
        setTrackingData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleRadioChange = (field) => (e) => {
        if (hasExistingData) return; // Prevent changes if data exists
        const value = e.target.value === 'true';
        setTrackingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveAndNext = async () => {
        if (!caseId) {
            alert('Case ID is missing!');
            return;
        }

        // Don't allow saving if data already exists
        if (hasExistingData) {
            if (onStageComplete) {
                onStageComplete();
            }
            return;
        }

        try {
            setLoading(true);
            const payload = {
                daysRemainingForResponse: parseFloat(trackingData.daysRemainingForResponse) || 0,
                isResponseReceived: trackingData.isResponseReceived,
                isResponseOverdue: trackingData.isResponseOverdue,
                caseId: caseId,
                dispositions: [
                    {
                        name: "jkasfnjkaf",
                        description: "asjkfajkf"
                    }
                ]
            };

            console.log('Sending payload:', payload);
            const response = await axios.post('/api/api/tracking60DayResponse', payload);
            
            if (response.status === 200) {
                setHasExistingData(true);
                if (response.data) {
                    setTrackingData(prev => ({
                        ...prev,
                        ...response.data
                    }));
                }
                // alert('Data saved successfully!');
                
                // Move to next stage after successful save
                if (onStageComplete) {
                    onStageComplete();
                }
            }
        } catch (error) {
            console.error('Error saving tracking data:', error);
            alert('Error saving data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const openDispositionModal = () => setIsDispositionModalOpen(true);
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const handleSaveDisposition = () => {
        // Handle saving disposition data
        closeDispositionModal();
    };

    if (!caseId) {
        return <div>Error: Case ID is required</div>;
    }

    return (
        <div className="sarfaesi-tracking-response-container">
            <div className='sarfaesi-tracking-response-top-container'>
                <div className='sarfaesi-tracking-response-top-container-heading'> 
                    <h5 className="sarfaesi-tracking-response-title">
                        Tracking 15-Day Response {hasExistingData && '(Completed)'}
                    </h5>
                </div>
                
                <div className="sarfaesi-tracking-response-box">
                    <div className='sarfaesi-tracking-response-topcontent-box'>
                        <h5 className="sarfaesi-tracking-response-box-title">Days/Time Remaining For Response</h5>
                        <input
                            type="number"
                            name="daysRemainingForResponse"
                            value={trackingData.daysRemainingForResponse}
                            onChange={handleInputChange}
                            className="sarfaesi-tracking-response-days-input"
                            step="0.01"
                            min="0"
                            readOnly={hasExistingData}
                            style={hasExistingData ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                        />
                        <div className="sarfaesi-tracking-response-radio-container">
                            <div className="sarfaesi-tracking-response-radio-group1">
                                <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Received ?</strong></p>
                                <div className='sarfaesi-tracking-response-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseReceived" 
                                            value="true"
                                            checked={trackingData.isResponseReceived === true}
                                            onChange={handleRadioChange('isResponseReceived')}
                                            disabled={hasExistingData}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseReceived" 
                                            value="false"
                                            checked={trackingData.isResponseReceived === false}
                                            onChange={handleRadioChange('isResponseReceived')}
                                            disabled={hasExistingData}
                                        /> No
                                    </label>
                                </div>
                            </div>
                            <div className="sarfaesi-tracking-response-radio-group2">
                                <p className="sarfaesi-tracking-response-radio-title"><strong>Is Response Overdue ?</strong></p>
                                <div className='sarfaesi-tracking-response-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseOverdue" 
                                            value="true"
                                            checked={trackingData.isResponseOverdue === true}
                                            onChange={handleRadioChange('isResponseOverdue')}
                                            disabled={hasExistingData}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseOverdue" 
                                            value="false"
                                            checked={trackingData.isResponseOverdue === false}
                                            onChange={handleRadioChange('isResponseOverdue')}
                                            disabled={hasExistingData}
                                        /> No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='sarfaesi-tracking-response-middle-content'>
                <div className='sarfaesi-tracking-response-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} />
                </div>
                <div className='sarfaesi-tracking-response-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='sarfaesi-tracking-response-Bottom-btn'>
                <CancelButton/>
                <SaveButton 
                    label='Save & Next' 
                    onClick={handleSaveAndNext}
                    disabled={loading || (hasExistingData && !onStageComplete)}
                />
            </div>
        </div>
    );
};

SarfaesiTrackingResponse.propTypes = {
    caseId: PropTypes.number.isRequired,
    onStageComplete: PropTypes.func
};

export default SarfaesiTrackingResponse;
