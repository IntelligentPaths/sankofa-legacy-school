"use client";

import { useState, useEffect } from "react";
import Atmosphere from "@/components/Atmosphere";
import Portal from "@/components/Portal";
import CornerHex from "@/components/CornerHex";
import SankofaHexagon from "@/components/SankofaHexagon";
import PillarCard from "@/components/PillarCard";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { FadeIn, useHasMounted } from "@/lib/motion";
import { hasSeenPortal, markPortalSeen } from "@/lib/portal";
import { images } from "@/lib/images";

const PILLARS = [
  {
    number: "01",
    name: "Mastery",
    description:
      "Deep competence in core academic domains through reasoning-based learning and demonstrated understanding — not memorization. Students become capable, independent thinkers.",
    tags: [
      "math reasoning",
      "literacy & communication",
      "analytical thinking",
      "structured problem solving",
    ],
    outcome:
      "Students become capable, independent thinkers who can explain their reasoning and apply knowledge in new contexts.",
    accentColor: "var(--gold-primary)",
    imageSrc: images.pillars.mastery,
    imageAlt: "Student reading, face lit by the pages of an open book",
  },
  {
    number: "02",
    name: "Identity",
    description:
      "A strong sense of self grounded in historical awareness, cultural literacy, and personal reflection. Students understand who they are and how they relate to the broader world.",
    tags: [
      "diaspora studies",
      "cultural understanding",
      "language exposure",
      "ethical reflection",
    ],
    outcome:
      "Students understand who they are, where they come from, and how they relate to the broader world.",
    accentColor: "var(--rust)",
    imageSrc: images.pillars.identity,
    imageAlt:
      "Young student with subtle gold embroidered collar, warm portrait",
  },
  {
    number: "03",
    name: "Creation",
    description:
      "Knowledge applied through building, designing, and producing meaningful work that moves from ideas to implementation. Students learn to make things that matter.",
    tags: [
      "entrepreneurship",
      "engineering challenges",
      "design thinking",
      "project-based learning",
    ],
    outcome:
      "Students learn to move from ideas to implementation — building things that matter.",
    accentColor: "var(--gold-warm)",
    imageSrc: images.pillars.creation,
    imageAlt: "Student working with colorful craft materials on a table",
  },
  {
    number: "04",
    name: "Community",
    description:
      "Responsibility toward others — learning to lead, collaborate, and contribute in ways that strengthen collective well-being. Students see themselves as contributors, not just achievers.",
    tags: [
      "mentorship",
      "teamwork",
      "leadership",
      "service projects",
      "accountability",
    ],
    outcome: "Students see themselves as contributors, not just achievers.",
    accentColor: "var(--gold-deep)",
    imageSrc: images.pillars.community,
    imageAlt:
      "Three students together in warm directional light, receding composition",
  },
];

