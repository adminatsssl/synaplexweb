import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import './ArbitrationNoticeGeneration.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


const ArbitrationNoticeGeneration = () => {
  

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
                        {/* <div className='Arbitration-generateNotice-btn'>
                            <button>Generate Notice</button>
                        </div> */}
                        <h4>View Generated Notice</h4>
                        <div className='Arbitration-demandNotice-topcontent-rightside-icon'>
                            <div className='Arbitration-demandNotice-icon'>
                                <GiMailbox />
                                <FaSms />
                            </div>
                            <div className='Arbitration-demandNotice-icon'>
                                <IoMdMail />
                                <IoLogoWhatsapp />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='Arbitration-demandNotice-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />

            </div>

        </div>
    );
};

export default ArbitrationNoticeGeneration;
