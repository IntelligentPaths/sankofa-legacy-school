"use client";

import SankofaHexagon from "./SankofaHexagon";

/* ── footer ── */

const linkStyle: React.CSSProperties = {
  color: "var(--text-secondary)",
  textDecoration: "none",
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: "0.9rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.6rem",
  transition: "color 0.2s",
};

const kickerStyle: React.CSSProperties = {
  color: "var(--gold-primary)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 500,
  margin: "0 0 1rem",
  fontFamily: "'Montserrat', system-ui, sans-serif",
};

/* ── brand icons (inline — lucide-react 1.x dropped brand logos) ── */
function InstagramIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--near-black)",
        padding: "4rem 2rem 2rem",
        borderTop: "1px solid rgba(251, 205, 50, 0.15)",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ── three-column grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "3rem" }}
        >
          {/* ── col 1: brand ── */}
          <div>
            <SankofaHexagon size={48} uniqueId="footer" />
            <p
              className="font-display"
              style={{
                fontSize: "1.2rem",
                color: "var(--text-primary)",
                margin: "1rem 0 0.5rem",
                fontWeight: 600,
              }}
            >
              Sankofa Legacy School
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              South Fort Worth, TX 76134
            </p>
          </div>

          {/* ── col 2: connect ── */}
          <div>
            <p style={kickerStyle}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <FacebookIcon />
                Facebook
              </a>
              <a
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <TikTokIcon />
                TikTok
              </a>
            </div>
          </div>

          {/* ── col 3: ecosystem ── */}
          <div>
            <p style={kickerStyle}>Ecosystem</p>
            <p
              className="font-display italic"
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Part of the Pura Vida Legacy Ecosystem.
            </p>
          </div>
        </div>

        {/* ── divider ── */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(251,205,50,0.25), transparent)",
            margin: "3rem 0 1.5rem",
          }}
        />

        {/* ── bottom strip ── */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            © 2026 Sankofa Legacy School. All rights reserved.
          </p>
          <p
            className="font-display italic"
            style={{
              fontSize: "0.7rem",
              color: "var(--gold-primary)",
              margin: 0,
            }}
          >
            &ldquo;Se wo were fi na wosankofa a yenkyi.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
