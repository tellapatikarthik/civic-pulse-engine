import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getDemoState } from "@/lib/demo-data";

export const Route = createFileRoute("/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  const requests = getDemoState().requests.slice(0, 12);

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Citizen requests</div>
            <h1 className="title">Request intake and analysis</h1>
          </div>
        </div>

        <div className="section-panel">
          <div className="filter-bar">
            <select className="filter-select" defaultValue="India"><option>India</option></select>
            <select className="filter-select" defaultValue="Roads & Transport"><option>Roads & Transport</option></select>
            <select className="filter-select" defaultValue="High"><option>High</option></select>
            <select className="filter-select" defaultValue="Telugu"><option>Telugu</option></select>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Language</th>
                  <th>Urgency</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.location}</td>
                    <td>{request.category}</td>
                    <td>{request.language}</td>
                    <td>{request.urgency}</td>
                    <td><span className="status-pill">{request.status}</span></td>
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
