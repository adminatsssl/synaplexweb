import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserCases from "./UserAddCases.jsx"; 
import Layout from "../../../Layout/Layout.jsx"
import './UserCases.css'; // 👈 Import the CSS

const UserCases = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('/odata/usercases/LexCases')
            .then(response => {
                setCases(response.data.value || []);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    if (loading) return <p>Loading cases...</p>;
    if (error) return <p>Error: {error}</p>;

    return ( 
        <Layout>
            <div className="user-cases-container">
                <div className='user-cases'>
                    <div className="usercaseHeading"><h2>LexCases</h2></div>
                    <div className='usercaseAddbutton'><button onClick={openModal} className="add-case-button">
                    Add Cases
                </button></div>
                </div>
                
                

                <table className="cases-table">
                    <thead>
                        <tr>
                            <th>CaseID</th>
                            <th>CRNNo</th>
                            <th>CaseType</th>
                            <th>Status</th>
                            <th>HearingDate</th>
                            <th>Date Of Filing</th>
                            <th>Fil No</th>
                            <th>Fil Year</th>
                            <th>Reg No</th>
                            <th>Reg Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map(item => (
                            <tr key={item.CaseID}>
                                <td>{item.CaseID}</td>
                                <td>{item.CRNNo}</td>
                                <td>{item.CaseType}</td>
                                <td>{item.Status}</td>
                                <td>{item.HearingDate ?? '-'}</td>
                                <td>{item.Date_Of_Filing ?? '-'}</td>
                                <td>{item.Fil_no}</td>
                                <td>{item.Fil_year}</td>
                                <td>{item.Reg_no}</td>
                                <td>{item.Reg_year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal-overlay-usercase">
                        <div className="modal-content-usercase">
                            <AddUserCases />
                            <button onClick={closeModal} className="close-button">
                               X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default UserCases;
