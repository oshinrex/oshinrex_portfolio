import { SectionIntro } from "@/components/section-intro";
import { ExperienceItem } from "@/components/experience-item";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-anchor mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-10 sm:px-8 sm:py-12"
    >
      <SectionIntro number="02" label="Experience" heading="Where I've worked." compact />

      <div className="relative">
        <div aria-hidden className="absolute left-[7px] top-2 bottom-4 w-px bg-border" />
        <div className="flex flex-col">
          {EXPERIENCE.map((item) => (
            <ExperienceItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
