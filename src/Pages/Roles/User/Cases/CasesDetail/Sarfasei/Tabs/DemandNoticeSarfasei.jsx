import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../ReusableComponents/ReusableGrid.jsx";
import './DemandNoticeSarfaesi.css';

import whatsappIcon from '../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../assets/icons/mailbox.png';
import GDNEmail from './GenerateDemandNoticeButtons/GDNEmail.jsx'
import GDNWhatsapp from './GenerateDemandNoticeButtons/GDNWhatsapp.jsx';
import GDNSMS from './GenerateDemandNoticeButtons/GDNSMS.jsx';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const DemandNoticeSarfasei = () => {
    const { id: caseId } = useParams(); // this is caseId from URL
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
    const [showSmsPopup, setShowSmsPopup] = useState(false);
    const [noticeData, setNoticeData] = useState({
        noticeDeadline: '',
        noticeSentDate: '',
        noticeType: '',
        remarks: '',
        dispositions: []
    });

    useEffect(() => {
        if (caseId) {
            fetchNoticeData();
        }
    }, [caseId]);

    const fetchNoticeData = async () => {
    try {
        const response = await axios.get(`/api/api/demandNotice/case/${caseId}`, {
            headers: getAuthHeaders()
        });
        const data = response.data;

        // if (data.caseId?.toString() !== caseId.toString()) {
        //     console.warn("Mismatched caseId in response!");
        //     return;
        // }

        // Map dispositions to expected format
        const mappedDispositions = (data.dispositions || []).map(d => ({
            stage: d.name,
            comment: d.description
        }));

        setNoticeData({
            noticeDeadline: data.noticeDeadline || '',
            noticeSentDate: data.noticeSentDate || '',
            noticeType: data.noticeType || '',
            remarks: data.remarks || '',
            dispositions: mappedDispositions
        });
    } catch (error) {
        console.error('Error fetching demand notice data:', error);
    }
};
    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];

    const documentData = [
        { name: "Aadhar", createdDate: "Hello world", uploadedBy: "Hello world" },
    ];

    const documentColumns = [
        { key: "name", label: "Document Name" },
        { key: "createdDate", label: "Created Date" },
        { key: "uploadedBy", label: "Uploaded By" },
    ];

    return (
        <div className='demandNotice-Sarfasei-container'>
            <div className='demandNotice-Sarfasei-topcontent-container'>
                <div className='demandNotice-Sarfasei-topcontent-heading'>
                    <h5>Demand Notice Generation - Section 13(2)</h5>
                </div>
                <div className='demandNotice-Sarfasei-topcontent'>
                    <div className='demandNotice-Sarfasei-topcontent-leftside'>
                        <div className="Sarfasei-notice-form-row">
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Deadline</label>
                                <input
                                    type="date"
                                    className="notice-input"
                                    value={noticeData.noticeDeadline}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Sent Date</label>
                                <input
                                    type="date"
                                    className="notice-input"
                                    value={noticeData.noticeSentDate}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <div className="Sarfasei-notice-form-group">
                                <label>Notice Type</label>
                                <input
                                    type="text"
                                    className="notice-input"
                                    name="noticeType"
                                    value={noticeData.noticeType}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="Sarfasei-notice-form-group">
                            <label>Remarks</label>
                            <textarea
                                className="Sarfasei-notice-textarea"
                                rows="3"
                                value={noticeData.remarks}
                                readOnly
                                disabled
                            ></textarea>
                        </div>
                    </div>

                    <div className='demandNotice-Sarfasei-topcontent-rightside'>
                        <h4>View Generated Notice</h4>
                        <div className='demandNotice-Sarfasei-topcontent-rightside-icon'>
                            <div className='demandNotice-Sarfasei-icon'>
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" onClick={() => setIsEmailModalOpen(true)} style={{ cursor: 'pointer' }} />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" onClick={() => setIsWhatsappModalOpen(true)} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='demandNotice-Sarfasei-icon'>
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" onClick={() => setShowSmsPopup(true)} style={{ cursor: 'pointer' }} />
                                <img src={mailboxIcon} alt="Physical Mail" className="custom-icon physical-mail-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='demandNotice-Sarfasei-middle-content'>
                <div className='demandNotice-Sarfasei-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='demandNotice-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={noticeData.dispositions} />
                </div>
            </div>

            <div className='demandNotice-Sarfasei-Bottom-content'>
                <div className='demandNotice-Sarfasei-Bottom-content-heading'>
                    <h5>Uploaded Documents</h5>
                </div>
                <div className='demandNotice-Sarfasei-Bottom-content-formdata'>
                    <ReusableGrid columns={documentColumns} data={documentData} />
                </div>
            </div>


            <GDNEmail open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
            <GDNWhatsapp open={isWhatsappModalOpen} onClose={() => setIsWhatsappModalOpen(false)} />
                {showSmsPopup && <GDNSMS onClose={() => setShowSmsPopup(false)} />}

        </div>
        
    );
};

export default DemandNoticeSarfasei;
