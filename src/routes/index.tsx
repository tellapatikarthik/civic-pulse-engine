import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Building2, Globe2, Mic, Sparkles, Users } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <AppShell>
      <main className="page-wrap" style={{ paddingTop: 28 }}>
        <section style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center" }}>
          <div>
            <div className="eyebrow">Digital Public Good • BRICS Innovation challenge</div>
            <h1 className="title" style={{ fontSize: "clamp(40px, 5vw, 66px)", marginTop: 12 }}>CivicPulse AI</h1>
            <p style={{ fontSize: 20, color: "var(--muted-foreground)", maxWidth: 700, lineHeight: 1.6 }}>
              Listen Better. Prioritize Better. Measure Better.
            </p>
            <p style={{ maxWidth: 700, color: "var(--muted-foreground)", lineHeight: 1.8, marginTop: 10 }}>
              Turning millions of fragmented citizen voices into transparent, evidence-based development priorities.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 26 }}>
              <Link to="/citizen" className="primary-button">
                Try Citizen Experience <ArrowRight size={16} />
              </Link>
              <Link to="/policy" className="secondary-button">
                Open Policy Command Center
              </Link>
              <Link to="/how-it-works" className="ghost-button">
                Explore How It Works
              </Link>
            </div>
            <div style={{ marginTop: 26, display: "flex", gap: 16, flexWrap: "wrap", color: "var(--muted-foreground)", fontSize: 12 }}>
              <span><Globe2 size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Multilingual</span>
              <span><Sparkles size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Explainable AI</span>
              <span><Building2 size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Public-data informed</span>
            </div>
          </div>

          <div className="section-panel" style={{ padding: 20 }}>
            <div className="eyebrow">Flow</div>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {[
                "Citizen Voice",
                "Gemini AI",
                "Public Data",
                "Demand Hotspots",
                "Project Recommendations",
                "Measured Impact",
              ].map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 10,
                    background: index % 2 === 0 ? "var(--secondary)" : "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 8,
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ fontWeight: 700 }}>{item}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 12,
                background: "oklch(0.97 0.028 155)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 6 }}>
                Prototype for the BRICS Innovation challenge.
              </div>
              <div style={{ fontWeight: 700 }}>
                Built as a Digital Public Good concept — not a real government deployment.
              </div>
            </div>
          </div>
        </section>

        <section className="flow-strip" style={{ marginTop: 34 }}>
          {[
            ["01", "LISTEN", "Voice, text and messaging"],
            ["02", "PRIORITIZE", "AI understanding + public data"],
            ["03", "ACT", "Evidence-backed recommendations"],
            ["04", "MEASURE", "Track outcomes and feedback"],
          ].map(([num, label, text]) => (
            <div key={num} className="flow-step">
              <small>{num}</small>
              {label}
              <small>{text}</small>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 42 }}>
          <div className="page-heading">
            <div>
              <div className="eyebrow">Why it matters</div>
              <h2 className="title" style={{ fontSize: 30 }}>A civic intelligence layer for public decision-making</h2>
            </div>
          </div>
          <div className="evidence-grid">
            {[
              {
                icon: Users,
                title: "Millions of voices",
                text: "Converts fragmented citizen input into structured demand signals.",
              },
              {
                icon: Mic,
                title: "Multilingual",
                text: "Understands Telugu, English, Hindi, and other regional languages with structured translation.",
              },
              {
                icon: BarChart3,
                title: "Transparent scoring",
                text: "Makes demand, infrastructure, and impact factors visible to human decision-makers.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="evidence-card">
                <Icon size={22} color="var(--primary)" />
                <h3 style={{ margin: "12px 0 6px", fontSize: 18 }}>{title}</h3>
                <p style={{ margin: 0, color: "var(--muted-foreground)", lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
