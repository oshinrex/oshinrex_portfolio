import { Code2, Blocks, Cloud, Database } from "lucide-react";
import { SectionIntro } from "@/components/section-intro";
import { TechIcon } from "@/components/tech-icon";
import { TECH_GROUPS, type TechGroup } from "@/lib/data";

const GROUP_ICONS: Record<string, typeof Code2> = {
  languages: Code2,
  frameworks: Blocks,
  "cloud-ai": Cloud,
  "databases-tools": Database,
};

function Group({ group }: { group: TechGroup }) {
  const Icon = GROUP_ICONS[group.id] ?? Code2;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-ink">
        <Icon size={17} strokeWidth={2} />
        <h3 className="text-sm font-bold">{group.label}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {group.items.map((item) => (
          <div
            key={item}
            className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-border bg-white px-2 py-3 text-center transition-colors hover:border-ink/30"
          >
            <span className="text-ink">
              <TechIcon name={item} size={20} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-ink-muted">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section
      id="toolkit"
      className="scroll-anchor mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12"
    >
      <SectionIntro number="04" label="Toolkit" heading="Technologies I use." compact />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {TECH_GROUPS.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
