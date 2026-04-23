"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/* ── ssr-safe client gate ── */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

/* ── reduced-motion preference ── */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefers;
}

/* ── FadeIn: viewport-triggered fade/rise ── */
type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  y = 30,
  duration = 0.7,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once });
  const reducedMotion = usePrefersReducedMotion();

  const offsetY = reducedMotion ? 0 : y;
  const dur = reducedMotion ? 0.3 : duration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offsetY }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY }}
      transition={{ delay, duration: dur, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerChildren: orchestrator ── */
type StaggerProps = {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
};

export function StaggerChildren({
  children,
  staggerDelay = 0.12,
  className,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: true });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerItem: child ── */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
