"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

// A five-pointed star and a four-pointed sparkle, both unit-sized (span
// roughly -1..1), positioned via a translate+scale transform so every
// mark reuses the same two path shapes.
const STAR_PATH =
  "M0,-1 L0.225,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.225,-0.309 Z";

const SPARKLE_PATH =
  "M0,-1 C0.16,-0.38 0.38,-0.16 1,0 C0.38,0.16 0.16,0.38 0,1 C-0.16,0.38 -0.38,0.16 -1,0 C-0.38,-0.16 -0.16,-0.38 0,-1 Z";

// The Big Dipper: four stars forming the bowl (closed quadrilateral),
// three more tracing the handle out from Megrez — straight segments
// only, positioned above the name and well clear of the text.
const DIPPER = {
  dubhe: { x: 950, y: 70 },
  merak: { x: 960, y: 150 },
  phecda: { x: 1050, y: 160 },
  megrez: { x: 1060, y: 80 },
  alioth: { x: 1130, y: 65 },
  mizar: { x: 1200, y: 50 },
  alkaid: { x: 1260, y: 85 },
};

const TRAIL_PATH =
  `M ${DIPPER.dubhe.x},${DIPPER.dubhe.y} ` +
  `L ${DIPPER.merak.x},${DIPPER.merak.y} ` +
  `L ${DIPPER.phecda.x},${DIPPER.phecda.y} ` +
  `L ${DIPPER.megrez.x},${DIPPER.megrez.y} ` +
  `L ${DIPPER.dubhe.x},${DIPPER.dubhe.y} ` +
  `M ${DIPPER.megrez.x},${DIPPER.megrez.y} ` +
  `L ${DIPPER.alioth.x},${DIPPER.alioth.y} ` +
  `L ${DIPPER.mizar.x},${DIPPER.mizar.y} ` +
  `L ${DIPPER.alkaid.x},${DIPPER.alkaid.y}`;

const DIPPER_STARS = Object.values(DIPPER).map((p) => ({ ...p, s: 5 }));

const VIEW_W = 1440;
const VIEW_H = 800;
const GOLD = "#b8863f";

type Mark = {
  x: number;
  y: number;
  s: number;
  o: number;
  sparkle: boolean;
  glow: boolean;
};

// Regions get their own density so the field reads denser around the
// photo and the constellation rather than uniformly scattered.
const REGIONS: { x: [number, number]; y: [number, number]; count: number }[] = [
  { x: [10, 700], y: [30, 760], count: 30 }, // halo around the photo
  { x: [750, 1420], y: [20, 700], count: 24 }, // near the cluster and thread
  { x: [0, 1440], y: [0, 800], count: 26 }, // light dusting everywhere
];

// Keeps marks off the headline/body copy so a bright star never lands
// directly on top of legible text.
const TEXT_SAFE_ZONE = { x: [650, 1260] as [number, number], y: [220, 660] as [number, number] };

function inSafeZone(x: number, y: number) {
  return (
    x < TEXT_SAFE_ZONE.x[0] ||
    x > TEXT_SAFE_ZONE.x[1] ||
    y < TEXT_SAFE_ZONE.y[0] ||
    y > TEXT_SAFE_ZONE.y[1]
  );
}

function generateMarks(): Mark[] {
  const marks: Mark[] = [];
  for (const region of REGIONS) {
    for (let i = 0; i < region.count; i++) {
      let x = 0;
      let y = 0;
      for (let attempt = 0; attempt < 20; attempt++) {
        x = region.x[0] + Math.random() * (region.x[1] - region.x[0]);
        y = region.y[0] + Math.random() * (region.y[1] - region.y[0]);
        if (inSafeZone(x, y)) break;
      }
      // Retries make this vanishingly unlikely, not impossible — if every
      // attempt still landed on the text, push the point outside the safe
      // zone's x-range so it's guaranteed clear, rather than risk a star
      // sitting on top of a word.
      if (!inSafeZone(x, y)) {
        const mid = (TEXT_SAFE_ZONE.x[0] + TEXT_SAFE_ZONE.x[1]) / 2;
        x = x < mid ? TEXT_SAFE_ZONE.x[0] - 20 : TEXT_SAFE_ZONE.x[1] + 20;
      }
      const big = Math.random() < 0.18;
      marks.push({
        x,
        y,
        s: big ? 8 + Math.random() * 8 : 2.5 + Math.random() * 5,
        o: 0.18 + Math.random() * 0.3,
        sparkle: Math.random() < 0.35,
        glow: Math.random() < 0.18,
      });
    }
  }
  return marks;
}

