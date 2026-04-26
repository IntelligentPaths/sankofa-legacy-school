"use client";

import PageShell from "@/components/PageShell";
import VisitForm from "@/components/VisitForm";
import Footer from "@/components/Footer";
import { FadeIn } from "@/lib/motion";

/* ── /visit — contact + visit info ── */

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

export default function VisitPage() {
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
            <p style={kicker}>Visit & Connect</p>
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
              Come see what we&rsquo;re building.
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "rgba(28,27,32,0.78)",
                lineHeight: 1.7,
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              The best way to know whether Sankofa is right for your family
              is to talk with us. Send a note — we&rsquo;ll arrange a visit
              or a call.
            </p>
          </FadeIn>
        </section>

        {/* ══ CONTACT BLOCK ══ */}
        <section
          style={{
            padding: "3rem 1.5rem",
            background:
              "linear-gradient(180deg, var(--cream) 0%, #FAEAB7 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
            }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: "2rem" }}
            >
              <FadeIn>
                <ContactCard
                  label="Location"
                  value="South Fort Worth, TX 76134"
                  detail="Exact campus address shared during the family conversation."
                />
              </FadeIn>
              <FadeIn delay={0.1}>
                <ContactCard
                  label="Email"
                  value="contact@sankofalegacyschool.org"
                  detail="Direct line to the founder. Replies within a few days."
                  href="mailto:contact@sankofalegacyschool.org"
                />
              </FadeIn>
              <FadeIn delay={0.2}>
                <ContactCard
                  label="Visiting hours"
                  value="By appointment"
                  detail="Visits arranged individually so each family gets focused time."
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══ VISIT FORM ══ */}
        <section
          style={{
            padding: "5rem 1.5rem 6rem",
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p style={kicker}>Reach Out</p>
              <h2 className="font-display" style={sectionHeading}>
                Send us a note.
              </h2>
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
              <VisitForm />
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
        fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
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
        padding: "1.75rem",
      }}
    >
      <p
        className="font-body"
        style={{
          color: "var(--gold-deep)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          fontWeight: 600,
          margin: 0,
        }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          style={{
            textDecoration: "none",
            display: "block",
          }}
        >
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
