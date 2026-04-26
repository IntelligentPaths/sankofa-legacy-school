"use client";

import Link from "next/link";
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

const sitemapLinkStyle: React.CSSProperties = {
  ...linkStyle,
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
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

const SITEMAP = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  { label: "Admissions", href: "/admissions" },
  { label: "Visit", href: "/visit" },
  { label: "Ecosystem", href: "/ecosystem" },
];

/* ── checkerboard hairline (gold/amber/black brand kit edge motif) ── */
function CheckerHairline() {
  return (
    <svg
      width="100%"
      height={6}
      viewBox="0 0 200 6"
      preserveAspectRatio="none"
      style={{ display: "block" }}
      aria-hidden
    >
      <defs>
        <pattern id="footer-checker" x="0" y="0" width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#FBCD32" />
          <rect x="6" width="6" height="6" fill="#1C1B20" />
        </pattern>
        <pattern id="footer-checker-alt" x="0" y="0" width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#E38C07" />
          <rect x="6" width="6" height="6" fill="#B22714" />
        </pattern>
      </defs>
      <rect width="200" height="3" fill="url(#footer-checker)" />
      <rect y="3" width="200" height="3" fill="url(#footer-checker-alt)" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--near-black)",
        color: "var(--text-primary)",
        padding: "0",
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* ── brand-pattern hairline at top ── */}
      <CheckerHairline />

      <div
        style={{
          padding: "4rem 2rem 2rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* ── 4-column footer grid: brand | sitemap | connect | ecosystem ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-4"
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

          {/* ── col 2: sitemap ── */}
          <div>
            <p style={kickerStyle}>Site</p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {SITEMAP.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    style={sitemapLinkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── col 3: connect ── */}
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
              <a
                href="mailto:contact@sankofalegacyschool.org"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                contact@sankofalegacyschool.org
              </a>
            </div>
          </div>

          {/* ── col 4: ecosystem ── */}
          <div>
            <p style={kickerStyle}>Ecosystem</p>
            <p
              className="font-display italic"
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                margin: "0 0 0.75rem",
                lineHeight: 1.6,
              }}
            >
              Part of the{" "}
              <Link
                href="/ecosystem"
                style={{
                  color: "var(--gold-primary)",
                  textDecoration: "none",
                  borderBottom: "1px dotted rgba(251,205,50,0.5)",
                }}
              >
                Pura Vida Legacy Ecosystem
              </Link>
              .
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
            className="font-body"
            style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              margin: 0,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            South Fort Worth, Texas
          </p>
        </div>
      </div>
    </footer>
  );
}
