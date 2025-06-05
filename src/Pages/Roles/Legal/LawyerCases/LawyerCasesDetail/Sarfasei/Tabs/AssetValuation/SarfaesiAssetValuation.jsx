import React, { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import DispositionModal from '../DispositionModal';
import './SarfaesiAssetValuation.css';
import axios from 'axios';

const SarfaesiAssetValuation = ({ caseId, onStageComplete }) => {
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);
    const [formData, setFormData] = useState({
        auctionDate: '',
        auctionLocation: '',
        auctionValuation: '',
        caseId: caseId
    });
    const [dispositions, setDispositions] = useState([]);
    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    useEffect(() => {
        fetchAssetValuation();
    }, [caseId]);

    const fetchAssetValuation = async () => {
        try {
            const response = await axios.get(`/api/api/assetValuationAuctions/case/${caseId}`, {
                headers: getAuthHeaders()
            });
            const data = response.data;
            if (data && Object.keys(data).length > 0) {
                setIsDataExists(true);
                setFormData({
                    auctionDate: data.auctionDate || '',
                    auctionLocation: data.auctionLocation || '',
                    auctionValuation: data.auctionValuation || '',
                    caseId: data.caseId
                });
                setDispositions(data.dispositions || []);
            }
        } catch (error) {
            console.error('Error fetching asset valuation:', error);
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
                ...formData,
                dispositions
            };
            await axios.post('/api/api/assetValuationAuctions', payload, {
                headers: getAuthHeaders()
            });
            setIsDataExists(true);
            
            if (onStageComplete) {
                onStageComplete();
            }
        } catch (error) {
            console.error('Error saving asset valuation:', error);
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

    return(
        <div className='assetValuation-Sarfasei-container'>
            <div className='assetValuation-Sarfasei-topcontent-container'>
                <div className='assetValuation-Sarfasei-topcontent-heading'>
                    <h5>Asset Valuation & Auction</h5>
                </div>
                <div className='assetValuation-Sarfasei-topcontent'>
                    <div className='assetValuation-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-assetValuation-form-row">
                            <div className="Sarfasei-assetValuation-form-group">
                                <label>Auction Date</label>
                                <input 
                                    type="date" 
                                    name="auctionDate"
                                    value={formData.auctionDate}
                                    onChange={handleInputChange}
                                    className="assetValuation-input"
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Sarfasei-assetValuation-form-group">
                                <label>Auction Location</label>
                                <input 
                                    type='text'
                                    name="auctionLocation"
                                    value={formData.auctionLocation}
                                    onChange={handleInputChange}
                                    disabled={isDataExists}
                                />
                            </div>
                        </div>
                        <div className="Sarfasei-assetValuation-form-group">
                            <label>Auction Valuation</label>
                            <input 
                                type='number'
                                name="auctionValuation"
                                value={formData.auctionValuation}
                                onChange={handleInputChange}
                                disabled={isDataExists}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='assetValuation-Sarfasei-middle-content'>
                <div className='assetValuation-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} disabled={isDataExists} />
                </div>
                <div className='assetValuation-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositions} />
                </div>
            </div>

            <DispositionModal 
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='assetValuation-Sarfasei-Bottom-btn'>
                <CancelButton/>
                <SaveButton 
                    label={isDataExists ? 'Next' : 'Save & Next'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default SarfaesiAssetValuation;