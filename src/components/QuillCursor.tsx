"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasMounted, usePrefersReducedMotion } from "@/lib/motion";

/* ── quill cursor: feather follows the pointer, tilts with velocity ── */

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"]';

export default function QuillCursor() {
  const mounted = useHasMounted();
  const reducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 250, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 250, mass: 0.4 });

  const rotateTarget = useMotionValue(-30);
  const rotate = useSpring(rotateTarget, { damping: 20, stiffness: 200 });

  const scaleTarget = useMotionValue(1);
  const scale = useSpring(scaleTarget, { damping: 20, stiffness: 200 });

  useEffect(() => {
    if (!mounted) return;

    let prevX = 0;
    let resetTimer: number | null = null;

    const onMove = (e: MouseEvent) => {
      // tip of quill sits at ~(8, 32) of the 36x36 SVG — offset so tip tracks pointer
      x.set(e.clientX - 8);
      y.set(e.clientY - 4);

      const vx = e.clientX - prevX;
      prevX = e.clientX;
      const clamped = Math.max(-15, Math.min(15, vx * 0.15));
      rotateTarget.set(-30 + clamped);

      if (resetTimer !== null) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        rotateTarget.set(-30);
      }, 120);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = !!target?.closest?.(INTERACTIVE_SELECTOR);
      scaleTarget.set(isInteractive ? 1.2 : 1);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
    };
  }, [mounted, x, y, rotateTarget, scaleTarget]);

  if (!mounted) return null;
  if (reducedMotion) return null;
  if (window.matchMedia("(hover: none)").matches) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        pointerEvents: "none",
        zIndex: 60,
        x: springX,
        y: springY,
        rotate,
        scale,
        filter: "drop-shadow(0 0 4px rgba(251,205,50,0.5))",
      }}
    >
      <svg
        viewBox="0 0 36 36"
        width="36"
        height="36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="quill-grad"
            x1="0"
            y1="0"
            x2="0"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FBCD32" />
            <stop offset="100%" stopColor="#E38C07" />
          </linearGradient>
        </defs>

        {/* feather */}
        <path
          d="M 30 3 C 28 8, 24 14, 18 20 C 12 26, 6 30, 3 33 L 6 33 L 9 30 C 14 25, 20 20, 26 14 C 30 9, 32 6, 30 3 Z"
          fill="url(#quill-grad)"
        />

        {/* spine */}
        <path
          d="M 30 3 L 4 32"
          stroke="#381F00"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* barbs */}
        <g stroke="url(#quill-grad)" strokeWidth="0.7" opacity="0.85">
          <line x1="24" y1="8" x2="28" y2="5" />
          <line x1="19" y1="13" x2="24" y2="9" />
          <line x1="14" y1="18" x2="19" y2="13" />
        </g>
      </svg>
    </motion.div>
  );
}
