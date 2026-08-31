import Image from "next/image";
import { ExternalLink, PlayCircle, ImageOff } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project, ProjectLink, ProjectScreenshot } from "@/lib/data";

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  if (type === "github") return <GithubIcon size={16} />;
  if (type === "live") return <ExternalLink size={16} strokeWidth={2} />;
  return <PlayCircle size={16} strokeWidth={2} />;
}

function LinkRow({ links }: { links: ProjectLink[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <a
          key={link.type}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          <LinkIcon type={link.type} />
          {link.label}
        </a>
      ))}
    </div>
  );
}

function fitClass(shot: ProjectScreenshot) {
  if (shot.fit === "contain") return "object-contain p-3";
  if (shot.position === "left-top") return "object-cover object-left-top";
  if (shot.position === "center") return "object-cover object-center";
  return "object-cover object-top";
}

function Media({ name, screenshots }: { name: string; screenshots?: ProjectScreenshot[] }) {
  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center gap-2 border-b border-dashed border-border bg-bg text-ink-muted sm:h-48">
        <ImageOff size={20} strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-[0.08em]">
          Add screenshot
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid h-40 w-full border-b border-border bg-bg sm:h-48 ${
        screenshots.length > 1 ? "gap-px" : ""
      }`}
      style={{ gridTemplateColumns: `repeat(${screenshots.length}, minmax(0, 1fr))` }}
    >
      {screenshots.map((shot, i) => (
        <div key={shot.src} className="relative h-full w-full overflow-hidden">
          <Image
            src={shot.src}
            alt={`${name} screenshot ${i + 1}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className={fitClass(shot)}
            style={shot.objectPosition ? { objectPosition: shot.objectPosition } : undefined}
          />
        </div>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.25)]">
      <Media name={project.name} screenshots={project.screenshots} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-xl font-bold leading-tight text-ink sm:text-2xl">
          {project.name}
        </h3>
        {project.subtitle && (
          <p className="mt-1 text-sm italic text-ink-muted">{project.subtitle}</p>
        )}
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">
          {project.description}
        </p>

        {project.metrics && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {project.metrics.map((metric) => (
              <span key={metric} className="text-sm font-semibold text-ink">
                {metric}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <LinkRow links={project.links} />
        </div>
      </div>
    </article>
  );
}
