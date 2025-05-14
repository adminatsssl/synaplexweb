import React from "react";
import './PlainText.css'

const PlainTextTab = () => (
  <div className="PlainTextTopbar">
    <div className="PlainText-checkbox">
    <label>
      <input type="checkbox" /> Use the plain text body only
    </label>
    </div>
    <div className="PlainText-textarea">
      <label>Plain Text</label>
    <textarea />
    </div>
    
  </div>
);

export default PlainTextTab;
