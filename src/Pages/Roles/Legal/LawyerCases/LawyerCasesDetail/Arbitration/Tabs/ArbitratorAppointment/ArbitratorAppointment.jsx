import React, { useEffect, useState } from 'react';
import './ArbitratorAppointment.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import axios from 'axios';

const ArbitratorAppointment = ({ caseId, onStageComplete }) => {
    const [isDataExists, setIsDataExists] = useState(false);
    const [formData, setFormData] = useState({
        status: "Pending",
        arbitratorPanel: "",
        escalationReason: "",
        caseId: caseId
    });

    useEffect(() => {
        fetchAppointment();
    }, [caseId]);

    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

   const fetchAppointment = async () => {
    try {
        const response = await axios.get(`/api/api/arbitrator-appointment/case/${caseId}`, {
            headers: getAuthHeaders()
        });
        const data = response.data;
        if (data) {
            setFormData({
                status: data.status || "Pending",
                arbitratorPanel: data.arbitratorPanel || "",
                escalationReason: data.escalationReason || "",
                caseId: data.caseId || caseId
            });
            setIsDataExists(true);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
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

    const handleSubmit = async () => {
    if (isDataExists) {
        if (onStageComplete) onStageComplete();
        return;
    }

    try {
        const payload = {
            caseId: formData.caseId,
            status: formData.status,
            arbitratorPanel: formData.arbitratorPanel,
            escalationReason: formData.escalationReason
        };

        await axios.post(`/api/api/arbitrator-appointment`, payload, {
            headers: getAuthHeaders()
        });
        setIsDataExists(true);

        if (onStageComplete) onStageComplete();
    } catch (error) {
        console.error("Post Error:", error);
    }
};

    return (
        <div className='Arbitrator-Appointment-container'>
            <div className='Arbitrator-Appointment-topcontent-container'>
                <div className='Arbitrator-Appointment-topcontent-heading'>
                    <h5>Arbitrator Appointment</h5>
                </div>
                <div className='Arbitrator-Appointment-topcontent'>
                    <div className='Arbitrator-Appointment-topcontent-leftside'>
                        <div className="Arbitrator-Appointment-form-row">
                            <div className="Arbitrator-Appointment-form-group">
                                <label>Arbitration ID</label>
                                <input
                                    type="text"
                                    className="notice-input"
                                    name="arbitrationId"
                                    value={formData.arbitrationId}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Arbitrator-Appointment-form-group">
                                <label>Status</label>
                                <select
                                    className="notice-input"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Escalated">Escalated</option>
                                </select>
                            </div>
                            <div className="Arbitrator-Appointment-form-group-select">
                                <label>Arbitrator Panel</label>
                                <input
                                    type="text"
                                    className="notice-input"
                                    name="arbitratorPanel"
                                    value={formData.arbitratorPanel}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                />
                            </div>
                        </div>
                        <div className="Arbitrator-Appointment-form-group-textarea">
                            <label>Escalation Reason</label>
                            <textarea
                                className="Arbitrator-Appointment-textarea"
                                rows="3"
                                name="escalationReason"
                                value={formData.escalationReason}
                                onChange={handleInputChange}
                                disabled={isDataExists}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='Arbitrator-Appointment-Bottom-btn'>
                <CancelButton />
                <SaveButton
    label={isDataExists ? "Next" : "Save & Next"}
    onClick={handleSubmit}
/>
            </div>
        </div>
    );
};

export default ArbitratorAppointment;
