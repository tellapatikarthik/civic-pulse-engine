import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">How it works</div>
            <h1 className="title">Listen → Prioritize → Act → Measure</h1>
          </div>
        </div>

        <div className="flow-strip">
          {[
            ["01", "LISTEN", "Voice, text and messaging"],
            ["02", "PRIORITIZE", "AI understanding + context"],
            ["03", "ACT", "Evidence-backed investment decisions"],
            ["04", "MEASURE", "Impact after implementation"],
          ].map(([num, label, text]) => (
            <div key={num} className="flow-step">
              <small>{num}</small>
              {label}
              <small>{text}</small>
            </div>
          ))}
        </div>

        <div className="dashboard-grid" style={{ marginTop: 26 }}>
          {[
            {
              title: "01 — LISTEN",
              copy: "Citizen requests arrive as voice notes, text entries, or messaging channel drafts in local languages.",
            },
            {
              title: "02 — PRIORITIZE",
              copy: "Gemini identifies language, urgency, issues, and similar requests. Public data adds location and infrastructure context.",
            },
            {
              title: "03 — ACT",
              copy: "Demand hotspots become recommendation candidates and are reviewed by a human policymaker for planning and approval.",
            },
            {
              title: "04 — MEASURE",
              copy: "Implemented projects are linked to outcome metrics like road access, service coverage, and citizen satisfaction.",
            },
          ].map((item) => (
            <div key={item.title} className="section-panel">
              <div className="panel-head">
                <div>
                  <div className="eyebrow">{item.title}</div>
                  <h3 className="panel-title">{item.title.split("— ")[1]}</h3>
                </div>
              </div>
              <div style={{ padding: 20, lineHeight: 1.8, color: "var(--muted-foreground)" }}>{item.copy}</div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
