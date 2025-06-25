import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceFinalJudgement.css';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const ChequeBounceFinalJudgement = () => {
  const { id: caseId } = useParams();

  const [judgementData, setJudgementData] = useState({
    judgmentDate: '',
    courtOrderDocuments: '',
    judgmentType: '',
    judgmentSummary: '',
  });

  const [dispositionData, setDispositionData] = useState([]);

  useEffect(() => {
    if (caseId) {
      fetchJudgementData();
    }
  }, [caseId]);

  const fetchJudgementData = async () => {
    try {
      const response = await axios.get(`/api/api/finalJudgmentCB/case/${caseId}`, {
        headers: getAuthHeaders()
      });

      const data = response.data.data;

      setJudgementData({
        judgmentDate: data.judgmentDate ?? '',
        courtOrderDocuments: data.courtOrderDocuments ?? '',
        judgmentType: data.judgmentType ?? '',
        judgmentSummary: data.judgmentSummary ?? '',
      });

      setDispositionData(data.dispositions || []);
      console.log("Final Judgement Case ID:", caseId);
    } catch (error) {
      console.error("Error fetching final judgement data:", error);
    }
  };

  const dispositionColumns = [
  { key: "name", label: "Disposition Stage" },
  { key: "description", label: "Comment" },
];

  return (
    <div className='chequeBounce-finalJudgement-container'>

      <div className='chequeBounce-finalJudgement-topcontent-container'>
        <div className='chequeBounce-finalJudgement-topcontent-heading'>
          <h5>Final Judgement</h5>
        </div>

        <div className='chequeBounce-finalJudgement-topcontent'>
          <div className='chequeBounce-finalJudgement-topcontent-leftside'>
            <div className="chequeBounce-finalJudgement-form-row">

              <div className='chequeBounce-finalJudgement-form-row-content'>
                <div className="chequeBounce-finalJudgement-form-group">
                  <label>Judgment Date</label>
                  <input type="date" value={judgementData.judgmentDate} disabled className="notice-input" />
                </div>
                <div className="chequeBounce-finalJudgement-form-group">
                  <label>Court Order Documents</label>
                  <input
                    type="text"
                    value={judgementData.courtOrderDocuments}
                    disabled
                    className="notice-input"
                  />
                </div>
              </div>

              <div className='chequeBounce-finalJudgement-form-row-content'>
                <div className="chequeBounce-finalJudgement-form-group">
                  <label>Judgment Type</label>
                  <input
                    type='text'
                    value={judgementData.judgmentType}
                    disabled
                  />
                </div>
                <div className="chequeBounce-finalJudgement-form-group">
                  <label>Judgment Summary</label>
                  <textarea
                    disabled
                    className="chequeBounce-finalJudgement-textarea"
                    rows="3"
                    value={judgementData.judgmentSummary}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className='chequeBounce-finalJudgement-middle-content'>
        <div className='chequeBounce-finalJudgement-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='chequeBounce-finalJudgement-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

    </div>
  );
};

export default ChequeBounceFinalJudgement;
