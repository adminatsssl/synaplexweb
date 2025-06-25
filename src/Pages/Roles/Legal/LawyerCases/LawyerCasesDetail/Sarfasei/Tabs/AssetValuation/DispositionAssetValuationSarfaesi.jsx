import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../DispositionModal.css';

const DispositionAssetValuationSarfaesi = ({ isOpen, onClose, onSave }) => {
    const [dispositionStages, setDispositionStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState('');
    const [comment, setComment] = useState('');

    const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

    useEffect(() => {
        if (isOpen) {
            fetchDispositionStages();
        }
    }, [isOpen]);

    const fetchDispositionStages = async () => {
        try {
            const response = await axios.get('/api/api/dispositions',{
                headers: getAuthHeaders(),
            });
            console.log("Fetched Data:", response.data);
            if (Array.isArray(response.data.data)) {
                setDispositionStages(response.data.data);
            } else {
                console.warn('Unexpected data structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching stages:', error);
        }
    };

   const handleSave = () => {
  const selected = dispositionStages.find(stage => stage.name === selectedStage);
  if (selected) {
    onSave({
      id: selected.id,
      name: selected.name,
      description: comment,
    });
  }
};

    if (!isOpen) return null;

    return (
        <div className="disposition-modal-overlay">
            <div className="disposition-modal">
                <div className="disposition-modal-header">
                    <h5>Lawyer Disposition</h5>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>

                <div className="disposition-modal-content">
                    <div className="disposition-form-group">
                        <label>Disposition Stage</label>
                        <select
                            className="disposition-input"
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                        >
                            <option value="">Select Disposition Stage</option>
                            {dispositionStages.map((stage) => (
                                <option key={stage.id} value={stage.name}>
                                    {stage.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="disposition-form-group">
                        <label>Comment</label>
                        <textarea
                            className="disposition-textarea"
                            rows="4"
                            placeholder="Enter your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="disposition-modal-buttons">
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                        <button className="save-button" onClick={handleSave}>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispositionAssetValuationSarfaesi;