"use client";

import type { ReactNode } from "react";
import Atmosphere from "./Atmosphere";
import CornerHex from "./CornerHex";

/* ── PageShell
 *
 * Wraps a page with shared scaffolding: atmosphere, optional corner hex,
 * background variant. Brings the cream / dark / gradient backgrounds the
 * brand kit calls for so each page reads with its own surface.
 *
 * Homepage uses bg="dark" to keep the existing portal-revealed atmosphere.
 * Other pages default to bg="cream" for the lighter, more regal aesthetic.
 * ──────────────────────────────────────────────────────────────── */

type Bg = "cream" | "dark" | "gradient";

type Props = {
  children: ReactNode;
  bg?: Bg;
  corner?: boolean;
  atmosphere?: boolean; // gold particle layer (default true)
};

const BG_STYLES: Record<Bg, React.CSSProperties> = {
  dark: { background: "var(--near-black)", color: "var(--text-primary)" },
  cream: { background: "var(--cream)", color: "var(--near-black)" },
  gradient: {
    background:
      "linear-gradient(160deg, var(--cream) 0%, #F5E8D0 35%, #E8C97A 100%)",
    color: "var(--near-black)",
  },
};

export default function PageShell({
  children,
  bg = "cream",
  corner = false,
  atmosphere,
}: Props) {
  const showAtmosphere = atmosphere ?? bg === "dark";

  return (
    <div
      className="relative min-h-screen"
      style={BG_STYLES[bg]}
      data-bg={bg}
    >
      {/* ── atmosphere (only on dark by default) ── */}
      {showAtmosphere && (
        <div className="fixed inset-0 z-0" aria-hidden>
          <Atmosphere />
        </div>
      )}

      {/* ── faint diagonal weave overlay (kept on dark; cream variant uses cream texture) ── */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            bg === "dark"
              ? "repeating-linear-gradient(45deg, transparent 0 3px, rgba(251,205,50,0.015) 3px 4px)"
              : "repeating-linear-gradient(45deg, transparent 0 3px, rgba(56,31,0,0.025) 3px 4px)",
        }}
      />

      {corner && <CornerHex />}

      {/* paddingTop reserves space for the fixed 64px NavBar +16px breathing room */}
      <div className="relative z-20" style={{ paddingTop: 80 }}>
        {children}
      </div>
    </div>
  );
}
