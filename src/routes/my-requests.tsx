import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getDemoState } from "@/lib/demo-data";

export const Route = createFileRoute("/my-requests")({
  component: MyRequestsPage,
});

function MyRequestsPage() {
  const requests = getDemoState().requests.slice(0, 5);

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Citizen tracking</div>
            <h1 className="title">My Request</h1>
          </div>
        </div>

        <div className="recommendation-detail">
          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Original request</div>
                <h3 className="panel-title">Telugu citizen message</h3>
              </div>
            </div>
            <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>
              {requests[0]?.original_text || "వర్షం పడిన తర్వాత మా గ్రామ రహదారి చాలా దారుణంగా మారుతోంది. స్కూల్ బస్సు పిల్లలను సురక్షితంగా తీసుకెళ్లలేకపోతోంది."}
            </div>
          </div>

          <div className="section-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">AI understanding</div>
                <h3 className="panel-title">Structured insight</h3>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div className="understanding-grid">
                <div className="understanding-field"><label>Language</label><strong>Telugu</strong></div>
                <div className="understanding-field"><label>Issue</label><strong>Damaged rural road</strong></div>
                <div className="understanding-field"><label>Category</label><strong>Roads & Transport</strong></div>
                <div className="understanding-field"><label>Urgency</label><strong>High</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-panel" style={{ marginTop: 24 }}>
          <div className="panel-head">
            <div>
              <div className="eyebrow">Lifecycle</div>
              <h3 className="panel-title">Request progress</h3>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div className="timeline">
              {[
                ["Analyzed", "AI processed the citizen voice and extracted issue details."],
                ["Grouped into demand hotspot", "Matched to the active rural road access hotspot."],
                ["Included in project recommendation", "Recommendation surfaced for a funding and planning review."],
                ["Policy review", "Reviewed by human decision-makers for planning approval."],
                ["Implementation", "Project enters implementation and engineering review."],
                ["Impact measured", "Outcome metrics are tracked after delivery."],
              ].map(([title, text], index) => (
                <div key={title} className={`timeline-item ${index > 0 ? "pending" : ""}`}>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
