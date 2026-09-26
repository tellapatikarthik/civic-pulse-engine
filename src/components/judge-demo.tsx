import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CircleArrowLeft, CircleArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";

const scenes = [
  "Citizen opens the mobile app.",
  "Selects Telugu.",
  "Taps Speak.",
  "Uses the sample Telugu request.",
  "Gemini understands the request.",
  "The system combines citizen demand with public data.",
  "A demand hotspot appears.",
  "A project recommendation appears.",
  "Click: Why this project?",
  "Show evidence.",
  "Open the policymaker dashboard.",
  "Show recommendation entering human review.",
  "Show project lifecycle.",
  "Show before/after impact.",
  "Return to Listen → Prioritize → Act → Measure.",
];

export function JudgeDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("demo") === "judge") {
      setIsOpen(true);
    }
  }, []);

  const progress = useMemo(() => ((index + 1) / scenes.length) * 100, [index]);

  const goToNext = () => setIndex((current) => Math.min(current + 1, scenes.length - 1));
  const goToPrevious = () => setIndex((current) => Math.max(current - 1, 0));
  const reset = () => setIndex(0);

  if (!isOpen) {
    return (
      <button
        className="nav-link active"
        onClick={() => setIsOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", marginLeft: 8 }}
      >
        🎬 Judge Demo Mode
      </button>
    );
  }

  return (
    <div className="demo-overlay" role="dialog" aria-modal="true" aria-label="Judge demonstration">
      <div className="demo-modal">
        <div className="eyebrow" style={{ letterSpacing: "1.8px" }}>Demo walkthrough</div>
        <h3 style={{ fontSize: 26, margin: "10px 0 2px" }}>CivicPulse AI — Judge Demo</h3>
        <div className="demo-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div style={{ fontSize: 14, color: "var(--muted-foreground)" }}>Demo {index + 1}/{scenes.length}</div>
        <div style={{ marginTop: 16, padding: 18, border: "1px solid var(--border)", borderRadius: 10, background: "var(--muted)" }}>
          <strong style={{ fontSize: 20, display: "block" }}>{scenes[index]}</strong>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted-foreground)" }}>
            The sequence is designed to show how a citizen request becomes a hotspot, a recommendation, and a measured impact outcome.
          </div>
        </div>
        <div className="demo-controls">
          <button className="secondary-button" onClick={goToPrevious}>
            <CircleArrowLeft size={16} style={{ marginRight: 6 }} /> Previous
          </button>
          <button className="primary-button" onClick={goToNext}>
            Next <CircleArrowRight size={16} style={{ marginLeft: 6 }} />
          </button>
        </div>
        <div className="demo-controls" style={{ justifyContent: "space-between" }}>
          <button className="secondary-button" onClick={reset}>
            <RotateCcw size={16} style={{ marginRight: 6 }} /> Restart Demo
          </button>
          <Link to="/citizen" className="primary-button" onClick={() => setIsOpen(false)}>
            Open live app <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
