import React from 'react';
import './ArbitratorAppointment.css';
import ReusableGrid from '../../../../../../../ReusableComponents/ReusableGrid';


const ArbitratorAppointment = () => {
  

    const dispositionColumns = [
        { key: "name", label: "Disposition Stage" },
        { key: "description", label: "Comment" },
    ];

    const dispositionData = [
        {name: "initial data", label: "comment"}
    ]

    return (
        <div className='Arbitrator-Appointment-container'>

            <div className='Arbitrator-Appointment-topcontent-container'>
                <div className='Arbitrator-Appointment-topcontent-heading'>
                    <h5>Arbitrator Appointement</h5>
                </div>
                <div className='Arbitrator-Appointment-topcontent'>

                    <div className='Arbitrator-Appointment-topcontent-leftside'>
                        <div className="Arbitrator-Appointment-form-row">

                                <div className="Arbitrator-Appointment-form-group">
                                    <label>Arbitration ID</label>
                                    <input type="text" className="notice-input" />
                                </div>
                                <div className="Arbitrator-Appointment-form-group">
                                    <label>Status</label>
                                    <select className="notice-input">
                                        <option value="business">Pending</option>
                                        <option value="receiver">Selected</option>
                                        <option value="possession">Escalated</option>
                                    </select>
                                </div>
                                <div className="Arbitrator-Appointment-form-group-select">
                                    <label>Arbitrator panel</label>
                                    <input type="text" className="notice-input" />
                                </div>
                                

                        </div>
                        <div className="Arbitrator-Appointment-form-group-textarea">
                                    <label>Escalation Reason</label>
                                    <textarea className="Arbitrator-Appointment-textarea" rows="3"></textarea>
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

export default ArbitratorAppointment;
