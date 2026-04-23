"use client";

import { useState, useEffect } from "react";
import Atmosphere from "@/components/Atmosphere";
import Portal from "@/components/Portal";
import CornerHex from "@/components/CornerHex";
import SankofaHexagon from "@/components/SankofaHexagon";
import { FadeIn, useHasMounted } from "@/lib/motion";
import { hasSeenPortal, markPortalSeen } from "@/lib/portal";

export default function HomePage() {
  const hasMounted = useHasMounted();
  const [portalDone, setPortalDone] = useState(false);

  useEffect(() => {
    if (hasSeenPortal()) setPortalDone(true);
  }, []);

  const handlePortalComplete = () => {
    markPortalSeen();
    setPortalDone(true);
  };

  // Prevent SSR flash — render solid bg until mounted
  if (!hasMounted) {
    return <div style={{ minHeight: "100vh", background: "var(--bg)" }} />;
  }

  if (!portalDone) {
    return <Portal onComplete={handlePortalComplete} />;
  }

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="fixed inset-0 z-0">
        <Atmosphere />
      </div>
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 3px, rgba(251,205,50,0.015) 3px 4px)",
        }}
      />
      <CornerHex />
      <main className="relative z-20">
        {/* ── hero ── */}
        <section className="min-h-screen flex flex-col items-center justify-center gap-7 px-6 text-center relative">
          <FadeIn delay={0.1}>
            <SankofaHexagon size={140} uniqueId="hero" />
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="font-body"
              style={{
                color: "var(--gold-primary)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: 500,
              }}
            >
              Founding Cohort · August 2026
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "var(--text-primary)",
                maxWidth: "18ch",
                margin: 0,
              }}
            >
              Sankofa Legacy School
            </h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "var(--text-secondary)",
                maxWidth: "52ch",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              A small, intentional K–5 microschool in South Fort Worth building scholars,
              leaders, and legacy-makers — through rigorous academics, cultural grounding,
              and project-based learning.
            </p>
          </FadeIn>
          <FadeIn delay={0.9}>
            <a
              href="#interest"
              className="font-body"
              style={{
                marginTop: "0.5rem",
                padding: "14px 32px",
                background:
                  "linear-gradient(135deg, var(--gold-primary), var(--gold-warm))",
                color: "var(--near-black)",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                borderRadius: 2,
                boxShadow: "0 4px 32px rgba(251,205,50,0.25)",
                display: "inline-block",
              }}
            >
              Join the Founding Cohort
            </a>
          </FadeIn>
          <FadeIn delay={1.1}>
            <p
              className="font-display italic"
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                marginTop: "2rem",
                maxWidth: "44ch",
                lineHeight: 1.6,
              }}
            >
              &ldquo;Se wo were fi na wosankofa a yenkyi.&rdquo;
              <br />
              <span style={{ fontSize: "0.82rem" }}>
                — It is not wrong to go back for that which you have forgotten.
              </span>
            </p>
          </FadeIn>
          {/* scroll indicator */}
          <FadeIn delay={1.5}>
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                color: "var(--text-muted)",
                fontSize: "0.62rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </div>
          </FadeIn>
        </section>
        {/* placeholder for sections coming in Prompt 3 */}
        <section style={{ minHeight: "150vh" }} />
      </main>
    </div>
  );
}
