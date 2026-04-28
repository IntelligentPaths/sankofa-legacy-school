"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Portal from "@/components/Portal";
import PageShell from "@/components/PageShell";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { FadeIn, useHasMounted } from "@/lib/motion";
import { hasSeenPortal, markPortalSeen } from "@/lib/portal";
import { images } from "@/lib/images";

/* ── Homepage
 *
 * Dark / atmospheric. Hosts the portal sequence on first visit.
 * Pillars are reduced to a 2x2 teaser linking to /approach#anchor.
 * No Akan proverb (lives nowhere now).
 * ──────────────────────────────────────────────────────────────── */

type Pillar = {
  number: string;
  name: string;
  summary: string;
  anchor: string;
  variant: 1 | 2 | 3 | 4;
  accent: string;
};

const PILLARS_TEASER: Pillar[] = [
  {
    number: "01",
    name: "Mastery",
    summary:
      "Deep competence in core academic domains — reasoning, not memorization. Students don’t just learn — they understand and can explain their thinking.",
    anchor: "/approach#mastery",
    variant: 1,
    accent: "var(--gold-primary)",
  },
  {
    number: "02",
    name: "Identity",
    summary:
      "A strong sense of self grounded in cultural literacy and historical awareness. Students learn who they are, where they come from, and how they move in the world.",
    anchor: "/approach#identity",
    variant: 2,
    accent: "var(--rust)",
  },
  {
    number: "03",
    name: "Creation",
    summary:
      "Knowledge applied — building, designing, and producing meaningful work. Students create real projects — not just complete assignments.",
    anchor: "/approach#creation",
    variant: 3,
    accent: "var(--gold-warm)",
  },
  {
    number: "04",
    name: "Community",
    summary:
      "Responsibility toward others — leading, collaborating, contributing. Students lead, work together, and give back every day.",
    anchor: "/approach#community",
    variant: 4,
    accent: "var(--gold-deep)",
  },
];

/* ── Why Sankofa: three categories with two supporting points each ── */
type WhyGroup = {
  category: string;
  points: string[];
  accent: string;
};

