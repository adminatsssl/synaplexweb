import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CasesDetail from "./CaseDetail";

const CaseDetailPage = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const response = await axios.get(`/api/api/cases/${id}`, {
          headers: getAuthHeaders()
        });
        const item = response.data?.data;

        if (item) {
          const transformedCase = {
            CaseID: item.id,
            LoanID: item.loan.loanNumber,
            CaseType: item.workflowType,
            Status: item.status,
            Borrower: item.loan.borrower.name,
            LoanAmount: item.loan?.loanAmount
              ? `₹${item.loan.loanAmount.toLocaleString()}`
              : "-",
            NPADate: item.loan?.lastPaymentDate || "-",
            CreateDate: item.loan?.startDate || "-",
            AssignedTo: "-", // Update if data available
            Court: item.loan?.borrower?.address?.city || "-",
            activeStageName: item.activeStageName,
            LoanType: item.loanType || "-",
            Tenure: item.loanTenure || "-",
            AnnualInterestRate:item.loan.interestRate || "-",
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

  return <CasesDetail caseData={caseData} />;
};

export default CaseDetailPage;
