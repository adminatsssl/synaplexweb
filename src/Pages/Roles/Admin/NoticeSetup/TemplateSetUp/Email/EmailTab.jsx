import React, { useState } from 'react';
import './EmailTab.css'

const EmailTab = ({ subject, body, onSubjectChange, onBodyChange }) => {
  const [digitalSignature, setDigitalSignature] = useState('no');
  const [encryption, setEncryption] = useState('no');

  return (
    <div className="EmailTab">
      {/* Row: To, CC, BCC */}
      <div className="EmailTab-Topbar">
        <div className='EmailTab-SendField'>
          <label className="">To</label>
          <input
            type="text"
            className=""
            placeholder="{{borrowerEmail}}"
            disabled
          />
        </div>
        <div className='EmailTab-SendField'>
          <label className="">CC</label>
          <input
            type="text"
            className=""
            placeholder="Optional"
          />
        </div>
        <div className='EmailTab-SendField'>
          <label className="">BCC</label>
          <input
            type="text"
            className=""
            placeholder="Optional"
          />
        </div>
      </div>

      {/* Subject */}
      <div className='EmailTab-Middlebar'>
        <label className="">Subject</label>
        <input
          type="text"
          className=""
          value={subject || ""}
          onChange={onSubjectChange}
          placeholder="Enter email subject..."
        />
      </div>

      {/* Digital Signature & Encryption */}
      <div className="EmailTab-BottomTab-Heading">
        <span className="">Digital Signature</span>
        <span className="">Encryption</span>
      </div>
      <div className='EmailTab-BottomTab-Checkbox'>
        <div className='EmailTab-BottomTab-Input'>
          <label className="">
            <input
              type="radio"
              name="digitalSignature"
              value="yes"
              checked={digitalSignature === 'yes'}
              onChange={() => setDigitalSignature('yes')}
              className=""
            />
            Yes
          </label>
          <label className="">
            <input
              type="radio"
              name="digitalSignature"
              value="no"
              checked={digitalSignature === 'no'}
              onChange={() => setDigitalSignature('no')}
              className=""
            />
            No
          </label>
        </div>
        <div className='EmailTab-BottomTab-Input'>
          <label className="">
            <input
              type="radio"
              name="encryption"
              value="yes"
              checked={encryption === 'yes'}
              onChange={() => setEncryption('yes')}
              className=""
            />
            Yes
          </label>
          <label className="">
            <input
              type="radio"
              name="encryption"
              value="no"
              checked={encryption === 'no'}
              onChange={() => setEncryption('no')}
              className=""
            />
            No
          </label>
        </div>
      </div>
      <textarea
        value={body || ""}
        onChange={onBodyChange}
        placeholder="Enter email body text..."
      />
    </div>
  );
};

export default EmailTab;
