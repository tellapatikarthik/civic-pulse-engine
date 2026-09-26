import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { getRecommendationById, updateRecommendationStatus } from "@/lib/demo-data";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const recommendation = getRecommendationById(projectId);

  if (!recommendation) {
    return (
      <AppShell>
        <main className="page-wrap">
          <div className="section-panel" style={{ padding: 30 }}>
            <div className="eyebrow">Project unavailable</div>
            <h1 className="title">Recommendation not found</h1>
          </div>
        </main>
      </AppShell>
    );
  }

  const [status, setStatus] = useState(recommendation.status);

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Project detail</div>
            <h1 className="title">{recommendation.project_name}</h1>
            <div className="status-pill review">Status: {status}</div>
          </div>
          <div className="priority-chip" style={{ minWidth: 120, fontSize: 18 }}>{recommendation.priority_score} / 100</div>
        </div>

        <div className="recommendation-detail">
          <div>
            <div className="section-panel">
              <div className="panel-head">
                <div>
                  <div className="eyebrow">Citizen Demand</div>
                  <h3 className="panel-title">{recommendation.request_count.toLocaleString()} related requests</h3>
                </div>
              </div>
              <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>
                Similar requests cluster around {recommendation.region} and are linked to low infrastructure access and repeated service disruption concerns.
              </div>
            </div>

            <div className="section-panel" style={{ marginTop: 18 }}>
              <div className="panel-head">
                <div>
                  <div className="eyebrow">Why this project?</div>
                  <h3 className="panel-title">Evidence-driven explanation</h3>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <ul style={{ paddingLeft: 18, color: "var(--muted-foreground)", lineHeight: 2 }}>
                  {recommendation.evidence.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="section-panel" style={{ marginTop: 18 }}>
              <div className="panel-head">
                <div>
                  <div className="eyebrow">AI-generated summary</div>
                  <h3 className="panel-title">Neutral summary</h3>
                </div>
              </div>
              <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{recommendation.explanation}</div>
            </div>
          </div>

          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Priority score</div>
                <h3 className="panel-title">Transparent calculation</h3>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div className="score-breakdown">
                {[
                  ["Citizen demand", recommendation.demand_score],
                  ["Infrastructure gap", recommendation.infrastructure_gap_score],
                  ["Population impact", recommendation.population_impact_score],
                  ["Essential service access", recommendation.essential_service_score],
                  ["Feasibility", recommendation.feasibility_score],
                ].map(([label, value]) => (
                  <div key={label} className="score-line">
                    <span>{label}</span>
                    <div className="score-track"><div className="score-fill" style={{ width: `${value}%` }} /></div>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                Prototype scoring model. Weights should be validated and calibrated with responsible public authorities before real-world deployment.
              </div>

              <div style={{ marginTop: 20 }}>
                <div className="field-label">Human decision</div>
                <select
                  className="form-input"
                  value={status}
                  onChange={(event) => {
                    const nextStatus = event.target.value as typeof status;
                    setStatus(nextStatus);
                    updateRecommendationStatus(projectId, nextStatus);
                  }}
                >
                  <option value="Review">Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Implemented">Implemented</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="citizen-actions" style={{ marginTop: 14 }}>
                  <button className="primary-button" type="button">Approve for Planning</button>
                  <button className="secondary-button" type="button">Request More Evidence</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