const DIFFERENTIATORS = [
  "Small learning environment — your child is known by name",
  "Personalized academic progress — no one left behind, no one held back",
  "Hands-on learning experiences across every subject",
  "Mentorship and leadership development from day one",
  "Cultural and global learning woven through every pillar",
  "Real-world skill building that translates beyond the classroom",
];

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
        {/* ══ HERO ══ */}
        <section
          className="min-h-screen flex flex-col items-center justify-center gap-7 px-6 text-center relative"
          style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
        >
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
                margin: 0,
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
              A small, intentional K–5 microschool in South Fort Worth building
              scholars, leaders, and legacy-makers — through rigorous academics,
              cultural grounding, and project-based learning.
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
        </section>

        {/* ══ HERO SECONDARY IMAGE ══ */}
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
                aspectRatio: "16/9",
                overflow: "hidden",
                borderRadius: 4,
                boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                border: "1px solid rgba(251,205,50,0.15)",
              }}
            >
              <img
                src={images.heroSecondary}
                alt="Four children standing together in warm cinematic light — the founding cohort of Sankofa Legacy School"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(28,27,32,0.8))",
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
                  Where your child is known, challenged, and prepared —
                  academically, culturally, and personally.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ══ SANKOFA MEANING ══ */}
        <section
          style={{
            padding: "6rem 1.5rem",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <p
              className="font-body"
              style={{
                color: "var(--gold-primary)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: 500,
                margin: "0 0 2rem",
              }}
            >
              The Meaning of Sankofa
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                color: "var(--text-primary)",
                lineHeight: 1.4,
                margin: 0,
                fontWeight: 500,
              }}
            >
              <em style={{ color: "var(--gold-primary)" }}>Sankofa</em> is an
              Adinkra concept from the Akan people of Ghana, meaning{" "}
              <em>&ldquo;go back and fetch it.&rdquo;</em> The Sankofa bird
              flies forward while looking backward — reclaiming the wisdom of
              the past to build what comes next.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, var(--gold-primary), transparent)",
                }}
              />
            </div>
          </FadeIn>
        </section>

        {/* ══ FOUR PILLARS ══ */}
        <section
          style={{
            padding: "6rem 1.5rem",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <p
                className="font-body"
                style={{
                  color: "var(--gold-primary)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  margin: "0 0 1rem",
                }}
              >
                What We Teach
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "var(--text-primary)",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                The Four Pillars of Sankofa
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gap: "6rem" }}>
            {PILLARS.map((p, idx) => (
              <PillarCard
                key={p.number}
                number={p.number}
                name={p.name}
                description={p.description}
                tags={p.tags}
                outcome={p.outcome}
                accentColor={p.accentColor}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
                imageFirst={idx % 2 === 1}
              />
            ))}
          </div>
        </section>

        {/* ══ WHAT MAKES US DIFFERENT ══ */}
        <section
          style={{
            padding: "6rem 1.5rem",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                className="font-body"
                style={{
                  color: "var(--gold-primary)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  margin: "0 0 1rem",
                }}
              >
                Why Sankofa
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "var(--text-primary)",
                  margin: 0,
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
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {DIFFERENTIATORS.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.25rem",
                    background: "rgba(251,205,50,0.03)",
                    border: "1px solid rgba(251,205,50,0.12)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 8,
                      height: 8,
                      marginTop: 8,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--gold-primary), var(--gold-warm))",
                    }}
                  />
                  <p
                    className="font-body"
                    style={{
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: 1.55,
                      fontSize: "0.95rem",
                    }}
                  >
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══ LOCATION ══ */}
        <section
          style={{
            padding: "6rem 1.5rem",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <p
              className="font-body"
              style={{
                color: "var(--gold-primary)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: 500,
                margin: "0 0 1rem",
              }}
            >
              Where We Are
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "var(--text-primary)",
                margin: "0 0 1.5rem",
                fontWeight: 600,
              }}
            >
              South Fort Worth, Texas
            </h2>
            <p
              className="font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                maxWidth: "50ch",
                margin: "0 auto",
              }}
            >
              Campus details shared with interested families during the
              enrollment conversation. ESA-compatible enrollment pathway
              anticipated through a partner organization. Accreditation process
              currently in progress.
            </p>
          </FadeIn>
        </section>

        {/* ══ INTEREST FORM ══ */}
        <section
          id="interest"
          style={{
            padding: "6rem 1.5rem",
            maxWidth: 620,
            margin: "0 auto",
            scrollMarginTop: "2rem",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p
                className="font-body"
                style={{
                  color: "var(--gold-primary)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  margin: "0 0 1rem",
                }}
              >
                Founding Cohort
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "var(--text-primary)",
                  margin: "0 0 1rem",
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
                Enrollment is intentionally limited. Tell us a little about
                your family and we&rsquo;ll reach out with next steps.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              style={{
                padding: "2.5rem",
                background: "rgba(56,31,0,0.3)",
                border: "1px solid rgba(251,205,50,0.2)",
                borderRadius: 4,
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <InterestForm />
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
