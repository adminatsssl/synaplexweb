import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceComplaintFilling.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const ChequeBounceComplaintFilling = () => {
  const { id: caseId } = useParams();

  const [complaintData, setComplaintData] = useState({
    caseNumber: '',
    courtName: '',
    complaintDate: '',
    notes: ''
  });

  const [dispositionData, setDispositionData] = useState([]);

  useEffect(() => {
    if (caseId) {
      fetchComplaintData();
    }
  }, [caseId]);

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(`/api/api/complaintFilingCB/case/${caseId}`, {
        headers: getAuthHeaders()
      });

      console.log("full response",response)

      const data = response.data.data;

      setComplaintData({
        caseNumber: data.caseNumber || '',
        courtName: data.courtName || '',
        complaintDate: data.complaintDate || '',
        notes: data.notes || ''
      });

      setDispositionData(data.dispositions || []);
      console.log("Complaint Filing Case ID:", caseId);

    } catch (error) {
      console.error("Error fetching complaint filing data:", error);
    }
  };

  const dispositionColumns = [
  { key: "name", label: "Disposition Stage" },
  { key: "description", label: "Comment" },
];

  return (
    <div className='chequeBounce-complaintFilling-container'>
      <div className='chequeBounce-complaintFilling-topcontent-container'>
        <div className='chequeBounce-complaintFilling-topcontent-heading'>
          <h5>Complaint Filing</h5>
        </div>
        <div className='chequeBounce-complaintFilling-topcontent'>
          <div className='chequeBounce-complaintFilling-topcontent-leftside'>
            <div className="chequeBounce-complaintFilling-form-row">
              <div className="chequeBounce-complaintFilling-form-row-content">
                <div className="chequeBounce-complaintFilling-form-group">
                  <label>Case Number</label>
                  <input
                    type="text"
                    disabled
                    className="possessionnotice-input"
                    value={complaintData.caseNumber}
                  />
                </div>
                <div className="chequeBounce-complaintFilling-form-group">
                  <label>Court Name</label>
                  <input
                    type="text"
                    disabled
                    className="possessionnotice-input"
                    value={complaintData.courtName}
                  />
                </div>
              </div>

              <div className="chequeBounce-complaintFilling-form-row-content">
                <div className="chequeBounce-complaintFilling-form-group">
                  <label>Complaint Date</label>
                  <input
                    type='date'
                    disabled
                    value={complaintData.complaintDate}
                  />
                </div>
                <div className="chequeBounce-complaintFilling-form-group">
                  <label>Notes</label>
                  <textarea
                    className="chequeBounce-complaintFilling-textarea"
                    disabled
                    rows="3"
                    value={complaintData.notes}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='chequeBounce-complaintFilling-middle-content'>
        <div className='chequeBounce-complaintFilling-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='chequeBounce-complaintFilling-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

    </div>
  );
};

export default ChequeBounceComplaintFilling;
