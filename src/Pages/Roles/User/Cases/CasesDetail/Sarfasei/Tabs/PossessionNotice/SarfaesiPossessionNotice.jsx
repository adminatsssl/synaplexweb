import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SaveButton from "../../../../../../../ReusableComponents/SaveButton.jsx";
import CancelButton from "../../../../../../../ReusableComponents/CancelButton.jsx";
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './SarfaesiPossessionNotice.css';

const dispositionColumns = [
  { key: "stage", label: "Disposition Stage" },
  { key: "comment", label: "Comment" },
];

const SarfaesiPossessionNotice = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    noticeSentDate: "",
    possessionDate: "",
    noticeType: "",
    assetDetails: "",
    remarks: "",
    dispositions: [],
  });

  useEffect(() => {
    const fetchPossessionData = async () => {
      try {
        const res = await fetch(`/api/api/possessionNotice/case/${id}`);
        const data = await res.json();
        setFormData({
          noticeSentDate: data.noticeSentDate,
          possessionDate: data.possessionDate,
          noticeType: data.noticeType,
          assetDetails: data.assetDetails,
          remarks: data.remarks,
          dispositions: data.dispositions || [],
        });
      } catch (err) {
        console.error("Error fetching possession notice data:", err);
      }
    };

    if (id) fetchPossessionData();
  }, [id]);

  return (
    <div className='possessionNotice-Sarfasei-container'>

      <div className='possessionNotice-Sarfasei-topcontent-container'>
        <div className='possessionNotice-Sarfasei-topcontent-heading'>
          <h5>Possession Notice - Section 13(4)</h5>
        </div>
        <div className='possessionNotice-Sarfasei-topcontent'>

          <div className='possessionNotice-Sarfasei-topcontent-leftside'>
            <div className="Sarfasei-possessionnotice-form-row">
              <div className="Sarfasei-possessionnotice-form-group">
                <label>Notice Sent Date</label>
                <input
                  type="date"
                  className="possessionnotice-input"
                  disabled
                  value={formData.noticeSentDate}
                  readOnly
                />
              </div>
              <div className="Sarfasei-possessionnotice-form-group">
                <label>Possession Date</label>
                <input
                  type="date"
                  className="possessionnotice-input"
                  disabled
                  value={formData.possessionDate}
                  readOnly
                />
              </div>
              <div className="Sarfasei-possessionnotice-form-group">
                <label>Notice Type</label>
                <input
                  type="text"
                  className="possessionnotice-input"
                  disabled
                  value={formData.noticeType}
                  readOnly
                />
              </div>
            </div>
            <div className="Sarfasei-possessionnotice-form-group">
              <label>Asset Details</label>
              <input
                type='text'
                className="possessionnotice-input"
                disabled
                value={formData.assetDetails}
                readOnly
              />
            </div>
            <div className="Sarfasei-possessionnotice-form-group">
              <label>Remarks</label>
              <textarea
                className="Sarfasei-possessionnotice-textarea"
                rows="3"
                disabled
                value={formData.remarks}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className='possessionNotice-Sarfasei-middle-content'>
        <div className='possessionNotice-Sarfasei-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='possessionNotice-Sarfasei-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={formData.dispositions} />
        </div>
      </div>

      {/* <div className='possessionNotice-Sarfasei-Bottom-btn'>
        <CancelButton />
        <SaveButton label='Save & Next' />
      </div> */}

    </div>
  );
};

export default SarfaesiPossessionNotice;
