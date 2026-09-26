import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

const languages = [
  "English",
  "Telugu",
  "Hindi",
  "Tamil",
  "Kannada",
  "Bengali",
  "Malayalam",
  "Marathi",
];

export const Route = createFileRoute("/languages")({
  component: LanguagesPage,
});

function LanguagesPage() {
  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Language support</div>
            <h1 className="title">Multilingual by design</h1>
          </div>
        </div>

        <div className="evidence-grid">
          {languages.map((language) => (
            <div key={language} className="evidence-card" style={{ textAlign: "center" }}>
              <div className="eyebrow">Language</div>
              <h3 style={{ fontSize: 24, margin: "12px 0 0" }}>{language}</h3>
            </div>
          ))}
        </div>

        <div className="section-panel" style={{ marginTop: 28 }}>
          <div className="panel-head">
            <div>
              <div className="eyebrow">Design principle</div>
              <h3 className="panel-title">AI preserves original language and produces an English structured representation</h3>
            </div>
          </div>
          <div style={{ padding: 20, color: "var(--muted-foreground)", lineHeight: 1.8 }}>
            The original citizen language is retained for transparency and trust. The system translates and structures the message for analytics without deleting or overwriting the source language.
          </div>
        </div>
      </main>
    </AppShell>
  );
}
