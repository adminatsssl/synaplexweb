import React, { useState, useEffect } from "react";
import './ArbitrationNoticeGeneration.css';
import GDNEmail from "./LawyerGenerateDemandNoticeArbitration/GDNEmail.jsx";
import GDNSMS from "./LawyerGenerateDemandNoticeArbitration/GDNSMS.jsx";
import GDNWhatsapp from "./LawyerGenerateDemandNoticeArbitration/GDNWhatsapp.jsx";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";

//icons
import whatsappIcon from "../../../../../../../../assets/icons/whatsapp.png";
import emailIcon from "../../../../../../../../assets/icons/email.png";
import smsIcon from "../../../../../../../../assets/icons/sms.png";
import mailboxIcon from "../../../../../../../../assets/icons/mailbox.png";


const ArbitrationNoticeGeneration = () => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
    const [showSmsPopup, setShowSmsPopup] = useState(false);

    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });



    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" },
    ];

    const dispositionData = [
        {name: "initial data", label: "comment"}
    ]



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
                                <label>Notice Deadeline</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="Arbitration-demandNotice-form-group">
                                <label>Notice Sent Date</label>
                                <input type="date" className="notice-input" />
                            </div>
                            <div className="Arbitration-demandNotice-form-group-select">
                                <label>Notice Type</label>
                                <select className="notice-input">
                                    <option value="business">Taking control of existing business</option>
                                    <option value="receiver">Appointing a receiver to manage assets</option>
                                    <option value="possession">Taking possession of assets</option>
                                </select>
                            </div>

                        </div>
                        <div className="Arbitration-demandNotice-form-group-textarea">
                            <label>Remarks</label>
                            <textarea className="Arbitration-demandNotice-textarea" rows="3"></textarea>
                        </div>

                    </div>

                    <div className='Arbitration-demandNotice-topcontent-rightside'>

                        <h4>View Generated Notice</h4>

                        <div className="demandNotice-Sarfasei-topcontent-rightside-icon">
                            <div className="demandNotice-Sarfasei-icon">
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" onClick={() => setIsEmailModalOpen(true)} style={{ cursor: 'pointer' }} />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" onClick={() => setIsWhatsappModalOpen(true)} style={{ cursor: 'pointer' }} />

                            </div>
                            <div className="demandNotice-Sarfasei-icon">
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" onClick={() => setShowSmsPopup(true)} style={{ cursor: 'pointer' }} />
                                <img
                                    src={mailboxIcon}
                                    alt="Physical Mail"
                                    className="custom-icon physical-mail-icon"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className='arbitration-demandNotice-middle-content'>
                <div className='arbitration-demandNotice-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='arbitration-demandNotice-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>


            <GDNEmail open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
            <GDNWhatsapp open={isWhatsappModalOpen} onClose={() => setIsWhatsappModalOpen(false)} />
            {showSmsPopup && <GDNSMS onClose={() => setShowSmsPopup(false)} />}


        </div>
    );
};

export default ArbitrationNoticeGeneration;
