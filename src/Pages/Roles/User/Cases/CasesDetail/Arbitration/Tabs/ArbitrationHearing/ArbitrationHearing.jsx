import React from 'react';
import './ArbitrationHearing.css';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';


const ArbitrationHearing = () => {
  

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" },
    ];

    const dispositionData = [
        {name: "initial data", label: "comment"}
    ]

    
    return (
        <div className='Arbitrator-Hearing-container'>

            <div className='Arbitrator-Hearing-topcontent-container'>
                <div className='Arbitrator-Hearing-topcontent-heading'>
                    <h5>Arbitration Hearing Scheduling</h5>
                </div>
                <div className='Arbitrator-Hearing-topcontent'>

                    <div className='Arbitrator-Hearing-topcontent-leftside'>
                        <div className="Arbitrator-Hearing-form-row">

                                <div className="Arbitrator-Hearing-form-group">
                                    <label>Hearing ID</label>
                                    <input type="text" className="notice-input" />
                                </div>
                               
                                <div className="Arbitrator-Hearing-form-group">
                                    <label>Hearing Date</label>
                                    <input type="date" className="notice-input" />
                                </div>
                                

                        </div>
                        <div className="Arbitrator-Hearing-form-group-textarea">
                                    <label>Location</label>
                                    <input type='text' rows="3"/>
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

export default ArbitrationHearing;
