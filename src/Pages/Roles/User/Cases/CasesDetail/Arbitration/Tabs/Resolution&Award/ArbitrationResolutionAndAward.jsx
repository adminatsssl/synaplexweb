import React from 'react';
import './ArbitrationResolutionAndAward.css';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';



const ArbitrationResolutionAndAward = () => {
  



     const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" },
    ];

    const dispositionData = [
        {name: "initial data", label: "comment"}
    ]


    return (
        <div className='Arbitrator-Resolutin-Award-container'>

            <div className='Arbitrator-Resolutin-Award-topcontent-container'>
                <div className='Arbitrator-Resolutin-Award-topcontent-heading'>
                    <h5>Resolution & Award</h5>
                </div>
                <div className='Arbitrator-Resolutin-Award-topcontent'>

                    <div className='Arbitrator-Resolutin-Award-topcontent-leftside'>
                        <div className="Arbitrator-Resolutin-Award-form-row">

                                <div className="Arbitrator-Resolutin-Award-form-group">
                                    <label>Decesion Date</label>
                                    <input type="text" className="notice-input" />
                                </div>
                                <div className="Arbitrator-Resolutin-Award-form-group">
                                    <label>Award Status</label>
                                    <select className="notice-input">
                                        <option value="Draft">Draft</option>
                                        <option value="Finalized">Finalized</option>
                                        <option value="Shared">Shared</option>
                                    </select>
                                </div>
                                <div className="Arbitrator-Resolutin-Award-form-group-select">
                                    <label>Award Document</label>
                                    <input type="text" className="notice-input" />
                                </div>
                                

                        </div>
                        <div className="Arbitrator-Resolutin-Award-form-group-textarea">
                                    <label>Arbitration Decision</label>
                                    <textarea className="Arbitrator-Resolutin-Award-textarea" rows="3"></textarea>
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

        </div>
    );
};

export default ArbitrationResolutionAndAward;
