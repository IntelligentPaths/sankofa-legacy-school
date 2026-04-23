"use client";

import Atmosphere from "@/components/Atmosphere";
import SankofaHexagon from "@/components/SankofaHexagon";

/* ── home (placeholder) ── */
export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── atmosphere layer ── */}
      <div className="fixed inset-0 z-0">
        <Atmosphere />
      </div>

      {/* ── texture overlay ── */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 3px, rgba(251,205,50,0.015) 3px 4px)",
        }}
      />

      {/* ── content ── */}
      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center gap-8 px-6">
        <SankofaHexagon size={280} />
        <h1
          className="font-display text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--text-primary)",
          }}
        >
          Sankofa Legacy School
        </h1>
        <p
          className="font-body text-center"
          style={{
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          Portal under construction
        </p>
      </main>
    </div>
  );
}
