import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import './SarfaesiTrackingResponse.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DispositionModal';
import axios from 'axios';

const SarfaesiTrackingResponse = ({ caseId, onStageComplete }) => {
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);
    const [formData, setFormData] = useState({
        daysRemainingForResponse: '',
        isResponseReceived: false,
        isResponseOverdue: false,
        caseId: caseId
    });
    const [dispositions, setDispositions] = useState([]);

    useEffect(() => {
        fetchTrackingResponse();
    }, [caseId]);

    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    const fetchTrackingResponse = async () => {
        try {
            const response = await axios.get(`/api/api/tracking60DayResponse/case/${caseId}`,{
                headers: getAuthHeaders()
            });
            const data = response.data;
            if (data && Object.keys(data).length > 0) {
                setIsDataExists(true);
                setFormData({
                    daysRemainingForResponse: data.daysRemainingForResponse || '',
                    isResponseReceived: data.isResponseReceived || false,
                    isResponseOverdue: data.isResponseOverdue || false,
                    caseId: data.caseId
                });
                setDispositions(data.dispositions || []);
            }
        } catch (error) {
            console.error('Error fetching tracking response:', error);
        }
    };

    const handleInputChange = (e) => {
        if (isDataExists) return;
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadioChange = (field) => (e) => {
        if (isDataExists) return;
        const value = e.target.value === 'true';
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveDisposition = (dispositionData) => {
        if (isDataExists) return;
        setDispositions(prev => [...prev, dispositionData]);
        closeDispositionModal();
    };

    const handleSubmit = async () => {
        if (isDataExists) {
            if (onStageComplete) {
                onStageComplete();
            }
            return;
        }

        try {
            const payload = {
                ...formData,
                dispositions
            };
            await axios.post('/api/api/tracking60DayResponse', payload, {
                headers: getAuthHeaders()
            });
            setIsDataExists(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving tracking response:', error);
        }
    };

    const openDispositionModal = () => {
        if (isDataExists) return;
        setIsDispositionModalOpen(true);
    };
    
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Description" }
    ];

    return (
        <div className="sarfaesi-tracking-response-container">
            <div className='sarfaesi-tracking-response-top-container'>
                <div className='sarfaesi-tracking-response-top-container-heading'> 
                    <h5 className="sarfaesi-tracking-response-title">
                        Tracking 60-Day Response {isDataExists && '(Completed)'}
                    </h5>
                </div>
                
                <div className="sarfaesi-tracking-response-box">
                    <div className='sarfaesi-tracking-response-topcontent-box'>
                        <h5 className="sarfaesi-tracking-response-box-title">Days/Time Remaining For Response</h5>
                        <input
                            type="number"
                            name="daysRemainingForResponse"
                            value={formData.daysRemainingForResponse}
                            onChange={handleInputChange}
                            className="sarfaesi-tracking-response-days-input"
                            disabled={isDataExists}
                        />
                        <div className="sarfaesi-tracking-response-radio-container">
                            <div className="sarfaesi-tracking-response-radio-group1">
                                <p className="sarfaesi-tracking-response-radio-title">
                                    <strong>Is Response Received?</strong>
                                </p>
                                <div className='sarfaesi-tracking-response-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseReceived"
                                            value="true"
                                            checked={formData.isResponseReceived === true}
                                            onChange={handleRadioChange('isResponseReceived')}
                                            disabled={isDataExists}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseReceived"
                                            value="false"
                                            checked={formData.isResponseReceived === false}
                                            onChange={handleRadioChange('isResponseReceived')}
                                            disabled={isDataExists}
                                        /> No
                                    </label>
                                </div>
                            </div>
                            <div className="sarfaesi-tracking-response-radio-group2">
                                <p className="sarfaesi-tracking-response-radio-title">
                                    <strong>Is Response Overdue?</strong>
                                </p>
                                <div className='sarfaesi-tracking-response-radio-btn'>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseOverdue"
                                            value="true"
                                            checked={formData.isResponseOverdue === true}
                                            onChange={handleRadioChange('isResponseOverdue')}
                                            disabled={isDataExists}
                                        /> Yes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="responseOverdue"
                                            value="false"
                                            checked={formData.isResponseOverdue === false}
                                            onChange={handleRadioChange('isResponseOverdue')}
                                            disabled={isDataExists}
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
                    <AddButton text="Add " onClick={openDispositionModal} disabled={isDataExists} />
                </div>
                <div className='sarfaesi-tracking-response-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositions} />
                </div>
            </div>

            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='sarfaesi-tracking-response-Bottom-btn'>
                <CancelButton />
                <SaveButton 
                    label={isDataExists ? 'Next' : 'Save & Next'}
                    onClick={handleSubmit}
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
