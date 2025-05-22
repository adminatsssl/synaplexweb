import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReusableGrid from "../../../../ReusableComponents/ReusableGrid.jsx"; 
import "./CaseHistory.css"

const columns = [
  { key: "auditDate", label: "Audit Date"},
  { key: "actionType", label: "Action Type" },
  { key: "changedDate", label: "Changed Date" },
  { key: "performedBy", label: "Performed By" },
  { key: "fieldChanged", label: "Field Changed"},
  { key: "oldValue", label: "Old Value" },
  { key: "newValue", label: "New Value"},
];

const CaseHistoryAccordion = ({ data = [] }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="case-history-accordion-container">
      <div className="caseHistory-accordion-header" onClick={() => setOpen(!open)}>
        <div>
          <h4 className="caseHistory-section-title">CASE HISTORY</h4>
        </div>
        <div>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {open && (
        <div className="caseHistory-accordion-body">
          {data.length === 0 ? (
            <div className="info-message">No records found</div>
          ) : (
            <ReusableGrid columns={columns} data={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default CaseHistoryAccordion;