const DRAW_DELAY_MS = 150;

// Self-contained: does its own reduced-motion check rather than trusting a
// flag from a parent's layout effect, which fires *after* this one and
// would otherwise race with the "hidden" state this needs to establish
// before the browser's first paint.
function TrailLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(false);
    }
  }, []);

  useEffect(() => {
    if (drawn) return;
    const t = setTimeout(() => setDrawn(true), DRAW_DELAY_MS);
    return () => clearTimeout(t);
  }, [drawn]);

  if (length === null) {
    return <path ref={pathRef} d={TRAIL_PATH} fill="none" stroke="none" />;
  }

  return (
    <motion.path
      d={TRAIL_PATH}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.55"
      style={{ strokeDasharray: length }}
      animate={{ strokeDashoffset: drawn ? 0 : length }}
      transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}

function TwinklingMark({
  m,
  i,
  twinkle,
}: {
  m: { x: number; y: number; s: number; o?: number; sparkle?: boolean; glow?: boolean };
  i: number;
  twinkle: boolean;
}) {
  const baseOpacity = m.o ?? 0.55;
  return (
    <motion.g
      style={{ transformOrigin: `${m.x}px ${m.y}px` }}
      animate={
        twinkle
          ? { opacity: [baseOpacity, 0.95, baseOpacity], scale: [0.85, 1.25, 0.85] }
          : { opacity: baseOpacity, scale: 1 }
      }
      transition={
        twinkle
          ? {
              duration: 1.6 + (i % 6) * 0.45,
              repeat: Infinity,
              repeatType: "mirror",
              delay: (i % 9) * 0.3,
              ease: "easeInOut",
            }
          : { duration: 0 }
      }
    >
      <path
        d={m.sparkle ? SPARKLE_PATH : STAR_PATH}
        fill={m.glow ? GOLD : "var(--color-ink)"}
        transform={`translate(${m.x} ${m.y}) scale(${m.s})`}
        style={
          m.glow
            ? { filter: `drop-shadow(0 0 ${m.s * 0.6}px rgba(184,134,63,0.65))` }
            : undefined
        }
      />
    </motion.g>
  );
}

// The Big Dipper's seven stars — fixed positions (not randomized), drawn
// a touch more prominently than the ambient field so the shape reads.
function DipperStars({ twinkle }: { twinkle: boolean }) {
  return (
    <>
      {DIPPER_STARS.map((m, i) => (
        <TwinklingMark key={`dipper-${i}`} m={{ ...m, o: 0.62 }} i={i} twinkle={twinkle} />
      ))}
    </>
  );
}

// Marks are generated client-side, after mount, with real randomness —
// the server renders none, so there is no server/client mismatch, and
// the field looks a little different on every load.
function SparklingMarks() {
  const [marks, setMarks] = useState<Mark[] | null>(null);
  const [twinkle, setTwinkle] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: positions are randomized client-side so the field differs per load without an SSR/client mismatch.
    setMarks(generateMarks());
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTwinkle(true);
    }
  }, []);

  return (
    <>
      <DipperStars twinkle={twinkle} />
      {marks?.map((m, i) => (
        <TwinklingMark key={i} m={m} i={i} twinkle={twinkle} />
      ))}
    </>
  );
}

export function HeroStars() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <TrailLine />
      <SparklingMarks />
    </svg>
  );
}
