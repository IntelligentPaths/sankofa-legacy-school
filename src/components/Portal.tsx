"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── portal: cinematic intro — doors open onto the homepage directly.
 *
 * Round 6: assembling/pulsing/splitting element is now the real brand
 * mark (sankofa-logo-mark.svg) instead of the procedural SankofaHexagon.
 * The clip-and-swing-open mechanic is unchanged: each 50vw wrapper
 * renders a full mark centered on the seam, and the wrapper's
 * `overflow: hidden` clips the half outside its viewport column.
 *
 * Round 4: visible center seam already removed. Logo reveal phase
 * removed — the portal ends with bloom + overlay fade.
 * ──────────────────────────────────────────────────────────────── */

type Props = { onComplete: () => void };

const MARK_SIZE = 280;
const MARK_SRC = "/logos/sankofa-logo-mark.svg";

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
        // Reduced motion: brief hex fade in, hold, fade overlay out — no doors, no logo screen.
        await hexControls.start({
          scale: 1,
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

      /* ── assembly + pulse + hold (0 → 1800ms) ── */
      await hexControls.start({
        scale: [0.85, 1.0, 1.04, 1.0, 1.0],
        opacity: [0, 1, 1, 1, 1],
        transition: {
          duration: 1.8,
          times: [0, 0.333, 0.611, 0.889, 1.0],
          ease: "easeInOut",
        },
      });
      if (cancelled) return;

      /* ── opening phase (1800 → 4200ms): doors swing, bloom emerges through the gap ── */
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

      const fadeOverlay = (async () => {
        await wait(1900); // t=3700 — start fading overlay near end of slide so reveal lands cleanly
        if (cancelled) return;
        await overlayControls.start({
          opacity: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      })();

      await Promise.all([slide, bloom, fadeOverlay]);
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
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={hexControls}>
          <img
            src={MARK_SRC}
            alt="Sankofa Legacy School"
            width={MARK_SIZE}
            height={MARK_SIZE}
            style={{ display: "block", width: MARK_SIZE, height: MARK_SIZE }}
          />
        </motion.div>
      ) : (
        <>
          {/* ── left door panel (no inset gold edge — kills the visible center seam) ── */}
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
                <img
                  src={MARK_SRC}
                  alt=""
                  aria-hidden
                  width={MARK_SIZE}
                  height={MARK_SIZE}
                  style={{ display: "block", width: MARK_SIZE, height: MARK_SIZE }}
                />
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
                <img
                  src={MARK_SRC}
                  alt=""
                  aria-hidden
                  width={MARK_SIZE}
                  height={MARK_SIZE}
                  style={{ display: "block", width: MARK_SIZE, height: MARK_SIZE }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ── gold bloom (light through the opening gap) ── */}
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
