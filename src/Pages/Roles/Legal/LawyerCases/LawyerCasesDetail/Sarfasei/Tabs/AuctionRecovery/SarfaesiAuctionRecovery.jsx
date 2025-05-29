import React from 'react';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import AddButton from "../../../../../../../ReusableComponents/AddButton.jsx"
import './SarfaesiAuctionRecovery.css'



const SarfaesiAuctionRecovery = () => {

    const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
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
                                <input type='text' placeholder='0.00' />
                            </div>
                            <div className='sarfaesi-auctionRecovery-input'>
                                <label>Recovery Date</label>
                                <input type='date' placeholder='mm/dd/yyyy' />
                            </div>

                        </div>
                        <div className="sarfaesi-auctionRecovery-input-container">
                                <div className='sarfaesi-auctionRecovery-input'>
                                    <label>Recovery Status</label>
                                    <select>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </div>

                                <div className='sarfaesi-auctionRecovery-input'>
                                    <label>Recovery Mode</label>
                                    <select>
                                        <option value="Pending">Direct transfer</option>
                                        <option value="Completed">Adjusted Against Loan</option>
                                        <option value="Failed">Others</option>
                                    </select>
                                </div>


                        </div>
                        <div>
                            <label>Remark</label>
                            <textarea></textarea>
                        </div>
                    </div>

                </div>
            </div>


            <div className='sarfaesi-auctionRecovery-middle-content'>
                <div className='sarfaesi-auctionRecovery-middle-content-heading'>
                    <h5>Disposition Summary</h5>
                    <AddButton text="Add " onClick={""} />
                </div>
                <div className='sarfaesi-auctionRecovery-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>

            <div className='sarfaesi-auctionRecovery-Bottom-btn'>
                <CancelButton />
                <SaveButton label='Save & Next' />

            </div>
        </div>
    )
}

export default SarfaesiAuctionRecovery;