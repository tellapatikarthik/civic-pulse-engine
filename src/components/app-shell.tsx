import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { JudgeDemoModal } from "@/components/judge-demo";

const publicLinks = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Languages", to: "/languages" },
  { label: "About", to: "/about" },
];

const citizenLinks = [
  { label: "Citizen Home", to: "/citizen" },
  { label: "Submit Request", to: "/citizen" },
  { label: "My Requests", to: "/my-requests" },
  { label: "Track Impact", to: "/impact" },
];

const policymakerLinks = [
  { label: "Overview", to: "/policy" },
  { label: "Requests", to: "/requests" },
  { label: "Hotspots", to: "/hotspots" },
  { label: "Recommendations", to: "/recommendations" },
  { label: "Projects", to: "/projects/rec-01" },
  { label: "Impact", to: "/impact" },
  { label: "Data", to: "/data" },
  { label: "Audit", to: "/audit" },
];

const demoLinks = [{ label: "Judge Demo", to: "/citizen" }];

function isActive(pathname: string, target: string) {
  return pathname === target || (target !== "/" && pathname.startsWith(target));
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" className="brand">
            <span className="brand-mark">C</span>
            CivicPulse AI
          </Link>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {publicLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-link ${isActive(location.pathname, link.to) ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
          <span style={{ color: "var(--muted-foreground)", margin: "0 8px", fontWeight: 700 }}>Citizen</span>
          {citizenLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-link ${isActive(location.pathname, link.to) ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
          <span style={{ color: "var(--muted-foreground)", margin: "0 8px", fontWeight: 700 }}>Policymaker</span>
          {policymakerLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-link ${isActive(location.pathname, link.to) ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="top-actions">
          <span className="demo-badge">
            <ShieldCheck size={12} />
            Demo Environment • Synthetic Data
          </span>
          <JudgeDemoModal />
          <Link to="/citizen" className="nav-link active" style={{ display: "inline-flex", alignItems: "center" }}>
            Try Citizen Experience <ArrowRight size={14} style={{ marginLeft: 6 }} />
          </Link>
        </div>
      </header>

      {children}

      <footer style={{ padding: "18px 24px 40px", color: "var(--muted-foreground)", fontSize: 12, borderTop: "1px solid var(--border)", background: "var(--card)" }}>
        <div className="page-wrap" style={{ paddingTop: 24, paddingBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CheckCircle2 size={14} />
              CivicPulse AI — Prototype for the BRICS Innovation challenge.
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {demoLinks.map((link) => (
                <Link key={link.to} to={link.to} style={{ color: "var(--primary)", fontWeight: 700 }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
