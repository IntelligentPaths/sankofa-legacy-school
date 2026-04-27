"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import BrandPatternPlaceholder from "@/components/BrandPatternPlaceholder";
import Footer from "@/components/Footer";
import { FadeIn } from "@/lib/motion";

/* ── /approach
 *
 * Stacked anchor-nav sections, one per pillar. Each section's bg gradient
 * shifts to that pillar's accent color. Anchor IDs match the homepage
 * teaser: #mastery, #identity, #creation, #community.
 * ──────────────────────────────────────────────────────────────── */

type Pillar = {
  id: string;
  number: string;
  name: string;
  variant: 1 | 2 | 3 | 4;
  accent: string;
  bgGradient: string;
  oneLiner: string;
  focusAreas: string[];
  paragraph1: string;
  paragraph2: string;
  inPractice: string;
  result: string;
};

const PILLARS: Pillar[] = [
  {
    id: "mastery",
    number: "01",
    name: "Mastery",
    variant: 1,
    accent: "var(--gold-primary)",
    bgGradient:
      "linear-gradient(180deg, var(--cream) 0%, #FAEAB7 100%)",
    oneLiner:
      "Students don’t just learn — they understand and can explain their thinking.",
    focusAreas: [
      "Math reasoning",
      "Literacy & communication",
      "Analytical thinking",
      "Structured problem solving",
      "Independent inquiry",
    ],
    paragraph1:
      "Deep competence in core academic domains through reasoning-based learning and demonstrated understanding — not memorization. Students learn how to think, not just what to recall.",
    paragraph2:
      "Math, literacy, and science are taught through structured problem-solving. Every concept must be explained, applied, and re-applied in a new context before we move on.",
    inPractice:
      "In practice: a student explains how they solved a problem — not just the answer.",
    result:
      "Students become confident, independent thinkers who can explain their reasoning and apply knowledge in new situations.",
  },
  {
    id: "identity",
    number: "02",
    name: "Identity",
    variant: 2,
    accent: "var(--rust)",
    bgGradient:
      "linear-gradient(180deg, #FAEAB7 0%, #F4D6A2 100%)",
    oneLiner:
      "Students learn who they are, where they come from, and how they move in the world.",
    focusAreas: [
      "Diaspora studies",
      "Cultural literacy",
      "Language exposure",
      "Ethical reflection",
      "Historical awareness",
    ],
    paragraph1:
      "A strong sense of self grounded in historical awareness, cultural literacy, and personal reflection. Students study the diaspora, the wisdom traditions of multiple cultures, and the languages and stories that shaped their roots.",
    paragraph2:
      "Identity is not a separate subject — it is woven through every discipline. A child who knows their roots stands taller in the world.",
    inPractice:
      "In practice: students connect history, culture, and their own story in daily learning.",
    result:
      "Students develop confidence, clarity, and a strong sense of who they are.",
  },
  {
    id: "creation",
    number: "03",
    name: "Creation",
    variant: 3,
    accent: "var(--gold-warm)",
    bgGradient:
      "linear-gradient(180deg, #F4D6A2 0%, #ECC288 100%)",
    oneLiner: "Students don’t just learn — they build and create real things.",
    focusAreas: [
      "Entrepreneurship",
      "Engineering challenges",
      "Design thinking",
      "Project-based learning",
      "Creative production",
    ],
    paragraph1:
      "Knowledge is applied through building, designing, and producing meaningful work. Students don’t just consume — they make.",
    paragraph2:
      "Every term, students create something real: a design, an essay, a small business, an engineering solution, or a research project shared with others.",
    inPractice:
      "In practice: students build projects, launch ideas, and present their work.",
    result:
      "Students learn how to turn ideas into reality — building things that matter.",
  },
  {
    id: "community",
    number: "04",
    name: "Community",
    variant: 4,
    accent: "var(--gold-deep)",
    bgGradient:
      "linear-gradient(180deg, #ECC288 0%, #D9A858 100%)",
    oneLiner:
      "Students learn to lead, work together, and contribute every day.",
    focusAreas: [
      "Mentorship",
      "Teamwork",
      "Leadership",
      "Service projects",
      "Accountability",
    ],
    paragraph1:
      "Responsibility toward others is built into the school day. Students learn to lead, collaborate, and contribute in ways that strengthen others.",
    paragraph2:
      "Mentorship is part of daily learning. Older students guide younger ones, and service projects connect classroom work to real community needs.",
    inPractice:
      "In practice: students mentor peers and take on real leadership roles each day.",
    result:
      "Students see themselves as leaders and contributors — not just participants.",
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

export default function ApproachPage() {
  return (
    <PageShell bg="cream" atmosphere={false}>
      <main>
        {/* ══ HERO BAND ══ */}
        <section
          style={{
            padding: "5rem 1.5rem 4rem",
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
            <p style={kicker}>Our Approach</p>
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
              Four pillars. One purpose.
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "rgba(28,27,32,0.78)",
                lineHeight: 1.65,
                maxWidth: "60ch",
                margin: "0 auto",
              }}
            >
              We build scholars who are capable, grounded, creative, and
              connected — through four disciplines woven into every day.
              Each pillar holds equal weight; together they make a child who
              is ready for what comes next.
            </p>
          </FadeIn>

          {/* anchor jumplinks */}
          <FadeIn delay={0.4}>
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              {PILLARS.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="font-body"
                  style={{
                    padding: "0.5rem 1rem",
                    border: `1px solid ${p.accent}`,
                    color: p.accent,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: 100,
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {p.number} · {p.name}
                </a>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══ STACKED PILLAR SECTIONS ══ */}
        {PILLARS.map((p, idx) => (
          <section
            key={p.id}
            id={p.id}
            style={{
              background: p.bgGradient,
              padding: "6rem 1.5rem",
              scrollMarginTop: "6rem",
              borderTop: "1px solid rgba(56,31,0,0.08)",
            }}
          >
            <div
              style={{
                maxWidth: 1180,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "3rem",
              }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "3rem", alignItems: "center" }}
              >
                {idx % 2 === 1 ? (
                  <>
                    <BrandPatternPlaceholder
                      variant={p.variant}
                      ariaLabel={`${p.name} pattern`}
                    />
                    <PillarBody pillar={p} />
                  </>
                ) : (
                  <>
                    <PillarBody pillar={p} />
                    <BrandPatternPlaceholder
                      variant={p.variant}
                      ariaLabel={`${p.name} pattern`}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
        ))}

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
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                margin: "0 0 2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                maxWidth: "30ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              This is how Sankofa works every day.
              <br />
              Now see if it&rsquo;s the right fit for your family.
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
              Apply for the Founding Cohort →
            </Link>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}

function PillarBody({ pillar }: { pillar: Pillar }) {
  return (
    <FadeIn>
      <div>
        <p
          className="font-display"
          style={{
            fontSize: "4rem",
            color: pillar.accent,
            opacity: 0.55,
            lineHeight: 1,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {pillar.number}
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--near-black)",
            margin: "0.25rem 0 0.75rem",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {pillar.name}
        </h2>

        {/* one-liner translation */}
        <p
          className="font-display italic"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: pillar.accent,
            margin: "0 0 1.5rem",
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          {pillar.oneLiner}
        </p>

        {/* focus-area bullets */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem 0.75rem",
            marginBottom: "1.75rem",
          }}
        >
          {pillar.focusAreas.map((f) => (
            <span
              key={f}
              className="font-body"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.4rem 0.85rem",
                background: "rgba(28,27,32,0.06)",
                border: `1px solid ${pillar.accent}`,
                color: "var(--near-black)",
                borderRadius: 100,
                display: "inline-block",
                fontWeight: 600,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* paragraph 1 */}
        <p
          className="font-body"
          style={{
            fontSize: "1rem",
            color: "rgba(28,27,32,0.82)",
            lineHeight: 1.7,
            margin: "0 0 1rem",
          }}
        >
          {pillar.paragraph1}
        </p>

        {/* paragraph 2 */}
        <p
          className="font-body"
          style={{
            fontSize: "1rem",
            color: "rgba(28,27,32,0.82)",
            lineHeight: 1.7,
            margin: "0 0 1.5rem",
          }}
        >
          {pillar.paragraph2}
        </p>

        {/* in practice */}
        <p
          className="font-body"
          style={{
            fontSize: "0.95rem",
            color: "rgba(28,27,32,0.7)",
            lineHeight: 1.6,
            margin: "0 0 1.5rem",
            fontStyle: "italic",
          }}
        >
          {pillar.inPractice}
        </p>

        {/* result — visually distinct: gold/accent left border, italic, slightly larger */}
        <p
          className="font-display italic"
          style={{
            fontSize: "1.15rem",
            color: "var(--near-black)",
            margin: 0,
            padding: "0.75rem 1rem 0.75rem 1.25rem",
            borderLeft: `4px solid ${pillar.accent}`,
            background: "rgba(255,255,255,0.45)",
            lineHeight: 1.5,
            fontWeight: 600,
          }}
        >
          {pillar.result}
        </p>
      </div>
    </FadeIn>
  );
}
