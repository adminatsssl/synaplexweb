import React, { useState } from 'react';
import axios from 'axios';
import './CourtSetup.css';

export default function AddCourtModal({ onClose, onSave }) {
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
            CourtType: formData.CourtType, // This should exactly match Mendix Enum
            Jurisdiction: formData.Jurisdiction,
            CourtCode: formData.CourtCode
        };

        try {
            console.log('Payload:', payload);
            const response = await axios.post("/court/Courts", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data);
            if (response.status === 200 || response.status === 201) {
                onSave();
            } else {
                alert('Failed to save court data.');
            }
        } catch (error) {
            if (error.response) {
                console.error("Backend response error:", error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Error saving court:", error);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">Court Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="section">
                        <div className="grid-2">
                            <div className="form-item">
                                <label>Court Name</label>
                                <input name="Name" value={formData.Name} onChange={handleChange} required />
                            </div>
                            <div className="form-item">
                                <label>Court Type</label>
                                <select name="CourtType" value={formData.CourtType} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="District_Court">District Court</option>
                                    <option value="High_Court">High Court</option>
                                    <option value="Supreme_Court">Supreme Court</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <label>Jurisdiction</label>
                                <input name="Jurisdiction" value={formData.Jurisdiction} onChange={handleChange} required />
                            </div>
                            <div className="form-item">
                                <label>Court Code</label>
                                <input name="CourtCode" value={formData.CourtCode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Address</h3>
                        <div className="form-item">
                            <label>Address Line</label>
                            <textarea name="AddressLine" value={formData.AddressLine} onChange={handleChange} required />
                        </div>
                        <div className="grid-3">
                            <div className="form-item">
                                <label>City</label>
                                <input name="City" value={formData.City} onChange={handleChange} required />
                            </div>
                            <div className="form-item">
                                <label>State</label>
                                <input name="State" value={formData.State} onChange={handleChange} required />
                            </div>
                            <div className="form-item">
                                <label>PinCode</label>
                                <input name="PinCode" value={formData.PinCode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Contact Detail</h3>
                        <div className="grid-2">
                            <div className="form-item">
                                <label>Phone No</label>
                                <input name="Phone" value={formData.Phone} onChange={handleChange} required />
                            </div>
                            <div className="form-item">
                                <label>Email</label>
                                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="modal-buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
