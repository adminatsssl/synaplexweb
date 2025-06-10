import React, { useState, useEffect } from 'react';
import './AssignCase.css';

const AssignCase = ({ onClose, caseId }) => {
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyer, setSelectedLawyer] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await fetch('/api/api/lawyers', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lawyers');
                }

                const data = await response.json();
                setLawyers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    const handleSave = async () => {
        if (!selectedLawyer) {
            alert('Please select a lawyer');
            return;
        }

        setAssigning(true);
        try {
            const selectedLawyerData = lawyers.find(lawyer => lawyer.id === selectedLawyer);
            
            const response = await fetch('http://localhost:8080/api/cases/assignToLawyer', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    caseId: caseId,
                    lawyerName: selectedLawyerData.name
                })
            });

            if (!response.ok) {
                throw new Error('Failed to assign case');
            }

            // Close the modal on success
            onClose();
        } catch (err) {
            setError(err.message);
            alert('Failed to assign case: ' + err.message);
        } finally {
            setAssigning(false);
        }
    };

    return (
        <div className="assign-case-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Assign Case</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="assign-section">
                        <label>Assign To Lawyer</label>
                        {loading ? (
                            <p>Loading lawyers...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            <select 
                                value={selectedLawyer}
                                onChange={(e) => setSelectedLawyer(e.target.value)}
                            >
                                <option value="" disabled>Select Lawyer</option>
                                {lawyers.map((lawyer) => (
                                    <option key={lawyer.id} value={lawyer.id}>
                                        {lawyer.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button 
                            className="save-btn"
                            onClick={handleSave}
                            disabled={!selectedLawyer || assigning}
                        >
                            {assigning ? 'Assigning...' : 'Assign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignCase; 