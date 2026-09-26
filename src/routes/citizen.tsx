import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, CirclePlay, Mic, MessageSquareText, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { analyzeCitizenText, createCitizenSubmission, getDemoState } from "@/lib/demo-data";

const demoText = "వర్షం పడిన తర్వాత మా గ్రామ రహదారి చాలా దారుణంగా మారుతోంది. స్కూల్ బస్సు పిల్లలను సురక్షితంగా తీసుకెళ్లలేకపోతోంది.";
const languages = ["తెలుగు", "English", "हिंदी", "தமிழ்", "বাংলা", "ಕನ್ನಡ", "മലയാളം", "मराठी"] as const;

export const Route = createFileRoute("/citizen")({
  component: CitizenPage,
});

function CitizenPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("తెలుగు");
  const [requestText, setRequestText] = useState(demoText);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeCitizenText> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState<any | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setRequestText(demoText);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      stream.getTracks().forEach((track) => track.stop());
    };
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const submitRequest = () => {
    if (!requestText.trim()) {
      return;
    }

    setIsAnalyzing(true);
    const result = analyzeCitizenText(requestText, language === "తెలుగు" ? "Telugu" : language, "Example District");
    setTimeout(() => {
      setAnalysis(result);
      const submission = createCitizenSubmission({ original_text: requestText, language: result.language, location: result.location });
      setSubmitted(submission);
      setIsAnalyzing(false);
    }, 1400);
  };

  const resetDemo = () => {
    setAnalysis(null);
    setSubmitted(null);
    setRequestText(demoText);
  };

  const requestCount = getDemoState().requests.length;

  return (
    <AppShell>
      <main className="citizen-page">
        <div className="citizen-layout">
          <section className="citizen-card">
            <div className="citizen-welcome">
              <ShieldCheck size={14} />
              Demo Environment • Synthetic Data
            </div>
            <h1 className="citizen-title">Your voice. Our shared progress.</h1>
            <p className="citizen-copy">
              A multilingual citizen reporting layer that listens to local needs, identifies hotspots, and brings evidence into public decision-making.
            </p>

            <div style={{ marginTop: 18 }}>
              <div className="field-label">Select language</div>
              <div className="language-grid" aria-label="Language selection">
                {languages.map((option) => (
                  <button
                    key={option}
                    className={`language-option ${language === option ? "selected" : ""}`}
                    onClick={() => setLanguage(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {!analysis && !isAnalyzing && !submitted && (
              <>
                <button className="primary-button voice-button" type="button" onClick={startRecording}>
                  <span className="voice-disc"><Mic size={20} /></span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <strong style={{ fontSize: 18 }}>🎙 Speak your request</strong>
                    <span style={{ fontSize: 12, opacity: 0.8 }}>Voice-first citizen reporting</span>
                  </span>
                </button>

                {isRecording && (
                  <div className="recording-box">
                    <div className="recording-pulse"><Mic size={22} /></div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>Recording…</div>
                    <div className="citizen-actions" style={{ justifyContent: "center" }}>
                      <button className="secondary-button" type="button" onClick={stopRecording}>Stop recording</button>
                    </div>
                  </div>
                )}

                <div className="citizen-actions" style={{ marginTop: 16 }}>
                  <button className="secondary-button" type="button" onClick={() => setRequestText(demoText)}>
                    Try Demo Voice Request
                  </button>
                  <button className="ghost-button" type="button" onClick={() => setRequestText("The public water line keeps breaking near the school and market area.")}>
                    Type your request
                  </button>
                </div>

                <div style={{ marginTop: 18 }}>
                  <label className="field-label" htmlFor="requestText">Request details</label>
                  <textarea
                    id="requestText"
                    className="text-field"
                    value={requestText}
                    onChange={(event) => setRequestText(event.target.value)}
                    placeholder="Describe the issue in your local language..."
                  />
                </div>

                {audioUrl && (
                  <div style={{ marginTop: 18 }}>
                    <div className="field-label">Audio preview</div>
                    <audio controls src={audioUrl} style={{ width: "100%" }} />
                  </div>
                )}

                <div className="citizen-actions">
                  <button className="primary-button" type="button" onClick={submitRequest}>Submit request</button>
                  <button className="secondary-button" type="button" onClick={() => setRequestText("")}>Cancel</button>
                </div>
              </>
            )}

            {isAnalyzing && (
              <div style={{ marginTop: 24 }}>
                <div className="analysis-banner">
                  <Sparkles size={18} />
                  Gemini AI is understanding your request
                </div>
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {[
                    "Detecting language",
                    "Translating request",
                    "Extracting problem",
                    "Identifying location",
                    "Identifying affected services",
                    "Finding similar requests",
                    "Preparing public-data context",
                  ].map((step) => (
                    <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, border: "1px solid var(--border)", borderRadius: 8, background: "var(--secondary)" }}>
                      <CheckCircle2 size={16} color="var(--primary)" />
                      <span style={{ fontWeight: 600 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis && !submitted && (
              <div style={{ marginTop: 22 }}>
                <div className="analysis-banner">
                  <CheckCircle2 size={18} />
                  AI understood
                </div>
                <div className="understanding-grid">
                  <div className="understanding-field"><label>Language</label><strong>{analysis.language}</strong></div>
                  <div className="understanding-field"><label>Problem</label><strong>{analysis.issue}</strong></div>
                  <div className="understanding-field"><label>Location</label><strong>{analysis.location}</strong></div>
                  <div className="understanding-field"><label>Category</label><strong>{analysis.category}</strong></div>
                  <div className="understanding-field"><label>Urgency</label><strong>{analysis.urgency}</strong></div>
                  <div className="understanding-field"><label>Affected</label><strong>{analysis.affected_groups.join(" + ")}</strong></div>
                </div>
                <div className="citizen-actions">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => {
                      const submission = createCitizenSubmission({ original_text: requestText, language: analysis.language, location: analysis.location });
                      setSubmitted(submission);
                    }}
                  >
                    Confirm Request
                  </button>
                  <button className="secondary-button" type="button" onClick={resetDemo}>Edit details</button>
                </div>
              </div>
            )}

            {submitted && (
              <div style={{ marginTop: 24, padding: 18, border: "1px solid var(--border)", borderRadius: 12, background: "var(--secondary)" }}>
                <div className="eyebrow">Request submitted</div>
                <h3 style={{ fontSize: 26, margin: "10px 0 8px" }}>Your request is now part of a demand hotspot.</h3>
                <p style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                  {submitted.issue_summary} in {submitted.location}. This request has entered the CivicPulse AI prioritization pipeline and is being matched to the relevant hotspot and project recommendation.
                </p>
                <div className="citizen-actions" style={{ marginTop: 16 }}>
                  <Link to="/policy" className="primary-button">Open policymaker dashboard</Link>
                  <button className="secondary-button" type="button" onClick={resetDemo}>Submit another request</button>
                </div>
              </div>
            )}
          </section>

          <aside className="side-panel">
            <h3>Connect with Messaging</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { label: "WhatsApp", icon: MessageSquareText },
                { label: "SMS", icon: Volume2 },
                { label: "Telegram", icon: CirclePlay },
                { label: "Other messaging channels", icon: ShieldCheck },
              ].map(({ label, icon: Icon }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, background: "var(--muted)" }}>
                  <Icon size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
            <button className="secondary-button" type="button" style={{ marginTop: 18, width: "100%" }}>
              Try Messaging Demo
            </button>

            <div style={{ marginTop: 20 }}>
              <h3>Live demo signals</h3>
              {[
                "Language detected: Telugu",
                "Issue type: Road infrastructure",
                "Urgency: High",
                `Requests matched: ${requestCount}`,
              ].map((item, index) => (
                <div key={item} className="mini-process">
                  <span className="mini-num">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
