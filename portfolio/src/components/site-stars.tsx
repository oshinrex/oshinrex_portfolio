"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const GOLD = "#b8863f";

const STAR_PATH =
  "M10,1 L11.4,7.7 L18.7,7.7 L12.9,11.9 L15,18.5 L10,14.3 L5,18.5 L7.1,11.9 L1.3,7.7 L8.6,7.7 Z";

const SPARKLE_PATH =
  "M10,1 C11.3,6.2 13.4,8.3 19,10 C13.4,11.7 11.3,13.8 10,19 C8.7,13.8 6.6,11.7 1,10 C6.6,8.3 8.7,6.2 10,1 Z";

// The content column tops out at max-w-6xl (72rem = 1152px), so anything
// placed further than 576px from the horizontal center is guaranteed to
// sit in the empty margin outside every section's text — never over a
// word. On narrow viewports these offsets push the marks off-screen
// entirely, which is fine: there's no gutter to put them in there anyway.
const MIN_OFFSET = 610;
const MAX_OFFSET = 940;

type SiteMark = {
  topPct: number;
  offset: number;
  side: "left" | "right";
  size: number;
  o: number;
  sparkle: boolean;
  glow: boolean;
};

function generateMarks(count: number): SiteMark[] {
  const marks: SiteMark[] = [];
  for (let i = 0; i < count; i++) {
    marks.push({
      topPct: 4 + Math.random() * 94,
      offset: MIN_OFFSET + Math.random() * (MAX_OFFSET - MIN_OFFSET),
      side: Math.random() < 0.5 ? "left" : "right",
      size: Math.random() < 0.15 ? 14 + Math.random() * 10 : 6 + Math.random() * 8,
      o: 0.15 + Math.random() * 0.28,
      sparkle: Math.random() < 0.35,
      glow: Math.random() < 0.16,
    });
  }
  return marks;
}

export function SiteStars() {
  const [marks, setMarks] = useState<SiteMark[] | null>(null);
  const [twinkle, setTwinkle] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: positions are randomized client-side so the field differs per load without an SSR/client mismatch.
    setMarks(generateMarks(70));
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTwinkle(true);
    }
  }, []);

  if (!marks) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {marks.map((m, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${m.topPct}%`,
            width: m.size,
            height: m.size,
            ...(m.side === "left"
              ? { left: `calc(50% - ${m.offset}px)` }
              : { right: `calc(50% - ${m.offset}px)` }),
          }}
          animate={
            twinkle ? { opacity: [m.o, m.o + 0.4, m.o] } : { opacity: m.o }
          }
          transition={
            twinkle
              ? {
                  duration: 1.8 + (i % 6) * 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: (i % 9) * 0.35,
                  ease: "easeInOut",
                }
              : { duration: 0 }
          }
        >
          <svg
            viewBox="0 0 20 20"
            className="h-full w-full"
            style={
              m.glow
                ? { filter: `drop-shadow(0 0 ${m.size * 0.3}px rgba(184,134,63,0.6))` }
                : undefined
            }
          >
            <path
              d={m.sparkle ? SPARKLE_PATH : STAR_PATH}
              fill={m.glow ? GOLD : "var(--color-ink)"}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
