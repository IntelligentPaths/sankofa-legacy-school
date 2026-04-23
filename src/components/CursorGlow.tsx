"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasMounted, usePrefersReducedMotion } from "@/lib/motion";

/* ── cursor glow: soft gold halo tracking the pointer ── */

export default function CursorGlow() {
  const mounted = useHasMounted();
  const reducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { damping: 28, stiffness: 180, mass: 0.5 });
  const springY = useSpring(y, { damping: 28, stiffness: 180, mass: 0.5 });

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: MouseEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mounted, x, y]);

  if (!mounted) return null;
  if (reducedMotion) return null;
  // touch device — no real cursor to follow
  if (window.matchMedia("(hover: none)").matches) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(251,205,50,0.12) 0%, rgba(245,166,35,0.06) 35%, transparent 70%)",
        mixBlendMode: "screen",
        pointerEvents: "none",
        zIndex: 15,
        x: springX,
        y: springY,
      }}
    />
  );
}
