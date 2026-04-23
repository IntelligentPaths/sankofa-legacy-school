"use client";

import { useEffect, useRef } from "react";

/* ── atmosphere: drifting gold particles ── */

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  driftPhase: number;
  alpha: number;
  colorStop: number;
};

const PARTICLE_COUNT = 60;

function readBrandColors() {
  if (typeof window === "undefined") {
    return { goldPrimary: "#FBCD32", goldWarm: "#F5A623" };
  }
  const styles = getComputedStyle(document.documentElement);
  return {
    goldPrimary: styles.getPropertyValue("--gold-primary").trim() || "#FBCD32",
    goldWarm: styles.getPropertyValue("--gold-warm").trim() || "#F5A623",
  };
}

function spawnParticle(width: number, height: number, seeded = false): Particle {
  return {
    x: Math.random() * width,
    y: seeded ? Math.random() * height : height + Math.random() * height * 0.2,
    radius: 1.5 + Math.random() * 2,
    speed: 0.2 + Math.random() * 0.6,
    drift: 8 + Math.random() * 14,
    driftPhase: Math.random() * Math.PI * 2,
    alpha: 0.15 + Math.random() * 0.5,
    colorStop: Math.random(),
  };
}

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { goldPrimary, goldWarm } = readBrandColors();

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        spawnParticle(width, height, true)
      );
    };

    const pickColor = (stop: number) => (stop < 0.5 ? goldPrimary : goldWarm);

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = pickColor(p.colorStop);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    resize();

    if (reducedMotion) {
      drawStatic();
      window.addEventListener("resize", () => {
        resize();
        drawStatic();
      });
      return;
    }

    let startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed;
        const xOffset = Math.sin(elapsed + p.driftPhase) * p.drift;

        if (p.y < -20) {
          Object.assign(p, spawnParticle(width, height, false));
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = pickColor(p.colorStop);
        ctx.beginPath();
        ctx.arc(p.x + xOffset, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
