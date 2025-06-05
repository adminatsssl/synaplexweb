import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../ReusableComponents/ReusableGrid.jsx";
import './DemandNoticeSarfaesi.css';
import SaveButton from "../../../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../../../ReusableComponents/CancelButton.jsx";

import whatsappIcon from '../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../assets/icons/mailbox.png';

const DemandNoticeSarfasei = () => {
    const { id: caseId } = useParams(); // this is caseId from URL
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
            const response = await axios.get(`/api/api/demandNotice/case/${caseId}`);
            const data = response.data;

            // Ensure response's caseId matches route caseId
            if (data.caseId?.toString() !== caseId.toString()) {
                console.warn("Mismatched caseId in response!");
                return;
            }

            setNoticeData({
                noticeDeadline: data.noticeDeadline || '',
                noticeSentDate: data.noticeSentDate || '',
                noticeType: data.noticeType || '',
                remarks: data.remarks || '',
                dispositions: data.dispositions || []
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
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" />
                            </div>
                            <div className='demandNotice-Sarfasei-icon'>
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" />
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

            {/* <div className='demandNotice-Sarfasei-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />
            </div> */}
        </div>
    );
};

export default DemandNoticeSarfasei;
