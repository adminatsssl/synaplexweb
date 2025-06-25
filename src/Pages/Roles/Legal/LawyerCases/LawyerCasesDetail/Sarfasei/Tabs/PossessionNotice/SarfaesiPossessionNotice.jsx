import React, { useState, useEffect } from 'react';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionPossessionNoticeSarfaesi from './DispositionPossessionNoticeSarfaesi.jsx';
import './SarfaesiPossessionNotice.css'
import axios from 'axios';

const SarfaesiPossessionNotice = ({ caseId, onStageComplete }) => {
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);
    const [formData, setFormData] = useState({
        noticeSentDate: '',
        possessionDate: '',
        noticeType: 'Final',
        assetDetails: '',
        remarks: '',
        caseId: caseId,
        dispositions: []
    });
    const [dispositions, setDispositions] = useState([]);

    useEffect(() => {
        fetchPossessionNotice();
    }, [caseId]);
    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const fetchPossessionNotice = async () => {
        try {
            const response = await axios.get(`/api/api/possessionNotice/case/${caseId}`, {
                headers: getAuthHeaders()
            });
            const data = response.data;
            if (data && Object.keys(data).length > 0) {
                setIsDataExists(true);
                setFormData({
                    noticeSentDate: data.noticeSentDate || '',
                    possessionDate: data.possessionDate || '',
                    noticeType: data.noticeType || 'Final',
                    assetDetails: data.assetDetails || '',
                    remarks: data.remarks || '',
                    caseId: data.caseId,
                });
                setDispositions(data.dispositions || []);
            }
        } catch (error) {
            console.error('Error fetching possession notice:', error);
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
                noticeSentDate: formData.noticeSentDate ? new Date(formData.noticeSentDate).toISOString() : null,
                possessionDate: formData.possessionDate ? new Date(formData.possessionDate).toISOString() : null,
                noticeType: formData.noticeType,
                assetDetails: formData.assetDetails || null,
                remarks: formData.remarks || null,
                caseId: caseId,
                dispositions: dispositions.map(d => ({
                    name: d.name,
                    description: d.description
                }))
            };
            // console.log("Posting payload:", JSON.stringify(payload, null, 2));

            await axios.post('/api/api/possessionNotice', payload, {
                headers: getAuthHeaders()
            });
            setIsDataExists(true);

            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving possession notice:', error);
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
        <div className='possessionNotice-Sarfasei-container'>
            <div className='possessionNotice-Sarfasei-topcontent-container'>
                <div className='possessionNotice-Sarfasei-topcontent-heading'>
                    <h5>Possession Notice - Section 13(4)</h5>
                </div>
                <div className='possessionNotice-Sarfasei-topcontent'>
                    <div className='possessionNotice-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-possessionnotice-form-row">
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Notice Sent Date</label>
                                <input
                                    type="date"
                                    name="noticeSentDate"
                                    value={formData.noticeSentDate}
                                    onChange={handleInputChange}
                                    className="possessionnotice-input"
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Possession Date</label>
                                <input
                                    type="date"
                                    name="possessionDate"
                                    value={formData.possessionDate}
                                    onChange={handleInputChange}
                                    className="possessionnotice-input"
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Sarfasei-possessionnotice-form-group">
                                <label>Notice Type</label>
                                <select
                                    name="noticeType"
                                    value={formData.noticeType}
                                    onChange={handleInputChange}
                                    className="possessionnotice-input"
                                    disabled={isDataExists}
                                >
                                    <option value="Final">Final</option>
                                    <option value="Interim">Interim</option>
                                    <option value="Initial">Initial</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>Asset Details</label>
                            <input
                                type='text'
                                name="assetDetails"
                                value={formData.assetDetails}
                                onChange={handleInputChange}
                                disabled={isDataExists}
                            />
                        </div>
                        <div className="Sarfasei-possessionnotice-form-group">
                            <label>Remarks</label>
                            <textarea
                                className="Sarfaesi-possessionnotice-textarea"
                                rows="3"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                disabled={isDataExists}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='possessionNotice-Sarfasei-middle-content'>
                <div className='possessionNotice-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} disabled={isDataExists} />
                </div>
                <div className='possessionNotice-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositions} />
                </div>
            </div>

            <DispositionPossessionNoticeSarfaesi
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='possessionNotice-Sarfasei-Bottom-btn'>
                <CancelButton />
                <SaveButton
                    label={isDataExists ? 'Next' : 'Save & Next'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default SarfaesiPossessionNotice;