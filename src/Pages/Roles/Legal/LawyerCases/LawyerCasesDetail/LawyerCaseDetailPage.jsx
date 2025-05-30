// CaseDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import LawyerCasesDetail from "./LawyerCasesDetail";
import { useState,useEffect } from "react";
import axios from "axios";

const LawyerCaseDetailPage = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const response = await axios.get(`/api/api/cases/${id}`);
        const item = response.data?.data;

        if (item) {
          const transformedCase = {
            CaseID: item.id,
            LoanID: item.loan.loanNumber,
            CaseType: item.workflowType,
            activeStageName:item.activeStageName,
            Status: item.status,
            Borrower: item.loan.borrower.name,
            LoanAmount: `₹${item.loan.loanAmount.toLocaleString()}`,
            NPADate: item.loan.lastPaymentDate,
            CreateDate: item.loan.startDate,
            AssignedTo: "-", // Update when available
            Court: item.loan.borrower.address.city || "-",
          };
          setCaseData(transformedCase);
        } else {
          setError("No case found.");
        }
      } catch (err) {
        console.error("Error fetching case detail:", err);
        setError("Something went wrong while fetching case details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetail();
  }, [id]);

  if (loading) return <p>Loading case details...</p>;
  if (error) return <p>{error}</p>;

   return <LawyerCasesDetail caseData={caseData} />;
};


export default LawyerCaseDetailPage;
