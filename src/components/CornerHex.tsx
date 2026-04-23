"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import SankofaHexagon from "./SankofaHexagon";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── corner hex: nav anchor, rotates subtly on scroll ── */

export default function CornerHex() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 600], [0, 18], { clamp: true });
  const shadowIntensity = useTransform(scrollY, [0, 600], [0.3, 0.75], {
    clamp: true,
  });
  const filter = useTransform(
    shadowIntensity,
    (i) => `drop-shadow(0 0 12px rgba(251,205,50,${i}))`
  );

  return (
    <a
      href="/"
      aria-label="Sankofa Legacy School — home"
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 30,
        display: "inline-block",
        lineHeight: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={reducedMotion ? undefined : { rotate, filter }}
      >
        <SankofaHexagon size={48} uniqueId="corner" />
      </motion.div>
    </a>
  );
}
