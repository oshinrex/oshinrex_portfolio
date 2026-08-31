import { SectionIntro } from "@/components/section-intro";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/data";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-anchor mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12"
    >
      <SectionIntro number="03" label="Projects" heading="Things I've built." compact />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
