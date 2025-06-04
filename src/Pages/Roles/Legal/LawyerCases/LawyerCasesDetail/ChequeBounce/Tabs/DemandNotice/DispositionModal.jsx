import React, { useState } from 'react';
import './DispositionModal.css';

const DispositionModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({ name: '', description: '' });
    };

    return (
        <div className="disposition-modal-overlay">
            <div className="disposition-modal">
                <div className="disposition-modal-header">
                    <h5>Lawyer Disposition</h5>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="disposition-modal-content">
                    <div className="disposition-form-group">
                        <label>Disposition Stage</label>
                        <select 
                            className="disposition-input"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Disposition Stage</option>
                            <option value="stage1">Stage 1</option>
                            <option value="stage2">Stage 2</option>
                            <option value="stage3">Stage 3</option>
                        </select>
                    </div>

                    <div className="disposition-form-group">
                        <label>Comment</label>
                        <textarea 
                            className="disposition-textarea"
                            rows="4"
                            placeholder="Enter your comment"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="disposition-modal-buttons">
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                        <button 
                            className="save-button" 
                            onClick={handleSave}
                            disabled={!formData.name || !formData.description}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispositionModal;