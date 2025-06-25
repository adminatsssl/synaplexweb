import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceCourtProceedings.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const ChequeBounceCourtProceedings = () => {
  const { id: caseId } = useParams();

  const [courtData, setCourtData] = useState({
    hearingDate: '',
    judgeName: '',
    supportingEvidence: '',
    notes: '',
  });

  const [dispositionData, setDispositionData] = useState([]);
  const [documentData, setDocumentData] = useState([]); // Replace with actual document data if available

  useEffect(() => {
    if (caseId) {
      fetchCourtData();
    }
  }, [caseId]);

  const fetchCourtData = async () => {
    try {
      const response = await axios.get(`/api/api/courtProceedingsCB/case/${caseId}`, {
        headers: getAuthHeaders()
      });

      console.log("full response", response);

      const data = response.data.data;


      setCourtData({
        hearingDate: data.hearingDate || '',
        judgeName: data.judgeName || '',
        supportingEvidence: data.supportingEvidence || '',
        notes: data.notes || '',
      });

      // Optional future support for these:
      setDispositionData(data.dispositions || []);
      setDocumentData(data.documents || []);
        console.log("Case ID",caseId);

    } catch (error) {
      console.error("Error fetching court proceedings data:", error);
    }
  };

  const dispositionColumns = [
  { key: "name", label: "Disposition Stage" },
  { key: "description", label: "Comment" },
];

  const documentColumns = [
    { key: "name", label: "Document Name" },
    { key: "createdDate", label: "Created Date" },
    { key: "uploadedBy", label: "Uploaded By" },
  ];

  return (
    <div className='chequeBounce-courtProceeding-container'>
      <div className='chequeBounce-courtProceeding-topcontent-container'>
        <div className='chequeBounce-courtProceeding-topcontent-heading'>
          <h5>Court Hearing</h5>
        </div>
        <div className='chequeBounce-courtProceeding-topcontent'>
          <div className='chequeBounce-courtProceeding-topcontent-leftside'>
            <div className="chequeBounce-courtProceeding-form-row">
              <div className='chequeBounce-courtProceeding-form-row-content'>
                <div className="chequeBounce-courtProceeding-form-group">
                  <label>Hearing Date</label>
                  <input
                    type="date"
                    className="notice-input"
                    value={courtData.hearingDate}
                    readOnly
                    disabled
                  />
                </div>
                <div className="chequeBounce-courtProceeding-form-group">
                  <label>Supporting Evidence</label>
                  <input
                    type="text"
                    className="notice-input"
                    value={courtData.supportingEvidence}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className='chequeBounce-courtProceeding-form-row-content'>
                <div className="chequeBounce-courtProceeding-form-group">
                  <label>Judge Name</label>
                  <input
                    type="text"
                    value={courtData.judgeName}
                    readOnly
                    disabled
                  />
                </div>
                <div className="chequeBounce-courtProceeding-form-group">
                  <label>Notes</label>
                  <textarea
                    className="chequeBounce-courtProceeding-textarea"
                    rows="3"
                    value={courtData.notes}
                    readOnly
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='chequeBounce-courtProceeding-middle-content'>
        <div className='chequeBounce-courtProceeding-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='chequeBounce-courtProceeding-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

      <div className='chequeBounce-courtProceeding-Bottom-content'>
        <div className='chequeBounce-courtProceeding-Bottom-content-heading'>
          <h5>Uploaded Documents</h5>
        </div>
        <div className='chequeBounce-courtProceeding-Bottom-content-formdata'>
          <ReusableGrid columns={documentColumns} data={documentData} />
        </div>
      </div>
    </div>
  );
};

export default ChequeBounceCourtProceedings;
