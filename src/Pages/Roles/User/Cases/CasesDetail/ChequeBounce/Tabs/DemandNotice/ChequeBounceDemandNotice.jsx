import React from 'react';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceDemandNotice.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"

// Import icons'
import whatsappIcon from '../../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../../assets/icons/mailbox.png';


const ChequeBounceDemandNotice = () => {
    // Sample data for disposition summary
    const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
    ];    

    return (
        <div className='chequeBounce-demandNotice-container'>
            <div className='chequeBounce-demandNotice-topcontent-container'>
                <div className='chequeBounce-demandNotice-topcontent-heading'>
                    <h5>Demand Notice Generation - Section 13(2)</h5>
                </div>
                <div className='chequeBounce-demandNotice-topcontent'>
                    <div className='chequeBounce-demandNotice-topcontent-leftside'>
                        <div className="chequeBounce-demandNotice-form-row">
                            <div className="chequeBounce-demandNotice-form-row-content">
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Deadline</label>
                                    <input type="date" className="notice-input" />
                                </div>
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Sent Date</label>
                                    <input type="date" className="notice-input" />
                                </div>
                            </div>

                            <div className="chequeBounce-demandNotice-form-row-content">
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Notice Type</label>
                                    <select className="notice-input">
                                        <option value="business">Taking control of existing business</option>
                                        <option value="receiver">Appointing a receiver to manage assets</option>
                                        <option value="possession">Taking possession of assets</option>
                                    </select>
                                </div>
                                <div className="chequeBounce-demandNotice-form-group">
                                    <label>Comment</label>
                                    <textarea className="chequeBounce-demandNotice-textarea" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='chequeBounce-demandNotice-topcontent-rightside'>
                        <h4>View Generated Notice</h4>
                        <div className='chequeBounce-demandNotice-topcontent-rightside-icon'>
                            <div className='chequeBounce-demandNotice-icon'>
                                <img src={emailIcon} alt="Email" className="custom-icon email-icon" />
                                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" />
                            </div>
                            <div className='chequeBounce-demandNotice-icon'>
                                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" />
                                <img src={mailboxIcon} alt="Physical Mail" className="custom-icon physical-mail-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chequeBounce-demandNotice-middle-content'>
                <div className='chequeBounce-demandNotice-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                </div>
                <div className='chequeBounce-demandNotice-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='chequeBounce-demandNotice-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />
            </div>
        </div>
    );
};

export default ChequeBounceDemandNotice;
