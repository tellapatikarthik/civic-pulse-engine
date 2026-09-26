import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getAuditTrail } from "@/lib/demo-data";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
});

function AuditPage() {
  const audits = getAuditTrail();

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Audit log</div>
            <h1 className="title">Recommendation transparency</h1>
          </div>
        </div>

        <div className="section-panel">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Explanation</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((item) => (
                  <tr key={item.id}>
                    <td>{item.action}</td>
                    <td>{item.entity_type}</td>
                    <td>{item.explanation}</td>
                    <td>{new Date(item.created_at).toLocaleDateString("en-GB")}</td>
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
