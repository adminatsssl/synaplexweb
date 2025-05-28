import React from 'react';
import './WhatsappTab.css';

const WhatsAppTab = ({ value, onChange }) => {
    return(
        <div className='WhatsappTab'>
            <h5>Plain Body</h5>
            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder="Enter WhatsApp message text..."
            />
        </div>
    );
};

export default WhatsAppTab;