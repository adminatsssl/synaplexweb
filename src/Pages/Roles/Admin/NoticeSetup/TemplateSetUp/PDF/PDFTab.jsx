import React from 'react';
import './PDFTab.css'

const PDFTab = ({ value, onChange }) => {
    return(
        <div className='PDFTab'>
            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder="Enter PDF body text..."
            />
        </div>
    );
};

export default PDFTab;