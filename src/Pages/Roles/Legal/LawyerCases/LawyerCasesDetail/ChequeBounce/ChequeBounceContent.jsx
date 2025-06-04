import React, { useState, useEffect } from "react";
import ReusableCaseStage from "../ReusableCaseStage";
import './ChequeBounceContent.css';
import ChequeBounceDemandNotice from "./Tabs/DemandNotice/ChequeBounceDemandNotice";
import ChequeBounceTrackingResponse from "./Tabs/TrackingResponse/ChequeBounceTrackingResponse";
import ChequeBounceComplaintFilling from "./Tabs/ComplaintFilling/ChequeBounceComplaintFilling";
import ChequeBounceCourtProceedings from "./Tabs/CourtProceeding/ChequeBounceCourtProceedings";
import ChequeBounceFinalJudgement from "./Tabs/FinalJudgement/ChequeBounceFinalJudgement";
import CaseDetailClose from "../Sarfasei/Tabs/Close/CaseDetailClose";
import CaseHistoryAccordion from "../CaseHistory.jsx";
import PropTypes from 'prop-types';
import axios from 'axios';

const steps = [
  { label: "Initiation" },
  { label: "Demand Notice Generation" },
  { label: "Tracking 15-Day Response" },
  { label: "Complaint Filing" },
  { label: "Court Proceedings" },
  { label: "Final Judgment" },
  { label: "Closure" },
];

const stageNameToStepMap = {
  "Initiation": 1,
  "Demand Notice Generation": 2,
  "Tracking 15-Day Response": 3,
  "Complaint Filing": 4,
  "Court Proceedings": 5,
  "Final Judgment": 6,
  "Closure": 7
};

const dummyData = [
  {
    auditDate: "2025-01-01",
    actionType: "Update",
    changedDate: "2025-01-01",
    performedBy: "John Doe",
    fieldChanged: "Status",
    oldValue: "Pending",
    newValue: "Approved",
  },
];

const ChequeBounceContent = ({ caseId, initialActiveStep = 2 }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [viewedStep, setViewedStep] = useState(initialActiveStep);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`/api/api/cases/${caseId}`);
        if (response.data && response.data.data) {
          const { activeStageName } = response.data.data;
          const mappedStep = stageNameToStepMap[activeStageName] || initialActiveStep;
          setActiveStep(mappedStep);
          setViewedStep(mappedStep);
        }
      } catch (error) {
        console.error('Error fetching case details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (caseId) {
      fetchCaseDetails();
    }
  }, [caseId, initialActiveStep]);

  const handleStepClick = (stepNum) => {
    // Prevent clicking on step 1 (Initiation)
    if (stepNum === 1) {
      return;
    }
    
    // Prevent accessing future stages beyond the active stage
    if (stepNum > activeStep) {
      return;
    }
    
    // Only update the viewed step, not the active step
    setViewedStep(stepNum);
  };

  const handleStageComplete = () => {
    // Move both active and viewed step forward
    if (activeStep < steps.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setViewedStep(nextStep);
    }
  };

  // Calculate disabled steps - includes step 1 and all steps beyond current active step
  const getDisabledSteps = () => {
    const disabledSteps = [1]; // Always disable step 1 (Initiation)
    for (let i = activeStep + 1; i <= steps.length; i++) {
      disabledSteps.push(i);
    }
    return disabledSteps;
  };

  if (!caseId) {
    console.error('No caseId provided to ChequeBounceContent');
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ChequeBounce-content-container-topbar">
      <div className="ChequeBounce-content-container">
        <h4>CASE PROGRESS</h4>
        <div className="ChequeBounce-resuable-content">
          <ReusableCaseStage
            steps={steps}
            activeStep={activeStep}
            viewedStep={viewedStep}
            onStepClick={handleStepClick}
            disabledSteps={getDisabledSteps()}
          />
        </div>

        {viewedStep === 2 && (
          <ChequeBounceDemandNotice 
            caseId={caseId} 
            onStageComplete={handleStageComplete}
          />
        )}
        {viewedStep === 3 && (
          <ChequeBounceTrackingResponse 
            caseId={caseId}
            onStageComplete={handleStageComplete}
          />
        )}
        {viewedStep === 4 && <ChequeBounceComplaintFilling caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {viewedStep === 5 && <ChequeBounceCourtProceedings  caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {viewedStep === 6 && <ChequeBounceFinalJudgement caseId={caseId}
            onStageComplete={handleStageComplete} />}
        {viewedStep === 7 && <CaseDetailClose  caseId={caseId}
            onStageComplete={handleStageComplete} />}
      </div>

      <CaseHistoryAccordion data={dummyData} />
    </div>
  );
};

ChequeBounceContent.propTypes = {
  caseId: PropTypes.number.isRequired,
  initialActiveStep: PropTypes.number
};

export default ChequeBounceContent;
