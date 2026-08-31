import Image from "next/image";
import { SectionIntro } from "@/components/section-intro";

export function About() {
  return (
    <section
      id="about"
      className="scroll-anchor mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-14 sm:px-8 sm:py-16"
    >
      <div className="grid grid-cols-1 gap-x-14 gap-y-5 md:grid-cols-[1fr_0.85fr]">
        <SectionIntro number="01" label="About" heading="A little about me." />

        <div className="relative mx-auto mt-4 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm border border-border bg-white shadow-[0_20px_44px_-26px_rgba(23,23,23,0.35)] md:row-span-2 md:mt-10 md:max-w-sm">
          <Image
            src="/about.jpg"
            alt="Oshin Rex outdoors at sunset, wearing a Cornell University shirt"
            fill
            sizes="(min-width: 768px) 384px, 320px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 text-base leading-relaxed text-ink sm:text-[1.05rem]">
          <p>
            Hi, I&apos;m Oshin! I&apos;m a Computer Science and Operations
            Research student at Cornell University interested in backend
            software engineering, AI/ML, and exploring how technology can
            solve real-world problems.
          </p>

          <p>
            I enjoy taking an idea and figuring out how to turn it into a
            working solution. Through IBM and Hack4Impact @ Cornell,
            I&apos;ve worked directly on software solutions for clients and
            nonprofit organizations, collaborating with others to design and
            build applications that make their workflows more efficient and
            user-friendly.
          </p>

          <p>
            Outside of that, I&apos;m usually hunting down a new coffee spot
            or out for a run with good music playing.
          </p>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border pt-4 text-sm text-ink-muted">
            <span>B.S. Computer Science &amp; Operations Research</span>
            <span aria-hidden>·</span>
            <span>Expected May 2028</span>
          </div>
        </div>
      </div>
    </section>
  );
}