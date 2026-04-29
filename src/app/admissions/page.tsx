"use client";

import PageShell from "@/components/PageShell";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { FadeIn } from "@/lib/motion";

/* ── /admissions
 * Founding cohort process. Lead with urgency: 24 seats, deadline 7/1/2026.
 * Embed the full InterestForm + Plan-a-Visit section at the bottom.
 * ──────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    step: "1",
    title: "Submit interest",
    body:
      "Tell us about your family. We'll follow up within a few days to schedule a conversation.",
  },
  {
    step: "2",
    title: "Family conversation",
    body:
      "A 30-minute conversation to understand your child, your goals, and whether Sankofa is the right fit.",
  },
  {
    step: "3",
    title: "Tuition & TEFA pathway",
    body:
      "We'll walk through tuition options, including the Texas ESA voucher pathway. Families aligned with the mission will not be priced out.",
  },
  {
    step: "4",
    title: "Welcome to the cohort",
    body:
      "Complete enrollment, receive your orientation date, and secure your child's place in the founding cohort.",
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

const sectionHeading: React.CSSProperties = {
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  color: "var(--near-black)",
  margin: "1rem 0 1.25rem",
  fontWeight: 600,
  lineHeight: 1.15,
};

export default function AdmissionsPage() {
  return (
    <PageShell bg="cream" atmosphere={false}>
      <main>
        {/* ══ HERO ══ */}
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
            <p style={kicker}>Admissions</p>
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
              The founding cohort of 24.
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
              We are enrolling twenty-four students for our first year.
              Applications close{" "}
              <strong style={{ color: "var(--rust)" }}>July 1, 2026</strong>.
              The founding cohort sets the culture — we are building this
              group with intention.
            </p>
          </FadeIn>
        </section>

        {/* ══ URGENCY STRIP ══ */}
        <section
          style={{
            background: "var(--rust)",
            color: "var(--cream)",
            padding: "1.5rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* checker hairline top + bottom */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                "repeating-linear-gradient(90deg, var(--gold-primary) 0 8px, var(--near-black) 8px 16px)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                "repeating-linear-gradient(90deg, var(--gold-primary) 0 8px, var(--near-black) 8px 16px)",
            }}
          />
          <p
            className="font-body"
            style={{
              margin: 0,
              padding: "0.25rem 0 0",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontSize: "0.85rem",
            }}
          >
            Application deadline · July 1, 2026 · 24 founding seats
          </p>
          <p
            className="font-body"
            style={{
              margin: "0.4rem 0 0.25rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              fontSize: "0.85rem",
              opacity: 0.92,
            }}
          >
            Limited seats. Once filled, enrollment closes.
          </p>
        </section>

        {/* ══ STEPS ══ */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={kicker}>The Enrollment Process</p>
                <h2 className="font-display" style={sectionHeading}>
                  Four steps from interest to enrollment.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {STEPS.map((s) => (
                  <div
                    key={s.step}
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(56,31,0,0.18)",
                      borderRadius: 4,
                      padding: "1.75rem",
                      position: "relative",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "3rem",
                        color: "var(--gold-deep)",
                        opacity: 0.35,
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {s.step}
                    </p>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.4rem",
                        color: "var(--near-black)",
                        margin: "0.25rem 0 0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="font-body"
                      style={{
                        color: "rgba(28,27,32,0.75)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ TUITION & TEFA ══ */}
        <section
          style={{
            padding: "5rem 1.5rem",
            background:
              "linear-gradient(180deg, var(--cream) 0%, #FAEAB7 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <FadeIn>
              <p style={kicker}>Tuition</p>
              <h2 className="font-display" style={sectionHeading}>
                No family priced out who fits the mission.
              </h2>
              <p
                className="font-body"
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(28,27,32,0.82)",
                  lineHeight: 1.7,
                  margin: "0 0 1rem",
                }}
              >
                We work with families who are aligned with our mission. Cost
                should not be the barrier.
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(28,27,32,0.82)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Sankofa Legacy School accepts the Texas Education Freedom
                Account (TEFA) voucher. For many families, TEFA funds
                substantially cover tuition. For families outside the program,
                we offer flexible tuition options — reach out to learn more.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ══ INTEREST FORM ══ */}
        <section
          id="interest"
          style={{
            padding: "5rem 1.5rem 4rem",
            maxWidth: 620,
            margin: "0 auto",
            scrollMarginTop: "6rem",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={kicker}>Step One</p>
              <h2 className="font-display" style={sectionHeading}>
                Submit interest.
              </h2>
              <p
                className="font-body"
                style={{
                  fontSize: "1rem",
                  color: "rgba(28,27,32,0.75)",
                  lineHeight: 1.6,
                  maxWidth: "44ch",
                  margin: "0 auto",
                }}
              >
                Tell us about your family. We&rsquo;ll follow up within
                24&ndash;48 hours.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              style={{
                padding: "2.5rem",
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(56,31,0,0.18)",
                borderRadius: 4,
                boxShadow: "0 30px 80px rgba(56,31,0,0.18)",
              }}
            >
              <InterestForm />
            </div>
          </FadeIn>
        </section>

        {/* ══ PLAN A VISIT (folded in from the deleted /visit page) ══ */}
        <section
          id="visit"
          style={{
            padding: "5rem 1.5rem 6rem",
            maxWidth: 1000,
            margin: "0 auto",
            scrollMarginTop: "6rem",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={kicker}>Plan a Visit</p>
              <h2 className="font-display" style={sectionHeading}>
                Come see what we&rsquo;re building.
              </h2>
              <p
                className="font-body"
                style={{
                  fontSize: "1rem",
                  color: "rgba(28,27,32,0.75)",
                  lineHeight: 1.6,
                  maxWidth: "52ch",
                  margin: "0 auto",
                }}
              >
                The best way to know whether Sankofa is right for your family
                is to talk with us in person. Visits are arranged
                individually so each family gets focused time.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: "1.25rem" }}
            >
              <ContactCard
                label="Location"
                value="South Fort Worth, TX 76134"
                detail="Exact campus address shared during the family conversation."
              />
              <ContactCard
                label="Email"
                value="contact@sankofalegacyschool.org"
                detail="Direct line to the founder. Replies within 24–48 hours."
                href="mailto:contact@sankofalegacyschool.org"
              />
              <ContactCard
                label="Visiting hours"
                value="By appointment"
                detail="Submit interest above and we'll arrange a visit window."
              />
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}

function ContactCard({
  label,
  value,
  detail,
  href,
}: {
  label: string;
  value: string;
  detail: string;
  href?: string;
}) {
  const valueEl = (
    <p
      className="font-display"
      style={{
        fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
        color: "var(--rust)",
        margin: "0.5rem 0 0.75rem",
        fontWeight: 600,
      }}
    >
      {value}
    </p>
  );

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(56,31,0,0.18)",
        borderRadius: 4,
        padding: "1.5rem",
      }}
    >
      <p
        className="font-body"
        style={{
          color: "var(--gold-deep)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          fontWeight: 700,
          margin: 0,
        }}
      >
        {label}
      </p>
      {href ? (
        <a href={href} style={{ textDecoration: "none", display: "block" }}>
          {valueEl}
        </a>
      ) : (
        valueEl
      )}
      <p
        className="font-body"
        style={{
          color: "rgba(28,27,32,0.7)",
          fontSize: "0.9rem",
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {detail}
      </p>
    </div>
  );
}
