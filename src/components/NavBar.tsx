"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/* ── NavBar
 *
 * Persistent top nav. Reads pathname for active highlight. Adapts to the
 * surface beneath via the [data-bg] attribute set by PageShell.
 *
 * Bleed fix (Round 2): hard hairline border, no box-shadow. Backdrop blur
 * stays at a softer 10px so the gold/amber of any logo behind doesn't
 * smear visibly through translucent surface — combined with the 80px
 * top padding PageShell now reserves, content never sits under the nav.
 * ──────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  { label: "Admissions", href: "/admissions" },
  { label: "Visit", href: "/visit" },
];

const LOGO_HORIZONTAL = "/logos/sankofa-logo-horizontal.svg";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavBar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.querySelector<HTMLElement>("[data-bg]");
    const bg = root?.dataset.bg ?? "dark";
    setIsDark(bg === "dark");
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const surfaceBg = isDark
    ? "rgba(28, 27, 32, 0.78)"
    : "rgba(250, 246, 238, 0.82)";
  const linkColor = isDark
    ? "rgba(250, 246, 238, 0.78)"
    : "rgba(28, 27, 32, 0.78)";
  const linkActive = isDark ? "var(--gold-primary)" : "var(--rust)";

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 40, // below Portal (100), above content
          background: surfaceBg,
          // hard 0.5px hairline — Round 2 bleed fix
          borderBottom: "0.5px solid rgba(245, 166, 35, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {/* ── brand mark — single horizontal lockup, scales naturally on narrow viewports ── */}
          <Link
            href="/"
            aria-label="Sankofa Legacy School — home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              lineHeight: 0,
              maxHeight: 56,
            }}
          >
            <img
              src={LOGO_HORIZONTAL}
              alt="Sankofa Legacy School"
              style={{
                maxWidth: "min(60vw, 320px)",
                maxHeight: 56,
                width: "auto",
                height: "auto",
                display: "block",
              }}
            />
          </Link>

          {/* ── desktop links ── */}
          <ul
            className="hidden md:flex"
            style={{
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: active ? linkActive : linkColor,
                      textDecoration: "none",
                      fontFamily: "'Montserrat', system-ui, sans-serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: active ? 600 : 500,
                      transition: "color 0.2s",
                      paddingBottom: 4,
                      borderBottom: active
                        ? `1px solid ${linkActive}`
                        : "1px solid transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── mobile hamburger ── */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              background: "transparent",
              border: "none",
              padding: 8,
              cursor: "pointer",
              color: linkColor,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={26}
              height={26}
              viewBox="0 0 26 26"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <>
                  <path d="M6 6 L20 20" />
                  <path d="M20 6 L6 20" />
                </>
              ) : (
                <>
                  <path d="M4 8 L22 8" />
                  <path d="M4 13 L22 13" />
                  <path d="M4 18 L22 18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── mobile fullscreen menu ── */}
      {open && (
        <div
          id="primary-mobile-menu"
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            top: 64,
            zIndex: 39,
            background: isDark
              ? "rgba(28, 27, 32, 0.96)"
              : "rgba(250, 246, 238, 0.97)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 1.5rem",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: active ? linkActive : linkColor,
                      textDecoration: "none",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      display: "block",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(245,166,35,0.15)",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
