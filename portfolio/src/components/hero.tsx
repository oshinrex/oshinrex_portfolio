"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroStars } from "@/components/hero-stars";
import { PhotoFrame } from "@/components/photo-frame";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const NAME_REVEAL_DELAY_MS = 500;

export function Hero() {
  // Default state is the final, static look — safe for SSR and exactly
  // what reduced-motion users should see with no flash and no delay.
  const [entering, setEntering] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEntering(true);
    setNameRevealed(false);
  }, []);

  useEffect(() => {
    if (!entering) return;
    const t = setTimeout(() => setNameRevealed(true), NAME_REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [entering]);

  return (
    <section
      id="top"
      className="scroll-anchor relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
    >
      <HeroStars />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-14 md:flex-row md:justify-center md:gap-20 lg:gap-28">
        <PhotoFrame />

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Computer Science × Operations Research
          </p>

          <motion.h1
            animate={{ opacity: nameRevealed ? 1 : 0, y: nameRevealed ? 0 : 12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[3.6rem] font-bold leading-[0.95] text-ink sm:text-7xl md:text-8xl lg:text-[6.5rem]"
          >
            Oshin Rex
          </motion.h1>

          <p className="mt-6 max-w-md text-lg font-medium leading-snug text-ink sm:text-xl">
            Building at the intersection of software, AI, and problem solving.
          </p>

          <p className="mt-3 text-base font-medium text-ink-muted">
            Cornell University · Class of 2028
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5 md:justify-start">
            <a
              href="#projects"
              className="rounded-sm bg-ink px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-accent"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:text-accent"
            >
              Get in touch
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
          Scroll
        </span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}
