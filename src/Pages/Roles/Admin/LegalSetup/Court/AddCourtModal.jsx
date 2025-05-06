import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourtSetup.css';
import SaveButton from "../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../ReusableComponents/CancelButton";

export default function AddCourtModal({ onClose, onSave, initialData = null }) {
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        Email: '',
        AddressLine: '',
        City: '',
        State: '',
        PinCode: '',
        CourtType: '',
        Jurisdiction: '',
        CourtCode: ''
    });

    useEffect(() => {
        if (initialData) {
            const addressParts = initialData.Address?.split(',') || [];
            setFormData({
                Name: initialData.Name,
                Phone: initialData.Phone,
                Email: initialData.Email,
                AddressLine: addressParts[0]?.trim() || '',
                City: addressParts[1]?.trim() || '',
                State: addressParts[2]?.split('-')[0]?.trim() || '',
                PinCode: addressParts[2]?.split('-')[1]?.trim() || '',
                CourtType: initialData.CourtType,
                Jurisdiction: initialData.Jurisdiction,
                CourtCode: initialData.CourtCode
            });
        }
    }, [initialData]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            Name: formData.Name,
            Phone: formData.Phone,
            Email: formData.Email,
            Address: `${formData.AddressLine}, ${formData.City}, ${formData.State} - ${formData.PinCode}`,
            CourtType: formData.CourtType,
            Jurisdiction: formData.Jurisdiction,
            CourtCode: formData.CourtCode
        };
        const payloadUpdate = {
            Name: formData.Name,
            Phone: formData.Phone,
            Email: formData.Email,
            Address: `${formData.AddressLine}, ${formData.City}, ${formData.State} - ${formData.PinCode}`,
            CourtType: formData.CourtType,
            Jurisdiction: formData.Jurisdiction,
            // CourtCode: formData.CourtCode
        };

        try {
            let response;
            if (initialData) {
                console.log("PATCHing to", `/court/Courts('${formData.CourtCode}')`);
                console.log("Payload:", payload);

                response = await axios.patch(`/court/Courts('${formData.CourtCode}')`, payloadUpdate);
            } else {
                response = await axios.post("/court/Courts", payload);
            }

            if (response.status === 200 || response.status === 201) {
                onSave();
            } else {
                alert('Failed to save court data.');
            }
        } catch (error) {
            alert(`Error: ${error.response?.data || error.message}`);
        }
    };


    return (
        <div className="legalsetup-court-modal-overlay">
            <div className="legalsetup-court-modal">
                <h2 className="legalsetup-court-modal-title">Court</h2>

                <div className='legalsetup-court-middlecontent'>
                <form onSubmit={handleSubmit}>
                    <div className="legalsetup-court-section">
                    <h3 className="legalsetup-court-section-title">Court Details</h3> 
                        <div className="legalsetup-court-grid-2">
                       
                            <div className="legalsetup-court-form-item">
                                <label>Court Name</label>
                                <input name="Name" value={formData.Name} onChange={handleChange} required />
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>Court Type</label>
                                <select name="CourtType" value={formData.CourtType} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="District_Court">District Court</option>
                                    <option value="High_Court">High Court</option>
                                    <option value="Supreme_Court">Supreme Court</option>
                                </select>
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>Jurisdiction</label>
                                <input name="Jurisdiction" value={formData.Jurisdiction} onChange={handleChange} required />
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>Court Code</label>
                                <input name="CourtCode" value={formData.CourtCode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="legalsetup-court-section">
                        <h3 className="legalsetup-court-section-title">Address</h3>
                        <div className="legalsetup-court-form-item">
                            <label>Address Line</label>
                            <textarea name="AddressLine" value={formData.AddressLine} onChange={handleChange} required />
                        </div>
                        <div className="legalsetup-court-grid-3">
                            <div className="legalsetup-court-form-item">
                                <label>City</label>
                                <input name="City" value={formData.City} onChange={handleChange} required />
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>State</label>
                                <input name="State" value={formData.State} onChange={handleChange} required />
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>PinCode</label>
                                <input name="PinCode" value={formData.PinCode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="legalsetup-court-section">
                        <h3 className="legalsetup-court-section-title">Contact Detail</h3>
                        <div className="legalsetup-court-grid-2">
                            <div className="legalsetup-court-form-item">
                                <label>Phone No</label>
                                <input name="Phone" value={formData.Phone} onChange={handleChange} required />
                            </div>
                            <div className="legalsetup-court-form-item">
                                <label>Email</label>
                                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="legalsetup-court-modal-buttons">
                        {/* <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-btn">Save</button> */}
                        <CancelButton className="cancel-btn" onClick={onClose} />
                        <SaveButton className="save-btn"
                            onClick={handleSubmit}
                            label={"Save"}
                        />
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
