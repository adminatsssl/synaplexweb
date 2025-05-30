// CaseDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import LawyerCasesDetail from "./LawyerCasesDetail";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const LawyerCaseDetailPage = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const fetchCaseDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/api/api/cases/${id}`, {
        // Add cache-busting parameter
        params: { _t: Date.now() }
      });
      const item = response.data?.data;

      if (item) {
        const transformedCase = {
          CaseID: item.id,
          LoanID: item.loan.loanNumber,
          CaseType: item.workflowType,
          activeStageName: item.activeStageName,
          Status: item.status,
          Borrower: item.loan.borrower.name,
          LoanAmount: `₹${item.loan.loanAmount.toLocaleString()}`,
          NPADate: item.loan.lastPaymentDate,
          CreateDate: item.loan.startDate,
          AssignedTo: "-", // Update when available
          Court: item.loan.borrower.address.city || "-",
          lastModified: item.lastModified || Date.now(), // Track last modification
        };

        // Only update if the data has changed
        setCaseData(prev => {
          if (!prev || prev.lastModified !== transformedCase.lastModified || prev.activeStageName !== transformedCase.activeStageName) {
            setLastUpdateTime(Date.now());
            return transformedCase;
          }
          return prev;
        });
      } else {
        setError("No case found.");
      }
    } catch (err) {
      console.error("Error fetching case detail:", err);
      setError("Something went wrong while fetching case details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial fetch
  useEffect(() => {
    fetchCaseDetail();
  }, [fetchCaseDetail]);

  // Set up polling for updates every 5 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchCaseDetail();
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [fetchCaseDetail]);

  if (loading) return <p>Loading case details...</p>;
  if (error) return <p>{error}</p>;

  return <LawyerCasesDetail caseData={caseData} lastUpdateTime={lastUpdateTime} />;
};

export default LawyerCaseDetailPage;
