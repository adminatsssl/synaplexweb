// CaseDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import CasesDetail from "./CaseDetail";

const dummyCases = [
  {
    CaseID: "101",
    LoanID: "L-0001",
    CaseType: "Civil",
    Status: "Open",
    Borrower: "John Doe",
    LoanAmount: "$100,000",
    NPADate: "2023-01-01",
    CreateDate: "2023-02-01",
    AssignedTo: "Agent A",
    Court: "High Court",
  },
  {
    CaseID: "102",
    LoanID: "L-0002",
    CaseType: "Criminal",
    Status: "Closed",
    Borrower: "Jane Smith",
    LoanAmount: "$200,000",
    NPADate: "2023-03-01",
    CreateDate: "2023-04-01",
    AssignedTo: "Agent B",
    Court: "District Court",
  },
];

const CaseDetailPage = () => {
  const { id } = useParams();
  const caseData = dummyCases.find((c) => c.CaseID === id);

  if (!caseData) return <p>No case found</p>;

  return <CasesDetail caseData={caseData} />;
};

export default CaseDetailPage;
