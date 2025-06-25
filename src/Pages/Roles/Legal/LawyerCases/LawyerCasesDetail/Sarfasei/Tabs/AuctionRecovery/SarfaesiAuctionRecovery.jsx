import React, { useState, useEffect } from 'react';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionAuctionRecoverySarfaesi from './DispositionAuctionRecoverySarfaesi.jsx';
import './SarfaesiAuctionRecovery.css'
import axios from 'axios';

const SarfaesiAuctionRecovery = ({ caseId, onStageComplete }) => {
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);
    const [formData, setFormData] = useState({
        recoveryAmount: '',
        recoveryDate: '',
        recoveryStatus: 'Pending',
        recoveryMode: 'Direct transfer',
        remark: '',
        caseId: caseId,
        dispositions: []
    });
    const [dispositions, setDispositions] = useState([]);
    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    useEffect(() => {
        fetchAuctionRecovery();
    }, [caseId]);

    const fetchAuctionRecovery = async () => {
        try {
            const response = await axios.get(`/api/api/auctionRecovery/case/${caseId}`, {
                headers: getAuthHeaders()
            });
            const data = response.data;
            if (data && Object.keys(data).length > 0) {
                setIsDataExists(true);
                setFormData({
                    recoveryAmount: data.recoveryAmount || '',
                    recoveryDate: data.recoveryDate || '',
                    recoveryStatus: data.recoveryStatus || 'Pending',
                    recoveryMode: data.recoveryMode || 'Direct transfer',
                    remark: data.remark || '',
                    caseId: data.caseId
                });
                setDispositions(data.dispositions || []);
            }
        } catch (error) {
            console.error('Error fetching auction recovery:', error);
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
                recoveryAmount: formData.recoveryAmount,
                recoveryDate: formData.recoveryDate ,
                recoveryStatus: formData.recoveryStatus,
                recoveryMode: formData.recoveryMode,
                remark: formData.remark,
                caseId: caseId,
                dispositions: dispositions.map(d => ({
                    name: d.name,
                    description: d.description
                }))
            };


            await axios.post('/api/api/auctionRecovery', payload, {
                headers: getAuthHeaders()
            });
            setIsDataExists(true);

            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving auction recovery:', error);
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
        <div className="sarfaesi-auctionRecovery-container">
            <div className='sarfaesi-auctionRecovery-top-container'>
                <div className='sarfaesi-auctionRecovery-top-container-heading'>
                    <h5 className="sarfaesi-auctionRecovery-title">Auction and Recovery</h5>
                </div>

                <div className="sarfaesi-auctionRecovery-box">
                    <div className='sarfaesi-auctionRecovery-topcontent-box'>
                        <div className='sarfaesi-auctionRecovery-input-container'>
                            <div className='sarfaesi-auctionRecovery-input'>
                                <label>Recovery Amount</label>
                                <input
                                    type='number'
                                    name="recoveryAmount"
                                    value={formData.recoveryAmount}
                                    onChange={handleInputChange}
                                    placeholder='0.00'
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className='sarfaesi-auctionRecovery-input'>
                                <label>Recovery Date</label>
                                <input
                                    type='date'
                                    name="recoveryDate"
                                    value={formData.recoveryDate}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                />
                            </div>
                        </div>
                        <div className="sarfaesi-auctionRecovery-input-container">
                            <div className='sarfaesi-auctionRecovery-input'>
                                <label>Recovery Status</label>
                                <select
                                    name="recoveryStatus"
                                    value={formData.recoveryStatus}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Recovered">Recovered</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                            <div className='sarfaesi-auctionRecovery-input'>
                                <label>Recovery Mode</label>
                                <select
                                    name="recoveryMode"
                                    value={formData.recoveryMode}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                >
                                    <option value="Direct transfer">Direct transfer</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Adjusted Against Loan">Adjusted Against Loan</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>Remark</label>
                            <textarea
                                name="remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                                disabled={isDataExists}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className='sarfaesi-auctionRecovery-middle-content'>
                <div className='sarfaesi-auctionRecovery-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} disabled={isDataExists} />
                </div>
                <div className='sarfaesi-auctionRecovery-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositions} />
                </div>
            </div>

            <DispositionAuctionRecoverySarfaesi
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='sarfaesi-auctionRecovery-Bottom-btn'>
                <CancelButton />
                <SaveButton
                    label={isDataExists ? 'Next' : 'Save & Next'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export default SarfaesiAuctionRecovery;