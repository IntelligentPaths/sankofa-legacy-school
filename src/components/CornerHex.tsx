"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import SankofaHexagon from "./SankofaHexagon";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── corner hex: nav anchor, rotates subtly on scroll ── */

export default function CornerHex() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Map scroll [0, 600px] to rotation [0, 18deg] and glow [0.3, 0.8]
  const rotate = useTransform(scrollY, [0, 600], [0, 18], { clamp: true });
  const glowAlpha = useTransform(scrollY, [0, 600], [0.3, 0.8], {
    clamp: true,
  });
  const filter = useMotionTemplate`drop-shadow(0 0 10px rgba(251, 205, 50, ${glowAlpha}))`;

  return (
    <a
      href="/"
      aria-label="Sankofa Legacy School — home"
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 30,
        display: "block",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={reduced ? undefined : { rotate, filter }}
      >
        <SankofaHexagon size={48} uniqueId="corner" />
      </motion.div>
    </a>
  );
}
