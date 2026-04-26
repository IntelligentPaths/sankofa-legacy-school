"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import SankofaHexagon from "./SankofaHexagon";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── portal: cinematic intro — doors opening, full logo emerges from bloom ── */

type Props = { onComplete: () => void };

const HEX_SIZE = 280;
const LOGO_REVEAL_WIDTH = 600;

const PANEL_IMAGE =
  "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4))," +
  "repeating-linear-gradient(0deg, rgba(251,205,50,0.035) 0px, rgba(251,205,50,0.035) 1px, transparent 1px, transparent 14px)";

export default function Portal({ onComplete }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const completedRef = useRef(false);

  const overlayControls = useAnimationControls();
  const leftControls = useAnimationControls();
  const rightControls = useAnimationControls();
  const hexControls = useAnimationControls();
  const bloomControls = useAnimationControls();
  const seamControls = useAnimationControls();
  const logoControls = useAnimationControls();

  const fireComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    async function run() {
      if (reducedMotion) {
        // Reduced motion: just fade the full logo in, hold, fade out.
        await logoControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        });
        if (cancelled) return;
        await wait(700);
        if (cancelled) return;
        await overlayControls.start({
          opacity: 0,
          transition: { duration: 0.5 },
        });
        if (!cancelled) fireComplete();
        return;
      }

      /* ── seam glow appears during assembly (t=300 → t=700) ── */
      const seamFadeIn = (async () => {
        await wait(300);
        if (cancelled) return;
        await seamControls.start({
          opacity: 0.9,
          transition: { duration: 0.4, ease: "easeOut" },
        });
      })();

      /* ── assembly + pulse + hold (0 → 1800ms) ── */
      const pulse = hexControls.start({
        scale: [0.85, 1.0, 1.04, 1.0, 1.0],
        opacity: [0, 1, 1, 1, 1],
        transition: {
          duration: 1.8,
          times: [0, 0.333, 0.611, 0.889, 1.0],
          ease: "easeInOut",
        },
      });

      await Promise.all([seamFadeIn, pulse]);
      if (cancelled) return;

      /* ── opening phase (1800 → 4200ms) ── */
      const slide = Promise.all([
        leftControls.start({
          x: "-100vw",
          rotate: -4,
          scale: 1.05,
          transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
        }),
        rightControls.start({
          x: "100vw",
          rotate: 4,
          scale: 1.05,
          transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
        }),
      ]);

      const seamDissolve = (async () => {
        await wait(1200); // t=3000
        if (cancelled) return;
        await seamControls.start({
          opacity: 0,
          filter: "blur(20px)",
          transition: { duration: 1.2, ease: "easeOut" },
        });
      })();

      const bloom = (async () => {
        await wait(400); // t=2200
        if (cancelled) return;
        await bloomControls.start({
          scale: [0, 50],
          opacity: [0, 0.85, 0],
          transition: {
            duration: 2.0,
            times: [0, 0.4, 1],
            ease: "easeOut",
          },
        });
      })();

      /* ── logo reveal: emerges from bloom at t=3800, holds, fades with overlay ── */
      const logoReveal = (async () => {
        await wait(2000); // t=3800 — overlaps with last 400ms of bloom so logo grows from the gold light
        if (cancelled) return;
        await logoControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        });
        if (cancelled) return;
        // hold visible for ~600ms (t=4200 → t=4800)
        await wait(600);
      })();

      /* ── final fade: logo + overlay together (t=4800 → t=5200) ── */
      const finalFade = (async () => {
        await wait(3000); // t=4800
        if (cancelled) return;
        await Promise.all([
          logoControls.start({
            opacity: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          }),
          overlayControls.start({
            opacity: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          }),
        ]);
      })();

      await Promise.all([slide, seamDissolve, bloom, logoReveal, finalFade]);
      if (!cancelled) fireComplete();
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={overlayControls}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--near-black)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {reducedMotion ? null : (
        <>
          {/* ── left door panel ── */}
          <motion.div
            initial={{ x: 0, rotate: 0, scale: 1 }}
            animate={leftControls}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50vw",
              height: "100vh",
              overflow: "hidden",
              transformOrigin: "100% 50%",
              backgroundColor: "var(--near-black)",
              backgroundImage: PANEL_IMAGE,
              boxShadow: "inset -1px 0 0 rgba(251,205,50,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translate(50%, -50%)",
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={hexControls}
              >
                <SankofaHexagon size={HEX_SIZE} uniqueId="portal-left" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── right door panel ── */}
          <motion.div
            initial={{ x: 0, rotate: 0, scale: 1 }}
            animate={rightControls}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50vw",
              height: "100vh",
              overflow: "hidden",
              transformOrigin: "0% 50%",
              backgroundColor: "var(--near-black)",
              backgroundImage: PANEL_IMAGE,
              boxShadow: "inset 1px 0 0 rgba(251,205,50,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={hexControls}
              >
                <SankofaHexagon size={HEX_SIZE} uniqueId="portal-right" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── seam glow ── */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(0px)" }}
            animate={seamControls}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              height: "100vh",
              background:
                "linear-gradient(to bottom, transparent, rgba(251,205,50,0.6), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* ── gold bloom ── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={bloomControls}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 40,
              height: 40,
              marginTop: -20,
              marginLeft: -20,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(251,205,50,0.95) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* ── full logo reveal — sits above bloom, scales in from center ── */}
      <motion.img
        src="/logos/sankofa-full-logo.svg"
        alt="Sankofa Legacy School"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={logoControls}
        style={{
          position: "relative",
          width: "min(80vw, " + LOGO_REVEAL_WIDTH + "px)",
          height: "auto",
          zIndex: 1,
          filter: "drop-shadow(0 8px 32px rgba(251,205,50,0.35))",
        }}
      />

      {/* ── skip button ── */}
      <button
        onClick={fireComplete}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--gold-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-muted)";
        }}
        aria-label="Skip intro animation"
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          color: "var(--text-muted)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 101,
          padding: 0,
        }}
      >
        Skip
      </button>
    </motion.div>
  );
}
