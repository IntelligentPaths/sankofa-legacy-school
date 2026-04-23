"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useHasMounted, usePrefersReducedMotion } from "@/lib/motion";

const QUILL_WIDTH = 45;
const QUILL_HEIGHT = 48;

export default function QuillCursor() {
  const hasMounted = useHasMounted();
  const reducedMotion = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Raw motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const tiltRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);

  // Smoothed springs â position is snappy, tilt & scale are softer
  const x = useSpring(mouseX, { damping: 30, stiffness: 260, mass: 0.4 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 260, mass: 0.4 });
  const rotate = useSpring(tiltRaw, { damping: 22, stiffness: 180, mass: 0.3 });
  const scale = useSpring(scaleRaw, { damping: 24, stiffness: 240, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!hasMounted || reducedMotion || isTouch) return;

    let lastX = 0;
    let lastTime = performance.now();

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Velocity-based tilt
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const vx = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;

      const tilt = Math.max(-10, Math.min(10, vx * 40));
      tiltRaw.set(tilt);

      // Interactive-element detection
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"]'
        );
        const hover = Boolean(interactive);
        setIsHovering(hover);
        scaleRaw.set(hover ? 1.25 : 1);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasMounted, reducedMotion, isTouch, mouseX, mouseY, tiltRaw, scaleRaw]);

  if (!hasMounted || reducedMotion || isTouch) return null;

  return (
    <motion.div
      aria-hidden
      style={
        {
          position: "fixed",
          top: 0,
          left: 0,
          width: QUILL_WIDTH,
          height: QUILL_HEIGHT,
          pointerEvents: "none",
          zIndex: 60,
          x,
          y,
          // Nib tip is at bottom-left of the SVG box.
          // Offset so the bottom-left pixel of the component lands on the cursor position.
          translateX: 0,
          translateY: -QUILL_HEIGHT,
          rotate,
          scale,
          transformOrigin: "0% 100%",
          filter: isHovering
            ? "drop-shadow(0 0 8px rgba(251, 205, 50, 0.75))"
            : "drop-shadow(0 0 4px rgba(251, 205, 50, 0.45))",
          transition: "filter 0.2s ease",
        } as unknown as React.CSSProperties
      }
    >
      <svg
        viewBox="-10 -815 760 820"
        width={QUILL_WIDTH}
        height={QUILL_HEIGHT}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="quill-fill"
            x1="0"
            y1="-810"
            x2="0"
            y2="5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FBCD32" />
            <stop offset="70%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#E38C07" />
          </linearGradient>
        </defs>
        <g transform="translate(-350.61, -810.09)">
          <path
            d="M 1095.449219 0 C 1028.15625 10.300781 871.109375 90.058594 815.089844 132.957031 C 685.121094 232.519531 535.972656 358.105469 515.820312 570.199219 C 609.660156 457.84375 825.121094 202.765625 960.0625 111.550781 C 765.375 284.476562 635.226562 451.628906 490.519531 621.265625 L 472.851562 606.078125 C 471.789062 605.191406 470.632812 604.835938 469.300781 605.011719 C 468.058594 605.191406 466.992188 605.902344 466.371094 606.96875 L 454.566406 628.28125 C 447.90625 640.273438 440.003906 649.332031 428.996094 657.59375 L 382.921875 692.140625 C 380.878906 693.652344 379.636719 695.425781 378.835938 697.824219 L 343.859375 804.316406 L 410.53125 726.425781 C 404.40625 718.609375 404.140625 707.59375 410.441406 700.136719 C 417.722656 691.609375 431.039062 690.988281 440.09375 698.714844 C 449.148438 706.441406 450.570312 719.675781 443.203125 728.199219 C 436.808594 735.660156 425.890625 737.082031 417.277344 732.195312 L 350.605469 810.089844 L 450.480469 759.109375 C 452.699219 757.953125 454.296875 756.355469 455.453125 754.222656 L 482.441406 703.332031 C 488.921875 691.164062 496.554688 682.015625 507.476562 673.578125 L 526.652344 658.65625 C 527.628906 657.859375 528.160156 656.792969 528.160156 655.460938 C 528.160156 654.128906 527.628906 652.972656 526.5625 652.085938 L 511.472656 639.207031 C 522.035156 626.328125 545.207031 601.015625 550.179688 597.109375 C 576.011719 576.769531 709.621094 572.683594 761.824219 511.222656 C 743.089844 515.398438 696.304688 510.335938 675.53125 503.675781 C 705.625 501.71875 761.203125 508.648438 800.796875 468.679688 C 845.183594 423.738281 964.058594 308.636719 986.605469 254.457031 C 962.015625 260.761719 922.597656 258.363281 902.269531 250.550781 C 957.933594 241.84375 978.882812 240.425781 1006.582031 213.78125 C 1018.390625 202.410156 1090.296875 21.847656 1095.359375 -0.0898438 Z M 1095.449219 0 "
            fill="url(#quill-fill)"
            fillRule="evenodd"
          />
        </g>
      </svg>
    </motion.div>
  );
}
