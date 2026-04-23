"use client";

import { useId } from "react";

/* ── sankofa hexagon: brand mark ── */

type Props = {
  size?: number;
  className?: string;
  uniqueId?: string;
};

export default function SankofaHexagon({
  size = 200,
  className,
  uniqueId,
}: Props) {
  const reactId = useId();
  const id = uniqueId ?? reactId.replace(/[:]/g, "");

  const strokeId = `${id}-stroke`;
  const fillId = `${id}-fill`;

  // pointy-top hexagon, centered at (100, 110), radius 95
  const cx = 100;
  const cy = 110;
  const r = 95;
  const points: [number, number][] = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
  const hexPath =
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") +
    " Z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 220"
      width={size}
      height={size}
      className={className}
      aria-label="Sankofa bird inside a hexagon"
      role="img"
    >
      <defs>
        <linearGradient
          id={strokeId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="220"
        >
          <stop offset="0%" stopColor="var(--gold-primary)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
        <linearGradient
          id={fillId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="220"
        >
          <stop offset="0%" stopColor="var(--gold-primary)" />
          <stop offset="100%" stopColor="var(--gold-warm)" />
        </linearGradient>
      </defs>

      {/* hexagon outline */}
      <path d={hexPath} stroke={`url(#${strokeId})`} strokeWidth={3} fill="none" strokeLinejoin="round" />

      {/* sankofa bird — stylized silhouette */}
      <g fill={`url(#${fillId})`}>
        {/* body: teardrop tilted forward (to the right) */}
        <path d="M 70 130 C 70 108, 92 98, 118 108 C 138 116, 140 132, 128 144 C 114 158, 86 158, 74 148 C 70 144, 70 138, 70 130 Z" />

        {/* neck arching up and curving backward (to the left) */}
        <path d="M 96 112 C 92 96, 84 84, 72 78 C 62 74, 54 76, 52 82 C 50 88, 56 92, 64 94 C 74 96, 82 104, 86 116 Z" />

        {/* head — small rounded shape at top-left, facing back */}
        <path d="M 58 72 C 48 70, 42 76, 44 84 C 46 90, 54 92, 60 88 C 66 84, 68 78, 64 74 C 62 72, 60 72, 58 72 Z" />

        {/* beak — short pointed triangle facing left/back */}
        <path d="M 46 80 L 38 82 L 46 86 Z" />

        {/* tail feathers — three curved strokes sweeping back and down */}
        <path d="M 128 142 C 148 146, 162 152, 170 162 C 164 162, 150 158, 134 154 Z" />
        <path d="M 130 150 C 152 158, 166 170, 170 180 C 160 178, 146 170, 132 162 Z" />
        <path d="M 126 156 C 142 170, 150 182, 150 192 C 140 186, 128 174, 122 164 Z" />

        {/* egg — small circle in front of chest */}
        <circle cx="120" cy="138" r="6" />
      </g>

      {/* eye — small dark dot on the head */}
      <circle cx="54" cy="80" r="1.8" fill="var(--near-black)" />
    </svg>
  );
}
