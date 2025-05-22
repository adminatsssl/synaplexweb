import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; // Adjust path as needed
import './ChequeBounceDemandNotice.css';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx"


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
                                <GiMailbox />
                                <FaSms />
                            </div>
                            <div className='chequeBounce-demandNotice-icon'>
                                <IoMdMail />
                                <IoLogoWhatsapp />
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
