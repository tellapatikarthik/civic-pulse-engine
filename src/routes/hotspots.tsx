import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getDemoState } from "@/lib/demo-data";

export const Route = createFileRoute("/hotspots")({
  component: HotspotsPage,
});

function HotspotsPage() {
  const hotspots = getDemoState().hotspots;

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Demand hotspots</div>
            <h1 className="title">Regional demand concentrations</h1>
          </div>
          <Link to="/recommendations" className="primary-button">Open recommendations</Link>
        </div>

        <div className="dashboard-grid">
          <div className="section-panel">
            <div className="map-area">
              <div className="map-grid" />
              <div className="map-river" />
              {hotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className={`map-pin ${index % 2 === 0 ? "medium" : ""}`}
                  style={{ left: `${18 + index * 10}%`, top: `${24 + (index % 4) * 15}%` }}
                >
                  <span />
                </div>
              ))}
              <div className="map-legend">
                <span><span className="legend-dot" />High priority</span>
                <span><span className="legend-dot mid" />Monitoring</span>
              </div>
            </div>
          </div>

          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Hotspot detail</div>
                <h3 className="panel-title">Hotspot #07 — Rural Road Access</h3>
              </div>
            </div>
            <div style={{ padding: 20, lineHeight: 1.8, color: "var(--muted-foreground)" }}>
              <div><strong style={{ color: "var(--foreground)" }}>2,430 related requests</strong></div>
              <div>Priority: 91 / 100</div>
              <div>Affected population: 2,800</div>
              <div>Infrastructure: 42 / 100</div>
              <div>School access affected: Yes</div>
              <div>Active conflicting project: No</div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
