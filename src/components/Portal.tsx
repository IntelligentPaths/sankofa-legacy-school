"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import SankofaHexagon from "./SankofaHexagon";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── portal: cinematic intro — doors opening ── */

type Props = { onComplete: () => void };

const HEX_SIZE = 280;

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
        await hexControls.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });
        if (cancelled) return;
        await wait(400);
        if (cancelled) return;
        await overlayControls.start({
          opacity: 0,
          transition: { duration: 0.5 },
        });
        if (!cancelled) fireComplete();
        return;
      }

      /* ── seam glow appears during assembly ── */
      const seamFadeIn = (async () => {
        await wait(300);
        if (cancelled) return;
        await seamControls.start({
          opacity: 0.9,
          transition: { duration: 0.4, ease: "easeOut" },
        });
      })();

      /* ── assembly + pulse (0 → 1600ms) ── */
      const pulse = hexControls.start({
        scale: [0.85, 1.0, 1.04, 1.0],
        opacity: [0, 1, 1, 1],
        transition: {
          duration: 1.6,
          times: [0, 0.375, 0.6875, 1],
          ease: "easeInOut",
        },
      });

      await Promise.all([seamFadeIn, pulse]);
      if (cancelled) return;

      /* ── opening phase (1600 → 3200ms): doors swing, seam dissolves, bloom emerges, overlay fades ── */
      const slide = Promise.all([
        leftControls.start({
          x: "-100vw",
          rotate: -4,
          scale: 1.05,
          transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
        }),
        rightControls.start({
          x: "100vw",
          rotate: 4,
          scale: 1.05,
          transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
        }),
      ]);

      const seamDissolve = seamControls.start({
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 1.6, ease: "easeOut" },
      });

      const bloom = (async () => {
        await wait(300); // t=1900
        if (cancelled) return;
        await bloomControls.start({
          scale: [0, 50],
          opacity: [0, 0.85, 0],
          transition: {
            duration: 1.3,
            times: [0, 0.4, 1],
            ease: "easeOut",
          },
        });
      })();

      const fadeOverlay = (async () => {
        await wait(1300); // t=2900
        if (cancelled) return;
        await overlayControls.start({
          opacity: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      })();

      await Promise.all([slide, seamDissolve, bloom, fadeOverlay]);
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
      {reducedMotion ? (
        <motion.div initial={{ opacity: 0 }} animate={hexControls}>
          <SankofaHexagon size={HEX_SIZE} uniqueId="portal-rm" />
        </motion.div>
      ) : (
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
