import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import './DemandNoticeSarfasei.css';

const DemandNoticeSarfasei = () => {
    return (
        <div className='demandNotice-Sarfasei-container'>

            <div className='demandNotice-Sarfasei-topcontent-container'>
            <div><h5>Demand Notice Generation - Section 13(2)</h5></div>
                <div className='demandNotice-Sarfasei-topcontent'>
                {/* Topcontent   -  Leftside*/}
                <div className='demandNotice-Sarfasei-topcontent-leftside'>
                    <div className="Sarfasei-notice-form-row">
                        <div className="Sarfasei-notice-form-group">
                            <label>Notice Deadline</label>
                            <input type="date" className="notice-input" />
                        </div>
                        <div className="Sarfasei-notice-form-group">
                            <label>Notice Sent Date</label>
                            <input type="date" className="notice-input" />
                        </div>
                        <div className="Sarfasei-notice-form-group">
                            <label>Notice Type</label>
                            <select className="notice-input">
                                <option value="business">Taking control of existing business</option>
                                <option value="receiver">Appointing a receiver to manage assets</option>
                                <option value="possession">Taking possession of assets</option>
                            </select>
                        </div>
                    </div>
                    <div className="Sarfasei-notice-form-group">
                        <label>Remarks</label>
                        <textarea className="Sarfasei-notice-textarea" rows="3"></textarea>
                    </div>

                </div>

                {/* Topcontent   -  Right side*/}
                <div className='demandNotice-Sarfasei-topcontent-rightside'>
                    <h4>View Generated Notice</h4>
                    <div>
                        <div>
                            <GiMailbox />
                            <FaSms />
                        </div>
                        <div>
                            <IoMdMail />
                            <IoLogoWhatsapp />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Middle Content   */}
            <div className='demandNotice-Sarfasei-middle-content'>
                <h4>Disposition Summary</h4>
                <table>
                    <tr>
                        <th>Disposition Stage</th>
                        <th>Comment</th>
                    </tr>
                    <tr>
                        <td>Stage 1</td>
                        <td>Hello world</td>
                    </tr>
                </table>

            </div>

            {/* Bottom Content   */}
            <div className='demandNotice-Sarfasei-Bottom-content'>
            <h4>Uploaded Documents</h4>
                <table>
                    <tr>
                        <th>Document Name</th>
                        <th>Created Date</th>
                        <th>Uploaded By</th>
                    </tr>
                    <tr>
                        <td>Aadhar</td>
                        <td>Hello world</td>
                        <td>Hello world</td>
                    </tr>
                </table>

            </div>

        </div>
    );
};


export default DemandNoticeSarfasei;