import React, { useState, useEffect } from 'react';
import './NoticePreviewModal.css';

const NoticePreviewModal = ({ isOpen, onClose, caseId }) => {
    if (!isOpen) return null;
    
    if (!caseId) {
        console.error('No caseId provided to NoticePreviewModal');
        return null;
    }

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
    const [isGenerating, setIsGenerating] = useState(false);
    const [noticeExists, setNoticeExists] = useState(false);

    useEffect(() => {
        // Fetch templates from API
        const fetchTemplates = async () => {
            try {
                const res = await fetch('/api/api/templates/chequeBounce');
                const data = await res.json();
                if (data.status === 'SUCCESS') {
                    setTemplateOptions(data.data);
                    setSelectedTemplate(data.data[0]?.id || '');
                    setTabs(tabsAPI);
                    setActiveTab('speedPost');
                } else {
                    console.error('Failed to fetch templates');
                }
            } catch (err) {
                console.error('Error fetching templates:', err);
            }
        };

        fetchTemplates();
    }, []);

    const handleSend = async () => {
        try {
            const response = await fetch('/api/api/notices/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    caseId,
                    templateId: selectedTemplate,
                    type: activeTab
                }),
            });

            if (response.ok) {
                alert('Notice sent successfully!');
                onClose();
            } else {
                throw new Error('Failed to send notice');
            }
        } catch (error) {
            console.error('Error sending notice:', error);
            alert('Failed to send notice. Please try again.');
        }
    };

    const handleGenerateNotice = async () => {
        try {
            setIsGenerating(true);
            const response = await fetch('/api/api/notices/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    caseId,
                    templateId: selectedTemplate
                }),
            });

            if (response.ok) {
                setNoticeExists(true);
                alert('Notice generated successfully!');
            } else {
                throw new Error('Failed to generate notice');
            }
        } catch (error) {
            console.error('Error generating notice:', error);
            alert('Failed to generate notice. Please try again.');
        } finally {
            setIsGenerating(false);
        }
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
                            <button 
                                className="generate-button" 
                                onClick={handleGenerateNotice}
                                disabled={isGenerating || noticeExists}
                                title={noticeExists ? 'Notice has already been generated' : ''}
                            >
                                {isGenerating ? 'Generating...' : noticeExists ? 'Notice Generated' : 'Generate Notice'}
                            </button>
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