import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/section-intro";
import { CONTACT, RESUME_URL } from "@/lib/data";

const LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}`, external: false },
  { label: "LinkedIn", href: CONTACT.linkedin, external: true },
  { label: "GitHub", href: CONTACT.github, external: true },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-anchor mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16"
    >
      <SectionIntro number="05" label="Contact" heading="Let's connect." />

      <p className="max-w-[52ch] text-lg font-medium leading-relaxed text-ink sm:text-xl">
        Open to conversations about software engineering, interesting
        projects, and new opportunities.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-lg font-bold text-ink sm:text-xl">
        {LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-3">
            {i > 0 && <span className="text-ink-muted" aria-hidden>·</span>}
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>

      <a
        href={RESUME_URL}
        download
        className="group mt-9 inline-flex items-center gap-2 rounded-sm border-2 border-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Download Resume
        <ArrowRight
          size={16}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </section>
  );
}
