import React, { useState } from 'react';
import './AssignCase.css';

const AssignCase = ({ onClose }) => {
    const [assignType, setAssignType] = useState('Lawyer');

    return (
        <div className="assign-case-container">
            <div className="assign-case-header">
                <h2>Assign Case</h2>
            </div>
            <div className="assign-case-content">
                <div className="assign-case-form">
                    <div className="assign-type-selection">
                        <h3>Choose Assignee</h3>
                        <div className="radio-group">
                            <div className="radio-option">
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
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="lawfirm"
                                    name="assignType"
                                    value="Law Firm"
                                    checked={assignType === 'Law Firm'}
                                    onChange={(e) => setAssignType(e.target.value)}
                                />
                                <label htmlFor="lawfirm">Law Firm</label>
                            </div>
                            <div className="radio-option">
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
                    <div className="assign-to-section">
                        <label>Assign To Lawyer</label>
                        <select defaultValue="">
                            <option value="" disabled>Select Lawyer</option>
                            <option value="1">John Doe</option>
                            <option value="2">Jane Smith</option>
                            <option value="3">Legal Associates</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="assign-case-actions">
                <button className="cancel-button">
                    CANCEL
                </button>
                <button className="save-button">
                    SAVE
                </button>
            </div>
        </div>
    );
};

export default AssignCase; 