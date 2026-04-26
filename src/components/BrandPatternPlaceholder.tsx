"use client";

import { useId } from "react";

/* ── BrandPatternPlaceholder
 *
 * Adinkra-inspired geometric placeholder used wherever a photograph
 * will eventually live. Designed to read as intentional brand artwork,
 * not a "coming soon" stub. Four variants rotate the gradient and
 * dominant motif so cells read as distinct.
 * ──────────────────────────────────────────────────────────────── */

type Variant = 1 | 2 | 3 | 4;

type Props = {
  variant?: Variant;
  aspectRatio?: string; // e.g. "4 / 3" (default), "16 / 9"
  className?: string;
  ariaLabel?: string;
};

type Palette = {
  bgFrom: string;
  bgTo: string;
  motif: string;
  motifSoft: string;
  accent: string;
};

const PALETTES: Record<Variant, Palette> = {
  1: {
    // Mastery — gold dominant
    bgFrom: "#1C1B20",
    bgTo: "#3A2A0A",
    motif: "#FBCD32",
    motifSoft: "rgba(251,205,50,0.18)",
    accent: "#F5A623",
  },
  2: {
    // Identity — rust accents over warm dark
    bgFrom: "#1C1B20",
    bgTo: "#381F00",
    motif: "#B22714",
    motifSoft: "rgba(178,39,20,0.18)",
    accent: "#FBCD32",
  },
  3: {
    // Creation — warm amber
    bgFrom: "#2A1B05",
    bgTo: "#5A3208",
    motif: "#F5A623",
    motifSoft: "rgba(245,166,35,0.20)",
    accent: "#FBCD32",
  },
  4: {
    // Community — deep amber + brown
    bgFrom: "#1C1B20",
    bgTo: "#381F00",
    motif: "#E38C07",
    motifSoft: "rgba(227,140,7,0.18)",
    accent: "#B22714",
  },
};

export default function BrandPatternPlaceholder({
  variant = 1,
  aspectRatio = "4 / 3",
  className,
  ariaLabel = "Brand pattern placeholder",
}: Props) {
  const reactId = useId().replace(/[:]/g, "");
  const p = PALETTES[variant];

  const gradId = `${reactId}-bg`;
  const motifGradId = `${reactId}-motif`;
  const hexPatternId = `${reactId}-hex`;
  const checkerId = `${reactId}-checker`;

  // Six-pointed angular adinkra-style rosette path (inscribed in 60x60 box)
  const rosette =
    "M30 4 L40 22 L58 22 L46 36 L52 56 L30 46 L8 56 L14 36 L2 22 L20 22 Z";

  // Pointy-top hexagon path (radius 18 around origin)
  const hex =
    "M0 -18 L15.59 -9 L15.59 9 L0 18 L-15.59 9 L-15.59 -9 Z";

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: "100%",
        aspectRatio,
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid rgba(251,205,50,0.18)",
        background: `linear-gradient(135deg, ${p.bgFrom}, ${p.bgTo})`,
      }}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: "block", position: "absolute", inset: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* gradient from soft motif color into accent */}
          <linearGradient
            id={motifGradId}
            x1="0"
            y1="0"
            x2="400"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={p.motif} stopOpacity="0.65" />
            <stop offset="100%" stopColor={p.accent} stopOpacity="0.45" />
          </linearGradient>

          {/* radial highlight bloom */}
          <radialGradient
            id={gradId}
            cx="50%"
            cy="35%"
            r="65%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={p.motif} stopOpacity="0.30" />
            <stop offset="60%" stopColor={p.motif} stopOpacity="0.05" />
            <stop offset="100%" stopColor={p.motif} stopOpacity="0" />
          </radialGradient>

          {/* hexagonal lattice */}
          <pattern
            id={hexPatternId}
            x="0"
            y="0"
            width="62"
            height="54"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={hex}
              transform="translate(31, 27)"
              fill="none"
              stroke={p.motifSoft}
              strokeWidth="1"
            />
          </pattern>

          {/* checkerboard hairline (gold/amber/black brand kit edge motif) */}
          <pattern
            id={checkerId}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="10" height="10" fill={p.motif} fillOpacity="0.85" />
            <rect x="10" width="10" height="10" fill="#1C1B20" />
            <rect y="10" width="10" height="10" fill="#1C1B20" />
            <rect
              x="10"
              y="10"
              width="10"
              height="10"
              fill={p.accent}
              fillOpacity="0.85"
            />
          </pattern>
        </defs>

        {/* radial bloom backdrop */}
        <rect width="400" height="300" fill={`url(#${gradId})`} />

        {/* hexagonal lattice covering whole canvas */}
        <rect
          width="400"
          height="300"
          fill={`url(#${hexPatternId})`}
          opacity="0.85"
        />

        {/* central rosette — large faint, plus smaller sharp instances */}
        <g opacity="0.85">
          <g transform="translate(200, 150)">
            <path
              d={rosette}
              transform="translate(-30, -30) scale(2.6)"
              fill={`url(#${motifGradId})`}
              opacity="0.55"
            />
            <path
              d={rosette}
              transform="translate(-30, -30) scale(2.6)"
              fill="none"
              stroke={p.motif}
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
          </g>

          {/* corner rosettes (variant rotates which corners are heaviest) */}
          {variant === 1 && (
            <>
              <path
                d={rosette}
                transform="translate(40, 40)"
                fill={p.motif}
                opacity="0.18"
              />
              <path
                d={rosette}
                transform="translate(300, 200)"
                fill={p.accent}
                opacity="0.22"
              />
            </>
          )}
          {variant === 2 && (
            <>
              <path
                d={rosette}
                transform="translate(280, 30)"
                fill={p.motif}
                opacity="0.20"
              />
              <path
                d={rosette}
                transform="translate(60, 220)"
                fill={p.accent}
                opacity="0.20"
              />
            </>
          )}
          {variant === 3 && (
            <>
              <path
                d={rosette}
                transform="translate(70, 200)"
                fill={p.motif}
                opacity="0.22"
              />
              <path
                d={rosette}
                transform="translate(310, 80)"
                fill={p.accent}
                opacity="0.18"
              />
            </>
          )}
          {variant === 4 && (
            <>
              <path
                d={rosette}
                transform="translate(40, 220)"
                fill={p.motif}
                opacity="0.20"
              />
              <path
                d={rosette}
                transform="translate(300, 30)"
                fill={p.accent}
                opacity="0.22"
              />
            </>
          )}
        </g>

        {/* checkerboard hairline along top + bottom edges */}
        <rect width="400" height="6" fill={`url(#${checkerId})`} opacity="0.65" />
        <rect
          y="294"
          width="400"
          height="6"
          fill={`url(#${checkerId})`}
          opacity="0.65"
        />

        {/* faint diagonal grain */}
        <path
          d="M-50 320 L420 -100"
          stroke={p.motif}
          strokeOpacity="0.08"
          strokeWidth="60"
        />
      </svg>
    </div>
  );
}
