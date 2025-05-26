import React, { useState, useEffect } from 'react';
import './NoticePreviewModal.css';

const NoticePreviewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const tabsAPI = [
        { id: 'speedPost', label: 'Speed Post' },
        { id: 'email', label: 'E-Mail' },
        { id: 'whatsapp', label: 'WhatsApp' },
        { id: 'sms', label: 'SMS' }
    ];

    const [templateOptions, setTemplateOptions] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        // Fetch templates from API
        const fetchTemplates = async () => {
            try {
                const res = await fetch('/api/api/templates');
                const data = await res.json();
                if (data.status === 'SUCCESS') {
                    setTemplateOptions(data.data);
                    setSelectedTemplate(data.data[0]?.id || '');
                } else {
                    console.error('Failed to fetch templates');
                }
            } catch (err) {
                console.error('Error fetching templates:', err);
            }
        };

        fetchTemplates();
        setTabs(tabsAPI);
        setActiveTab(tabsAPI[0]?.id);
    }, []);

    const handleSend = () => {
        console.log(`Sending via ${activeTab} using template ID: ${selectedTemplate}`);
        // Replace with actual sending logic
    };

const renderPreviewContent = () => {
    const selected = templateOptions.find(t => t.id === Number(selectedTemplate));
    if (!selected) return <p>No template selected.</p>;

    let bodyContent = '';
    switch (activeTab) {
        case 'speedPost':
            bodyContent = selected.pdfBody;
            break;
        case 'email':
            bodyContent = selected.emailBody;
            break;
        case 'whatsapp':
            bodyContent = selected.whatsappBody;
            break;
        case 'sms':
            bodyContent = selected.smsBody;
            break;
        default:
            bodyContent = '';
    }

    return (
        <>
            <p><strong>{activeTab === 'email' ? 'Subject:' : ''}</strong> {activeTab === 'email' ? selected.emailSubject : ''}</p>
            <p>{bodyContent}</p>

            <div className="action-buttons">
                {activeTab === 'speedPost' && (
                    <>
                        <button className="generate-button" onClick={() => console.log("Generate Notice")}>Generate Notice</button>
                        <button className="download-button" onClick={() => console.log("Download PDF")}>Download</button>
                    </>
                )}
                <button className="send-button" onClick={handleSend}>Send</button>
                <button className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </>
    );
};


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Notice</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <label>Template Name:</label>
                    <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                        {templateOptions.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>

                    <label>Notice Preview:</label>
                    <div className="tab-buttons">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={activeTab === tab.id ? 'active' : ''}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="preview-text">
                        {renderPreviewContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticePreviewModal;
