                <div className="Sarfasei-container">
                    {caseData.CaseType?.toLowerCase() === "cheque bounce" && <ChequeBounceContent caseId={caseData.id} />}
                    {caseData.CaseType?.toLowerCase() === "sarfaesi" && <SarfaseiContent caseId={caseData.id} />}
                    {caseData.CaseType?.toLowerCase() === "arbitration" && <ArbitrationContent caseId={caseData.id} />}
                </div> 