import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
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

const SarfaesiTrackingResponse = ({ caseId }) => {
    const [trackingData, setTrackingData] = useState(initialTrackingData);
    const [loading, setLoading] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);

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
        const { name, value } = e.target;
        // For number inputs, convert the string value to a number
        const newValue = e.target.type === 'number' ? parseFloat(value) : value;
        setTrackingData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleRadioChange = (field) => (e) => {
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

            const method = hasExistingData ? 'put' : 'post';
            const url = hasExistingData 
                ? `/api/api/tracking60DayResponse/${caseId}`
                : '/api/api/tracking60DayResponse';

            console.log('Sending payload:', payload);
            const response = await axios[method](url, payload);
            
            if (response.status === 200) {
                setHasExistingData(true);
                // Update the local state with the response data if available
                if (response.data) {
                    setTrackingData(prev => ({
                        ...prev,
                        ...response.data
                    }));
                }
                alert('Data saved successfully!');
            }
        } catch (error) {
            console.error('Error saving tracking data:', error);
            alert('Error saving data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!caseId) {
        return <div>Error: Case ID is required</div>;
    }

    return (
        <div className="sarfaesi-tracking-response-container">
            <div className='sarfaesi-tracking-response-top-container'>
                <div className='sarfaesi-tracking-response-top-container-heading'> 
                    <h5 className="sarfaesi-tracking-response-title">Tracking 15-Day Response:</h5>
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
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseReceived" 
                                            value="false"
                                            checked={trackingData.isResponseReceived === false}
                                            onChange={handleRadioChange('isResponseReceived')}
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
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseOverdue" 
                                            value="false"
                                            checked={trackingData.isResponseOverdue === false}
                                            onChange={handleRadioChange('isResponseOverdue')}
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
                </div>
                <div className='sarfaesi-tracking-response-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='sarfaesi-tracking-response-Bottom-btn'>
                <CancelButton/>
                <SaveButton 
                    label='Save & Next' 
                    onClick={handleSaveAndNext}
                    disabled={loading}
                />
            </div>
        </div>
    );
};

SarfaesiTrackingResponse.propTypes = {
    caseId: PropTypes.number.isRequired
};

export default SarfaesiTrackingResponse;
