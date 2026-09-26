import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getInsightsSummary } from "@/lib/demo-data";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
});

function InsightsPage() {
  const insights = getInsightsSummary();

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">AI analytics</div>
            <h1 className="title">Insights</h1>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Most requested categories</div>
                <h3 className="panel-title">Roads & Transport</h3>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div className="score-breakdown">
                {[
                  ["Roads & Transport", 92],
                  ["Education", 79],
                  ["Healthcare", 77],
                  ["Water & Sanitation", 74],
                  ["Digital Connectivity", 65],
                ].map(([label, value]) => (
                  <div key={label} className="score-line">
                    <span>{label}</span>
                    <div className="score-track"><div className="score-fill" style={{ width: `${value}%` }} /></div>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">AI insight</div>
                <h3 className="panel-title">Pattern summary</h3>
              </div>
            </div>
            <div style={{ padding: 20, lineHeight: 1.8, color: "var(--muted-foreground)" }}>
              {insights.map((insight) => (
                <p key={insight}>{insight}</p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
