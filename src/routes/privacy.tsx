import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Privacy by design</div>
            <h1 className="title">Minimal, secure and auditable</h1>
          </div>
        </div>

        <div className="dashboard-grid">
          {[
            "Data minimization and role-based access to avoid unnecessary personal information.",
            "Separation of citizen identity from analytical records whenever possible.",
            "Server-side AI calls with environment variables and no API keys in frontend code.",
            "Audit logging for recommendation generation and status updates.",
          ].map((item) => (
            <div key={item} className="section-panel">
              <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item}</div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
