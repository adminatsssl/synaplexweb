// WorkflowModal.jsx
import React, { useEffect, useState } from 'react';
import './LegalWorkflow.css';

const caseTypes = [
  "Arbitration",
  "SARFAESI",
  "Cheque_Bounce",
  "Debt_Recovery_Tribunal__DRT_",
  "Civil_Court",
  "IBC_NCLT",
  "Criminal_Complaints"
];

const WorkflowModal = ({ onClose, workflow }) => {
  const [caseType, setCaseType] = useState(workflow?.CaseType || '');
  const [description, setDescription] = useState(workflow?.Description || '');

  const isEdit = !!workflow;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      CaseType: caseType,
      Description: description
    };

    try {
      await fetch(`/odata/legal/LegalWorkflows${isEdit ? `(${workflow.ID.toString()})` : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      onClose();
    } catch (err) {
      console.error('Error saving workflow:', err);
      alert('Something went wrong while saving.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isEdit ? 'Edit' : 'Add'} Workflow</h3>
        <form onSubmit={handleSubmit}>
          <label>Case Type</label>
          <select value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
            <option value="">Select Case Type</option>
            {caseTypes.map((ct) => (
              <option key={ct} value={ct}>{ct.replace(/_/g, ' ')}</option>
            ))}
          </select>

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkflowModal;
// // WorkflowModal.jsx
// import React, { useEffect, useState } from 'react';
// import './LegalWorkflow.css';

// const caseTypes = [
//   "Arbitration",
//   "SARFAESI",
//   "Cheque_Bounce",
//   "Debt_Recovery_Tribunal__DRT_",
//   "Civil_Court",
//   "IBC_NCLT",
//   "Criminal_Complaints"
// ];

// const WorkflowModal = ({ onClose, workflow }) => {
//   const [caseType, setCaseType] = useState(workflow?.CaseType || '');
//   const [description, setDescription] = useState(workflow?.Description || '');

//   const isEdit = !!workflow;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       CaseType: caseType,
//       Description: description
//     };

//     try {
//       const res = await fetch(`/odata/legal/LegalWorkflows${isEdit ? `(${workflow.ID})` : ''}`, {
//         method: isEdit ? 'PATCH' : 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) throw new Error('Failed to save workflow');
//       onClose();
//     } catch (err) {
//       console.error('Error saving workflow:', err);
//       alert('Something went wrong while saving.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h3>{isEdit ? 'Edit' : 'Add'} Workflow</h3>
//         <form onSubmit={handleSubmit}>
//           <label>Case Type</label>
//           <select value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
//             <option value="">Select Case Type</option>
//             {caseTypes.map((ct) => (
//               <option key={ct} value={ct}>{ct.replace(/_/g, ' ')}</option>
//             ))}
//           </select>

//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           <div className="modal-actions">
//             <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
//             <button type="submit" className="save-btn">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default WorkflowModal;
