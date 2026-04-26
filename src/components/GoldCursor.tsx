"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useHasMounted, usePrefersReducedMotion } from "@/lib/motion";

/* ── GoldCursor
 *
 * Standard arrow shape, brand gold fill, deep-amber edge stroke.
 * Replaces QuillCursor. Same null-out conditions, same spring scaffolding.
 * No velocity tilt — arrows shouldn't rotate as they move.
 * ──────────────────────────────────────────────────────────────── */

const CURSOR_SIZE = 22;

export default function GoldCursor() {
  const hasMounted = useHasMounted();
  const reducedMotion = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scaleRaw = useMotionValue(1);

  // Round 2: snappier — track 1:1 with the pointer instead of trailing.
  const x = useSpring(mouseX, { damping: 50, stiffness: 800, mass: 0.3 });
  const y = useSpring(mouseY, { damping: 50, stiffness: 800, mass: 0.3 });
  const scale = useSpring(scaleRaw, { damping: 20, stiffness: 400 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!hasMounted || reducedMotion || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"]'
        );
        const hover = Boolean(interactive);
        setIsHovering(hover);
        scaleRaw.set(hover ? 1.2 : 1);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasMounted, reducedMotion, isTouch, mouseX, mouseY, scaleRaw]);

  if (!hasMounted || reducedMotion || isTouch) return null;

  return (
    <motion.div
      aria-hidden
      style={
        {
          position: "fixed",
          top: 0,
          left: 0,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          pointerEvents: "none",
          zIndex: 60,
          x,
          y,
          scale,
          transformOrigin: "0% 0%", // tip is at top-left of SVG
          filter: isHovering
            ? "drop-shadow(0 1px 3px rgba(0,0,0,0.55)) drop-shadow(0 0 6px rgba(251,205,50,0.55))"
            : "drop-shadow(0 1px 2px rgba(0,0,0,0.45))",
          transition: "filter 0.18s ease",
        } as unknown as React.CSSProperties
      }
    >
      <svg
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Standard arrow pointer — tip at (1,1), tail bottom-right */}
        <path
          d="M 1 1 L 1 17 L 5.6 13.2 L 8.4 19.6 L 11.0 18.4 L 8.2 12.0 L 14.0 12.0 Z"
          fill="#FBCD32"
          stroke="#E38C07"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
