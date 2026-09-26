import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/impact")({
  component: ImpactPage,
});

function ImpactPage() {
  const outcomes = [
    { label: "Road accessibility", before: 42, after: 68, change: "+26" },
    { label: "School access", before: 62, after: 92, change: "+30" },
    { label: "Citizen satisfaction", before: 3.1, after: 4.6, change: "+1.5" },
  ];

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Impact measurement</div>
            <h1 className="title">Before vs After</h1>
            <p className="subtitle">Illustrative demo outcome data.</p>
          </div>
        </div>

        <div className="impact-grid">
          {outcomes.map((metric) => (
            <div key={metric.label} className="impact-metric">
              <div className="eyebrow">{metric.label}</div>
              <div className="metric-values">
                <strong>{metric.before}</strong>
                <span className="metric-arrow">→</span>
                <strong>{metric.after}</strong>
              </div>
              <div style={{ color: "var(--muted-foreground)", fontSize: 12 }}>Change: {metric.change}</div>
            </div>
          ))}
        </div>

        <div className="section-panel" style={{ marginTop: 26 }}>
          <div className="panel-head">
            <div>
              <div className="eyebrow">Impact loop</div>
              <h3 className="panel-title">Listen → Prioritize → Act → Measure</h3>
            </div>
          </div>
          <div className="flow-strip" style={{ margin: 18 }}>
            {[
              ["01", "Listen"],
              ["02", "Prioritize"],
              ["03", "Act"],
              ["04", "Measure"],
            ].map(([number, label]) => (
              <div key={number} className="flow-step">
                <small>{number}</small>
                {label}
              </div>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
