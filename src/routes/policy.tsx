import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { DEMO_HOTSPOTS, getDashboardOverview, getDemoState } from "@/lib/demo-data";

export const Route = createFileRoute("/policy")({
  component: PolicyPage,
});

function PolicyPage() {
  const overview = getDashboardOverview();
  const state = getDemoState();
  const hotspotList = state.hotspots.slice(0, 5);

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Policymaker dashboard</div>
            <h1 className="title">CivicPulse AI — Policy Command Center</h1>
            <p className="subtitle">From citizen voice to measurable public impact.</p>
          </div>
        </div>

        <div className="kpi-grid">
          {[
            ["Total citizen requests", `${overview.totalRequests.toLocaleString()}`],
            ["Requests analyzed", `${overview.analyzedRequests.toLocaleString()}`],
            ["Active hotspots", `${overview.activeHotspots}`],
            ["High-priority projects", `${overview.highPriorityProjects}`],
            ["Population potentially affected", `${overview.populationAffected.toLocaleString()}`],
            ["Projects under implementation", `${overview.projectsImplementation}`],
          ].map(([label, value]) => (
            <div key={label} className="kpi">
              <div className="kpi-label">{label}</div>
              <div className="kpi-value">{value}</div>
              <div className="kpi-note">Synthetic demo data • not a real government production dataset</div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Demand hotspots</div>
                <h3 className="panel-title">Regional demand pressure</h3>
              </div>
            </div>
            <div className="map-area">
              <div className="map-grid" />
              <div className="map-river" />
              <div className="map-pin" style={{ left: "19%", top: "42%" }}><span /></div>
              <div className="map-pin medium" style={{ left: "50%", top: "31%" }}><span /></div>
              <div className="map-pin" style={{ left: "62%", top: "54%" }}><span /></div>
              <div className="map-pin medium" style={{ left: "72%", top: "30%" }}><span /></div>
              <div className="map-legend">
                <span><span className="legend-dot" />High priority</span>
                <span><span className="legend-dot mid" />Medium priority</span>
              </div>
              <div className="map-label" style={{ left: "12%", top: "20%" }}>Andhra Pradesh</div>
              <div className="map-label" style={{ left: "65%", top: "68%" }}>Tamil Nadu</div>
            </div>
            <div className="hotspot-list">
              {hotspotList.map((hotspot) => (
                <button key={hotspot.id} className="hotspot-row" type="button" onClick={() => {}}>
                  <span className="hotspot-icon">{hotspot.priority_score}</span>
                  <span>
                    <span className="hotspot-name">{hotspot.name}</span>
                    <span className="hotspot-meta">{hotspot.region} — {hotspot.request_count.toLocaleString()} related requests</span>
                  </span>
                  <span className="hotspot-score">{hotspot.priority_score}<small>priority</small></span>
                </button>
              ))}
            </div>
          </div>

          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Recommendations</div>
                <h3 className="panel-title">Project candidate pipeline</h3>
              </div>
              <Link to="/recommendations" className="secondary-button">Open all</Link>
            </div>
            <div>
              {state.recommendations.slice(0, 4).map((recommendation) => (
                <div key={recommendation.id} className="recommendation-row">
                  <div>
                    <div style={{ fontWeight: 700 }}>{recommendation.project_name}</div>
                    <div style={{ color: "var(--muted-foreground)", fontSize: 11 }}>{recommendation.region}</div>
                  </div>
                  <div className="status-pill review">{recommendation.status}</div>
                  <div className="priority-chip">{recommendation.priority_score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
