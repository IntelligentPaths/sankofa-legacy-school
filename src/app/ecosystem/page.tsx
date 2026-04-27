"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import BrandPatternPlaceholder from "@/components/BrandPatternPlaceholder";
import Footer from "@/components/Footer";
import { FadeIn } from "@/lib/motion";

/* ── /ecosystem ── */

const ORGS = [
  {
    name: "Pura Vida Youth",
    role: "Youth development & community programming",
    description:
      "Mentorship, summer programming, and community-rooted enrichment for young people.",
    variant: 1 as const,
  },
  {
    name: "Sankofa Legacy School",
    role: "K–5 microschool — the educational anchor",
    description:
      "A small, intentional elementary microschool in South Fort Worth, building scholars rooted in legacy.",
    variant: 2 as const,
    isSelf: true,
  },
  {
    name: "Ubuntu Y Nosotros Learning Systems",
    role: "Learning architecture & curriculum design",
    description:
      "Frameworks, curriculum, and pedagogical infrastructure that the ecosystem's educational work runs on.",
    variant: 3 as const,
  },
  {
    name: "Roots Rediscovered",
    role: "Heritage, ancestry, and cultural recovery",
    description:
      "Programming and content that helps families and students reconnect with the roots that ground identity.",
    variant: 4 as const,
  },
];

const kicker: React.CSSProperties = {
  color: "var(--gold-deep)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 600,
  margin: 0,
};

export default function EcosystemPage() {
  return (
    <PageShell bg="cream" atmosphere={false}>
      <main>
        {/* ══ HERO ══ */}
        <section
          style={{
            padding: "5rem 1.5rem 3rem",
            maxWidth: 980,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <img
              src="/logos/sankofa-logo-mark.svg"
              alt=""
              aria-hidden
              width={88}
              height={88}
              style={{
                width: 88,
                height: 88,
                display: "block",
                margin: "0 auto 1.5rem",
              }}
            />
            <p style={kicker}>The Ecosystem</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--near-black)",
                margin: "1rem 0 1.25rem",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              Pura Vida Legacy Ecosystem
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "rgba(28,27,32,0.78)",
                lineHeight: 1.7,
                maxWidth: "60ch",
                margin: "0 auto",
              }}
            >
              Sankofa Legacy School is part of the Pura Vida Legacy
              Ecosystem — a network of organizations rooted in legacy,
              learning, and community uplift. The school is one node in a
              larger web of work designed to raise scholars who understand
              themselves and the communities they belong to.
            </p>
          </FadeIn>
        </section>

        {/* ══ ORGS GRID ══ */}
        <section
          style={{
            padding: "3rem 1.5rem 5rem",
            background:
              "linear-gradient(180deg, var(--cream) 0%, #FAEAB7 100%)",
          }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={kicker}>Sibling Organizations</p>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    color: "var(--near-black)",
                    margin: "1rem 0 0",
                    fontWeight: 600,
                    lineHeight: 1.15,
                  }}
                >
                  Four organizations. One rooted purpose.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {ORGS.map((org) => (
                  <div
                    key={org.name}
                    style={{
                      background: org.isSelf
                        ? "rgba(178,39,20,0.08)"
                        : "rgba(255,255,255,0.65)",
                      border: org.isSelf
                        ? "1px solid var(--rust)"
                        : "1px solid rgba(56,31,0,0.18)",
                      borderRadius: 6,
                      padding: "1.5rem",
                      position: "relative",
                    }}
                  >
                    {org.isSelf && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          padding: "0.25rem 0.6rem",
                          background: "var(--rust)",
                          color: "var(--cream)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          borderRadius: 100,
                        }}
                      >
                        You are here
                      </div>
                    )}
                    <BrandPatternPlaceholder
                      variant={org.variant}
                      aspectRatio="4 / 3"
                      ariaLabel={`${org.name} pattern`}
                    />
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.4rem",
                        color: "var(--near-black)",
                        margin: "1rem 0 0.4rem",
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {org.name}
                    </h3>
                    <p
                      className="font-body"
                      style={{
                        color: "var(--gold-deep)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        margin: "0 0 0.75rem",
                      }}
                    >
                      {org.role}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        color: "rgba(28,27,32,0.75)",
                        fontSize: "0.92rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {org.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ FUTURE LINK NOTE ══ */}
        <section
          style={{
            padding: "5rem 1.5rem 6rem",
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <p
              className="font-display italic"
              style={{
                fontSize: "1.1rem",
                color: "rgba(28,27,32,0.7)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              The Pura Vida Legacy Ecosystem will eventually live at its
              own home on the web. Until then, the school site is the
              window into the work.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link
                href="/about"
                className="font-body"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  border: "1px solid var(--gold-deep)",
                  color: "var(--gold-deep)",
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  borderRadius: 2,
                }}
              >
                Read our story →
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
