import React, { useState, useEffect } from "react";
import './ArbitrationNoticeGeneration.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"
import LawyerGDNEmail from "./LawyerGenerateDemandNoticeArbitration/LawyerGDNEmail.jsx";
import LawyerGDNSMS from "./LawyerGenerateDemandNoticeArbitration/LawyerGDNSMS.jsx";
import LawyerGDNWhatsapp from "./LawyerGenerateDemandNoticeArbitration/LawyerGDNWhatsapp.jsx";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import DispositionNoticeGenerationArbitration from './DispositionNoticeGenerationArbitration.jsx'
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx";
import axios from "axios";

// Icons
import whatsappIcon from "../../../../../../../../assets/icons/whatsapp.png";
import emailIcon from "../../../../../../../../assets/icons/email.png";
import smsIcon from "../../../../../../../../assets/icons/sms.png";
import mailboxIcon from "../../../../../../../../assets/icons/mailbox.png";

const LawyerArbitrationNoticeGeneration = ({ caseId, onStageComplete }) => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
    const [showSmsPopup, setShowSmsPopup] = useState(false);
    const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
    const [isDataExists, setIsDataExists] = useState(false);

    const [formData, setFormData] = useState({
        noticeDeadline: '',
        noticeSentDate: '',
        noticeType: 'Arbitration Notice',
        remarks: '',
        caseId: caseId,
    });

    const [dispositions, setDispositions] = useState([]);

    useEffect(() => {
        fetchArbitrationNotice();
    }, [caseId]);

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const fetchArbitrationNotice = async () => {
        try {
            const response = await axios.get(`/api/api/arbitration-notice/case/${caseId}`, {
                headers: getAuthHeaders()
            });

            const data = response.data;
            if (data && Object.keys(data).length > 0) {
                setIsDataExists(true);
                setFormData({
                    noticeDeadline: data.noticeDeadline || '',
                    noticeSentDate: data.noticeSentDate || '',
                    noticeType: data.noticeType || 'Arbitration Notice',
                    remarks: data.remarks || '',
                    caseId: data.caseId
                });
                setDispositions(data.dispositions || []);
            }
        } catch (error) {
            console.error("Error fetching arbitration notice:", error);
        }
    };

    const handleInputChange = (e) => {
        if (isDataExists) return;
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDisposition = (dispositionData) => {
        if (isDataExists) return;
        setDispositions(prev => [...prev, dispositionData]);
        closeDispositionModal();
    };

    const handleSubmit = async () => {
        if (isDataExists) {
            if (onStageComplete) onStageComplete();
            return;
        }

        try {
            const payload = {
                noticeDeadline: formData.noticeDeadline ? new Date(formData.noticeDeadline).toISOString() : null,
                noticeSentDate: formData.noticeSentDate ? new Date(formData.noticeSentDate).toISOString() : null,
                noticeType: formData.noticeType,
                remarks: formData.remarks || null,
                caseId: caseId,
                dispositions: dispositions.map(d => ({
                    name: d.name,
                    description: d.description
                }))
            };

            await axios.post('/api/api/arbitration-notice', payload, {
                headers: getAuthHeaders()
            });
            setIsDataExists(true);

            if (onStageComplete) onStageComplete();
        } catch (error) {
            console.error("Error saving arbitration notice:", error);
        }
    };

    const openDispositionModal = () => {
        if (!isDataExists) setIsDispositionModalOpen(true);
    };
    const closeDispositionModal = () => setIsDispositionModalOpen(false);

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" }
    ];

    return (
        <div className='Arbitration-demandNotice-container'>
            <div className='Arbitration-demandNotice-topcontent-container'>
                <div className='Arbitration-demandNotice-topcontent-heading'>
                    <h5>Notice Generation</h5>
                </div>
                <div className='Arbitration-demandNotice-topcontent'>
                    <div className='Arbitration-demandNotice-topcontent-leftside'>
                        <div className="Arbitration-demandNotice-form-row">
                            <div className="Arbitration-demandNotice-form-group">
                                <label>Notice Deadline</label>
                                <input
                                    type="date"
                                    name="noticeDeadline"
                                    value={formData.noticeDeadline}
                                    onChange={handleInputChange}
                                    className="notice-input"
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Arbitration-demandNotice-form-group">
                                <label>Notice Sent Date</label>
                                <input
                                    type="date"
                                    name="noticeSentDate"
                                    value={formData.noticeSentDate}
                                    onChange={handleInputChange}
                                    className="notice-input"
                                    disabled={isDataExists}
                                />
                            </div>
                            <div className="Arbitration-demandNotice-form-group-select">
                                <label>Notice Type</label>
                                <select
                                    name="noticeType"
                                    value={formData.noticeType}
                                    onChange={handleInputChange}
                                    className="notice-input"
                                    disabled={isDataExists}
                                >
                                    <option value="Arbitration Notice">Arbitration Notice</option>
                                    <option value="Receiver Appointed">Appointing a receiver</option>
                                    <option value="Asset Possession">Taking possession of assets</option>
                                </select>
                            </div>
                        </div>
                        <div className="Arbitration-demandNotice-form-group-textarea">
                            <label>Remarks</label>
                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                className="Arbitration-demandNotice-textarea"
                                rows="3"
                                disabled={isDataExists}
                            />
                        </div>
                    </div>

                    <div className='Arbitration-demandNotice-topcontent-rightside'>
                        <h4>View Generated Notice</h4>
                        <div className="demandNotice-Sarfasei-topcontent-rightside-icon">
                            <div className="demandNotice-Sarfasei-icon">
                                <img src={emailIcon} alt="Email" className="custom-icon" onClick={() => setIsEmailModalOpen(true)} />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon" onClick={() => setIsWhatsappModalOpen(true)} />
                            </div>
                            <div className="demandNotice-Sarfasei-icon">
                                <img src={smsIcon} alt="SMS" className="custom-icon" onClick={() => setShowSmsPopup(true)} />
                                <img src={mailboxIcon} alt="Mail" className="custom-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='arbitration-demandNotice-middle-content'>
                <div className='arbitration-demandNotice-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={openDispositionModal} disabled={isDataExists} />
                </div>
                <div className='arbitration-demandNotice-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositions} />
                </div>
            </div>

            <DispositionNoticeGenerationArbitration
                isOpen={isDispositionModalOpen}
                onClose={closeDispositionModal}
                onSave={handleSaveDisposition}
            />

            <div className='Arbitration-demandNotice-Bottom-btn'>
                <CancelButton />
                <SaveButton
                    label={isDataExists ? 'Next' : 'Save & Next'}
                    onClick={handleSubmit}
                />
            </div>

            <LawyerGDNEmail open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
            <LawyerGDNWhatsapp open={isWhatsappModalOpen} onClose={() => setIsWhatsappModalOpen(false)} />
            {showSmsPopup && <LawyerGDNSMS onClose={() => setShowSmsPopup(false)} />}
        </div>
    );
};

export default LawyerArbitrationNoticeGeneration;
