import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getDemoState } from "@/lib/demo-data";

export const Route = createFileRoute("/recommendations")({
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const recommendations = getDemoState().recommendations;

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Recommendations</div>
            <h1 className="title">Project candidates</h1>
          </div>
        </div>

        <div className="section-panel">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Region</th>
                  <th>Category</th>
                  <th>Demand</th>
                  <th>Infrastructure Gap</th>
                  <th>Population Impact</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((item) => (
                  <tr key={item.id}>
                    <td><Link to="/projects/$projectId" params={{ projectId: item.id }} style={{ color: "var(--primary)", fontWeight: 700 }}>{item.project_name}</Link></td>
                    <td>{item.region}</td>
                    <td>{item.category}</td>
                    <td>{item.request_count.toLocaleString()} requests</td>
                    <td>{item.infrastructure_gap_score}/100</td>
                    <td>{item.population_affected.toLocaleString()} affected</td>
                    <td>{item.priority_score}/100</td>
                    <td><span className="status-pill review">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
