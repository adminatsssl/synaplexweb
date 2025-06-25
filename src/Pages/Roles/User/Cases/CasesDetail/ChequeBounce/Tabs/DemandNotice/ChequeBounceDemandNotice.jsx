import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReusableGrid from "../../../../../../../ReusableComponents/ReusableGrid.jsx";
import './ChequeBounceDemandNotice.css';

// Import icons
import whatsappIcon from '../../../../../../../../assets/icons/whatsapp.png';
import emailIcon from '../../../../../../../../assets/icons/email.png';
import smsIcon from '../../../../../../../../assets/icons/sms.png';
import mailboxIcon from '../../../../../../../../assets/icons/mailbox.png';
import GDNEmailCB from '../GenerateDemandNoticeCB/GDNEmailCB.jsx';
import GDNSMSCB from '../GenerateDemandNoticeCB/GDNSMSCB.jsx';
import GDNWhatsappCB from '../GenerateDemandNoticeCB/GDNWhatsappCB.jsx';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const ChequeBounceDemandNotice = () => {
  const { id: caseId } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [showSmsPopup, setShowSmsPopup] = useState(false);

  const [noticeData, setNoticeData] = useState({
    noticeDeadline: '',
    noticeSentDate: '',
    noticeType: '',
    comment: ''
  });

  const [dispositionData, setDispositionData] = useState([]);

  useEffect(() => {
    if (caseId) {
      fetchNoticeData();
    }
  }, [caseId]);

  const fetchNoticeData = async () => {
    try {
      const response = await axios.get(`/api/api/demandnoticeCB/case/${caseId}`, {
        headers: getAuthHeaders()
      });

      const data = response.data.data;

      setNoticeData({
        noticeDeadline: data.noticeDeadline ?? '',
        noticeSentDate: data.noticeSentDate ?? '',
        noticeType: data.noticeType ?? '',
        comment: data.comment ?? ''
      });

      setDispositionData(data.dispositions || []);
      console.log("Demand Notice Case ID:", caseId);
    } catch (error) {
      console.error("Error fetching demand notice data:", error);
    }
  };

  const dispositionColumns = [
  { key: "name", label: "Disposition Stage" },
  { key: "description", label: "Comment" },
];

  return (
    <div className='chequeBounce-demandNotice-container'>
      <div className='chequeBounce-demandNotice-topcontent-container'>
        <div className='chequeBounce-demandNotice-topcontent-heading'>
          <h5>Demand Notice Generation - Section 13(2)</h5>
        </div>

        <div className='chequeBounce-demandNotice-topcontent'>
          <div className='chequeBounce-demandNotice-topcontent-leftside'>
            <div className="chequeBounce-demandNotice-form-row">
              <div className="chequeBounce-demandNotice-form-row-content">
                <div className="chequeBounce-demandNotice-form-group">
                  <label>Notice Deadline</label>
                  <input
                    type="date"
                    value={noticeData.noticeDeadline}
                    disabled
                    className="notice-input"
                  />
                </div>
                <div className="chequeBounce-demandNotice-form-group">
                  <label>Notice Sent Date</label>
                  <input
                    type="date"
                    value={noticeData.noticeSentDate}
                    disabled
                    className="notice-input"
                  />
                </div>
              </div>

              <div className="chequeBounce-demandNotice-form-row-content">
                <div className="chequeBounce-demandNotice-form-group">
                  <label>Notice Type</label>
                  <input
                    type="text"
                    value={noticeData.noticeType}
                    disabled
                    className="notice-input"
                  />
                </div>
                <div className="chequeBounce-demandNotice-form-group">
                  <label>Comment</label>
                  <textarea
                    value={noticeData.comment}
                    disabled
                    className="chequeBounce-demandNotice-textarea"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='chequeBounce-demandNotice-topcontent-rightside'>
            <h4>View Generated Notice</h4>
            <div className='chequeBounce-demandNotice-topcontent-rightside-icon'>
              <div className='chequeBounce-demandNotice-icon'>
                <img src={emailIcon} alt="Email" className="custom-icon email-icon" onClick={() => setIsEmailModalOpen(true)} style={{ cursor: 'pointer' }} />
                <img src={whatsappIcon} alt="WhatsApp" className="custom-icon whatsapp-icon" onClick={() => setIsWhatsappModalOpen(true)} style={{ cursor: 'pointer' }} />
              </div>
              <div className='chequeBounce-demandNotice-icon'>
                <img src={smsIcon} alt="SMS" className="custom-icon sms-icon" onClick={() => setShowSmsPopup(true)} style={{ cursor: 'pointer' }} />
                <img src={mailboxIcon} alt="Physical Mail" className="custom-icon physical-mail-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='chequeBounce-demandNotice-middle-content'>
        <div className='chequeBounce-demandNotice-middle-content-heading'>
          <h5>Disposition Summary</h5>
        </div>
        <div className='chequeBounce-demandNotice-middle-content-formdata'>
          <ReusableGrid columns={dispositionColumns} data={dispositionData} />
        </div>
      </div>

      <GDNEmailCB open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
      <GDNWhatsappCB open={isWhatsappModalOpen} onClose={() => setIsWhatsappModalOpen(false)} />
      {showSmsPopup && <GDNSMSCB onClose={() => setShowSmsPopup(false)} />}
    </div>
  );
};

export default ChequeBounceDemandNotice;
