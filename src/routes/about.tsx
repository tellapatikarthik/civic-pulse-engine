import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">About CivicPulse AI</div>
            <h1 className="title">A prototype for civic intelligence and transparent action</h1>
          </div>
        </div>

        <div className="dashboard-grid">
          {[
            { title: "Multilingual", text: "Works across linguistic regions and supports local language communication without losing context." },
            { title: "Interoperable", text: "Structured APIs and open data patterns allow country-specific data layers to be plugged in." },
            { title: "Transparent", text: "Recommendations explain their evidence, weights, and underlying public-data assumptions." },
            { title: "Human-in-the-loop", text: "AI supports decisions; public authorities remain accountable for final choices." },
          ].map((item) => (
            <div key={item.title} className="section-panel">
              <div className="panel-head">
                <h3 className="panel-title">{item.title}</h3>
              </div>
              <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