const WHY_GROUPS: WhyGroup[] = [
  {
    category: "Learning & Progress",
    accent: "var(--gold-primary)",
    points: [
      "Small by design — your child is known, seen, and supported every day.",
      "Personalized progress — your child moves forward when they’re ready, not when the class moves on.",
    ],
  },
  {
    category: "Experience & Application",
    accent: "var(--gold-warm)",
    points: [
      "Hands-on learning across every subject — thinking, building, and solving instead of worksheets.",
      "Real-world skills that stick — communication, problem-solving, and independence for life.",
    ],
  },
  {
    category: "Identity & Leadership",
    accent: "var(--rust)",
    points: [
      "Leadership from day one — students don’t wait their turn to lead.",
      "Culture and global perspective built into daily learning — not added on.",
    ],
  },
];

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const kicker: React.CSSProperties = {
  color: "var(--gold-primary)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 500,
  margin: 0,
};

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

  // Pre-mount: render a near-black solid so first paint matches portal bg
  if (!hasMounted) {
    return <div style={{ minHeight: "100vh", background: "var(--near-black)" }} />;
  }
  if (!portalDone) {
    return <Portal onComplete={handlePortalComplete} />;
  }

  return (
    <PageShell bg="dark">
      <main>
        {/* ══ HERO ══ */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            padding: "3rem 1.5rem 5rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* SEO h1 — visually hidden because the wordmark logo IS the headline */}
          <h1 style={visuallyHidden}>
            Sankofa Legacy School — K–5 Microschool in South Fort Worth
          </h1>

          <FadeIn delay={0.1}>
            <p style={kicker}>Founding Cohort · August 2026</p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <img
              src="/logos/sankofa-logo-full.svg"
              alt="Sankofa Legacy School"
              style={{
                width: "min(80vw, 480px)",
                height: "auto",
                display: "block",
                background: "transparent",
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.45))",
              }}
            />
          </FadeIn>

          <FadeIn delay={0.5}>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(1.3rem, 2.6vw, 1.85rem)",
                color: "var(--text-primary)",
                maxWidth: "30ch",
                lineHeight: 1.4,
                margin: 0,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Building scholars, leaders, and legacy-makers.
            </p>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                color: "var(--text-secondary)",
                maxWidth: "52ch",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              A small, intentional K–5 microschool in South Fort Worth offering
              rigorous academics, cultural grounding, and project-based learning.
            </p>
          </FadeIn>

          <FadeIn delay={0.9}>
            <Link
              href="/admissions"
              className="font-body"
              style={{
                marginTop: "0.5rem",
                padding: "14px 32px",
                background:
                  "linear-gradient(135deg, var(--gold-primary), var(--gold-warm))",
                color: "var(--near-black)",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                borderRadius: 2,
                boxShadow: "0 4px 32px rgba(251,205,50,0.25)",
                display: "inline-block",
              }}
            >
              Join the Founding Cohort
            </Link>
          </FadeIn>
        </section>

        {/* ══ HERO SECONDARY — brand-pattern panel with overlay quote ══ */}
        <section
          style={{
            padding: "2rem 1.5rem 6rem",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                borderRadius: 4,
                boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
              }}
            >
              <Image
                src={images.heroSecondary}
                alt="Students learning together at Sankofa Legacy School"
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 30%, rgba(28,27,32,0.78))",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2.5rem",
                  left: "2.5rem",
                  right: "2.5rem",
                  color: "var(--text-primary)",
                }}
              >
                <p
                  className="font-display italic"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                    lineHeight: 1.3,
                    maxWidth: "32ch",
                    margin: 0,
                  }}
                >
                  Where your child is known, challenged, and prepared — for
                  school, for life, and for who they are becoming.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ══ FOUR PILLARS — 2x2 teaser ══ */}
        <section
          style={{ padding: "5rem 1.5rem", maxWidth: 1180, margin: "0 auto" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={kicker}>Our Approach</p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  color: "var(--text-primary)",
                  margin: "1rem 0 1rem",
                  fontWeight: 600,
                }}
              >
                Four pillars. One purpose.
              </h2>
              <p
                className="font-body"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  maxWidth: "54ch",
                  margin: "0 auto",
                }}
              >
                We build scholars who are capable, grounded, and ready —
                through four disciplines woven into every day.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {PILLARS_TEASER.map((p) => (
                <Link
                  key={p.anchor}
                  href={p.anchor}
                  className="group"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    background: "rgba(251,205,50,0.04)",
                    border: "1px solid rgba(251,205,50,0.18)",
                    borderRadius: 6,
                    padding: "1.5rem",
                    transition:
                      "transform 0.25s, border-color 0.25s, box-shadow 0.25s, background 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor =
                      "rgba(251,205,50,0.55)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(251,205,50,0.12)";
                    e.currentTarget.style.background =
                      "rgba(251,205,50,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(251,205,50,0.18)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(251,205,50,0.04)";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      overflow: "hidden",
                      borderRadius: 4,
                      border: "1px solid rgba(251,205,50,0.18)",
                    }}
                  >
                    <Image
                      src={
                        images.pillars[
                          p.name.toLowerCase() as keyof typeof images.pillars
                        ]
                      }
                      alt={`Sankofa students embodying the ${p.name} pillar`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1180px) 50vw, 290px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "2.4rem",
                      lineHeight: 1,
                      color: p.accent,
                      opacity: 0.55,
                      margin: "1rem 0 0.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {p.number}
                  </p>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--text-primary)",
                      margin: "0 0 0.6rem",
                      fontWeight: 600,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {p.summary}
                  </p>
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link
                href="/approach"
                className="font-body"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  border: "1px solid var(--gold-primary)",
                  color: "var(--gold-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  borderRadius: 2,
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gold-primary)";
                  e.currentTarget.style.color = "var(--near-black)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--gold-primary)";
                }}
              >
                See how Sankofa actually works →
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* ══ SANKOFA MEANING ══ */}
        <section
          style={{
            padding: "5rem 1.5rem",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <p style={kicker}>The Meaning of Sankofa</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(1.4rem, 3.2vw, 2rem)",
                color: "var(--text-primary)",
                lineHeight: 1.45,
                margin: "2rem 0 0",
                fontWeight: 500,
              }}
            >
              <em style={{ color: "var(--gold-primary)" }}>Sankofa</em> is an
              Adinkra concept from the Akan people of Ghana — meaning{" "}
              <em>&lsquo;go back and fetch it.&rsquo;</em> The bird moves
              forward while looking back, using the wisdom of the past to
              build what comes next.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, var(--gold-primary), transparent)",
                }}
              />
            </div>
          </FadeIn>
        </section>

        {/* ══ WHY SANKOFA — three categories with two supporting points each ══ */}
        <section
          style={{
            padding: "5rem 1.5rem",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={kicker}>Why Sankofa</p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "var(--text-primary)",
                  margin: "1rem 0 0",
                  fontWeight: 600,
                }}
              >
                A different kind of elementary school
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2.5rem",
              }}
            >
              {WHY_GROUPS.map((group) => (
                <div
                  key={group.category}
                  style={{
                    paddingLeft: "1.25rem",
                    borderLeft: `2px solid ${group.accent}`,
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.25rem, 2.4vw, 1.6rem)",
                      color: group.accent,
                      margin: "0 0 1.25rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {group.category}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {group.points.map((point, i) => (
                      <li
                        key={i}
                        className="font-body"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══ INTEREST FORM ══ */}
        <section
          id="interest"
          style={{
            padding: "5rem 1.5rem 6rem",
            maxWidth: 620,
            margin: "0 auto",
            scrollMarginTop: "6rem",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={kicker}>Founding Cohort</p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "var(--text-primary)",
                  margin: "1rem 0 0.75rem",
                  fontWeight: 600,
                }}
              >
                Join the interest list
              </h2>
              <p
                className="font-body"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  maxWidth: "44ch",
                  margin: "0 auto",
                }}
              >
                Enrollment is limited by design. We&rsquo;re building a
                small, intentional community of families for our first year.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              style={{
                padding: "2.5rem",
                background: "var(--cream)",
                border: "1px solid rgba(251,205,50,0.3)",
                borderRadius: 4,
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                color: "var(--near-black)",
              }}
            >
              <InterestForm />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="font-body"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                textAlign: "center",
                margin: "1.5rem 0 0",
                lineHeight: 1.55,
              }}
            >
              We&rsquo;ll follow up within 24–48 hours with next steps.
            </p>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
