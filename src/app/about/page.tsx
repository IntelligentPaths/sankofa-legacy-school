"use client";

import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import { FadeIn } from "@/lib/motion";
import { images } from "@/lib/images";

/* ── /about — Our Story ── */

const kicker: React.CSSProperties = {
  color: "var(--gold-deep)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 600,
  margin: 0,
};

const sectionHeading: React.CSSProperties = {
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  color: "var(--near-black)",
  margin: "1rem 0 1.25rem",
  fontWeight: 600,
  lineHeight: 1.15,
};

const bodyText: React.CSSProperties = {
  fontSize: "1.05rem",
  color: "rgba(28,27,32,0.82)",
  lineHeight: 1.75,
  margin: 0,
};

/* Brand-pattern hairline used as section dividers */
function PatternDivider() {
  return (
    <div
      style={{
        height: 4,
        margin: "0",
        background:
          "repeating-linear-gradient(90deg, var(--gold-primary) 0 12px, var(--near-black) 12px 24px, var(--gold-deep) 24px 36px, var(--rust) 36px 48px)",
        opacity: 0.85,
      }}
      aria-hidden
    />
  );
}

export default function AboutPage() {
  return (
    <PageShell bg="cream" atmosphere={false}>
      <main>
        {/* ══ HERO BAND ══ */}
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
            <p style={kicker}>Our Story</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--near-black)",
                margin: "1rem 0 1.5rem",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              Rooted in legacy. Built for what&rsquo;s next.
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
              Sankofa Legacy School is a small, intentional Private
              K&ndash;5 microschool — opening with a founding cohort of 24
              in South Fort Worth, August 2026. We exist to graduate
              scholars who are capable in their academics, grounded in
              their identity, and ready to build the world they want to
              live in.
            </p>
          </FadeIn>
        </section>

        {/* ══ HERO IMAGE BAND ══ */}
        <section
          style={{
            padding: "0 1.5rem 3rem",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                borderRadius: 6,
                border: "1px solid rgba(56,31,0,0.18)",
                boxShadow: "0 30px 80px rgba(56,31,0,0.25)",
              }}
            >
              <Image
                src={images.aboutHero}
                alt="Sankofa Legacy School students in conversation — building the kind of community we want our children to grow up in"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </section>

        <PatternDivider />

        {/* ══ MISSION ══ */}
        <section
          style={{
            padding: "5rem 1.5rem",
            background:
              "linear-gradient(180deg, var(--cream) 0%, #FAEAB7 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 880,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <FadeIn>
              <p style={kicker}>Our Mission</p>
              <p
                className="font-display italic"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  color: "var(--near-black)",
                  lineHeight: 1.45,
                  margin: "1.5rem 0 0",
                  fontWeight: 500,
                }}
              >
                To build scholars, leaders, and legacy-makers — through
                rigorous academics, cultural grounding, and project-based
                learning that prepares children to lead with both skill and
                wisdom.
              </p>
            </FadeIn>
          </div>
        </section>

        <PatternDivider />

        {/* ══ MEANING OF SANKOFA ══ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <FadeIn>
              <p style={{ ...kicker, textAlign: "center" }}>
                The Meaning of Sankofa
              </p>
              <h2
                className="font-display"
                style={{ ...sectionHeading, textAlign: "center" }}
              >
                Go back and fetch it.
              </h2>
              <p style={bodyText}>
                <em>Sankofa</em> is an Adinkra concept from the Akan people
                of Ghana. The symbol most often appears as a bird flying
                forward while looking backward, an egg held in its beak — a
                reminder that to build well, you must return for the wisdom
                that has been left behind.
              </p>
              <p style={{ ...bodyText, marginTop: "1rem" }}>
                For our school, Sankofa is more than a name. It is a
                commitment: that what we teach is rooted in the inheritance
                of our students&rsquo; cultures, their histories, their
                stories — and that excellence in the future requires
                recovering what came before.
              </p>
            </FadeIn>
          </div>
        </section>

        <PatternDivider />

        {/* ══ FOUNDING CONTEXT ══ */}
        <section
          style={{
            padding: "5rem 1.5rem",
            background:
              "linear-gradient(180deg, #F4D6A2 0%, #ECC288 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            <FadeIn>
              <p
                style={{ ...kicker, textAlign: "center" }}
              >
                Founding Cohort
              </p>
              <h2
                className="font-display"
                style={{
                  ...sectionHeading,
                  textAlign: "center",
                  marginBottom: "3rem",
                }}
              >
                South Fort Worth · August 2026 · 24 scholars
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "1.5rem",
                  maxWidth: 920,
                  margin: "0 auto",
                }}
              >
                {[
                  {
                    label: "Cohort size",
                    value: "24",
                    detail: "intentionally small — every child known by name",
                  },
                  {
                    label: "Grade range",
                    value: "K–5",
                    detail: "elementary years, foundation laid carefully",
                  },
                  {
                    label: "Opens",
                    value: "Aug 2026",
                    detail: "the founding class — what we build, we build with you",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "rgba(28,27,32,0.06)",
                      padding: "1.5rem",
                      border: "1px solid rgba(56,31,0,0.18)",
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >
                    <p style={{ ...kicker, marginBottom: "0.5rem" }}>
                      {item.label}
                    </p>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "2.75rem",
                        color: "var(--rust)",
                        margin: "0.5rem 0",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(28,27,32,0.78)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <PatternDivider />

        {/* ══ ECOSYSTEM CONNECTION ══ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div
            style={{
              maxWidth: 880,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <FadeIn>
              <p style={kicker}>The Larger Work</p>
              <h2 className="font-display" style={sectionHeading}>
                Part of the Pura Vida Legacy Ecosystem
              </h2>
              <p style={bodyText}>
                Sankofa Legacy School sits within a broader network of
                organizations — Pura Vida Youth, Ubuntu Y Nosotros Learning
                Systems, Roots Rediscovered — each rooted in legacy,
                learning, and community uplift. The school is the
                educational anchor of that ecosystem: where children are
                shaped, families are connected, and the work continues.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link
                  href="/ecosystem"
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
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  Explore the Ecosystem →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ END CTA ══ */}
        <section
          style={{
            padding: "5rem 1.5rem 6rem",
            background: "var(--near-black)",
            color: "var(--text-primary)",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <p style={{ ...kicker, color: "var(--gold-primary)" }}>
              Want to learn more?
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                margin: "1rem 0 2rem",
                fontWeight: 600,
              }}
            >
              Begin a conversation with us.
            </h2>
            <Link
              href="/admissions"
              className="font-body"
              style={{
                display: "inline-block",
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
              }}
            >
              Visit Admissions →
            </Link>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
