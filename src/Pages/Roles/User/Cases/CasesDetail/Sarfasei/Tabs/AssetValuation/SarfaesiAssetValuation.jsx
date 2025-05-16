import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx"; 
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx"
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import './SarfaesiAssetValuation.css';


const SarfaesiAssetValuation = ()=>{


     const dispositionData = [
        { stage: "Stage 1", comment: "Hello world" },
    ];

    const dispositionColumns = [
        { key: "stage", label: "Disposition Stage" },
        { key: "comment", label: "Comment" },
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
                                <input type="date" className="assetValuation-input" />
                            </div>
                            <div className="Sarfasei-assetValuation-form-group">
                                <label>Auction Location</label>
                                <input type='text'></input>
                            </div>
                        </div>
                        <div className="Sarfasei-assetValuation-form-group">
                            <label>Auction Valuation</label>
                            <input type='text' />
                        </div>
                    </div>

                    <div className='assetValuation-Sarfasei-topcontent-rightside'>
                        <button className='assetValuation-generatenotice-btn'>Generate Notice</button>
                        <h4>View Generated Notice</h4>
                        <div className='assetValuation-Sarfasei-topcontent-rightside-icon'>
                            <div className='assetValuation-Sarfasei-icon'>
                                <GiMailbox />
                                <FaSms />
                            </div>
                            <div className='assetValuation-Sarfasei-icon'>
                                <IoMdMail />
                                <IoLogoWhatsapp />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='assetValuation-Sarfasei-middle-content'>
                <div className='assetValuation-Sarfasei-middle-content-heading'>
                    <h5 >Disposition Summary</h5>
                </div>
                <div className='assetValuation-Sarfasei-middle-content-formdata'>
                    <ReusableGrid columns={dispositionColumns} data={dispositionData} />
                </div>
            </div>


            <div className='assetValuation-Sarfasei-Bottom-btn'>
                <CancelButton/>
                <SaveButton label='Save & Next'/>

            </div>

        </div>
    );
};

export default SarfaesiAssetValuation;