import React, { useState } from 'react';
import './AssignCase.css';

const AssignCase = ({ onClose }) => {
    const [assignType, setAssignType] = useState('Lawyer');

    return (
        <div className="assign-case-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Assign Case</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="assignee-section">
                        <h3>Choose Assignee</h3>
                        <div className="radio-group">
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    id="lawyer"
                                    name="assignType"
                                    value="Lawyer"
                                    checked={assignType === 'Lawyer'}
                                    onChange={(e) => setAssignType(e.target.value)}
                                />
                                <label htmlFor="lawyer">Lawyer</label>
                            </div>
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    id="lawFirm"
                                    name="assignType"
                                    value="Law Firm"
                                    checked={assignType === 'Law Firm'}
                                    onChange={(e) => setAssignType(e.target.value)}
                                />
                                <label htmlFor="lawFirm">Law Firm</label>
                            </div>
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    id="group"
                                    name="assignType"
                                    value="Group"
                                    checked={assignType === 'Group'}
                                    onChange={(e) => setAssignType(e.target.value)}
                                />
                                <label htmlFor="group">Group</label>
                            </div>
                        </div>
                    </div>

                    <div className="assign-section">
                        <label>Assign To {assignType}</label>
                        <select defaultValue="">
                            <option value="" disabled>Select {assignType}</option>
                            <option value="1">John Doe</option>
                            <option value="2">Jane Smith</option>
                            <option value="3">Legal Associates</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="save-btn">
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignCase; 