import Image from "next/image";
import { Building2 } from "lucide-react";
import type { ExperienceItem as ExperienceItemType } from "@/lib/data";

export function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <div className="relative flex gap-4 sm:gap-6">
      <div className="relative z-10 flex w-4 shrink-0 justify-center pt-2">
        <span
          className={`h-3 w-3 rounded-full border-2 bg-bg ${
            item.current ? "border-accent bg-accent" : "border-ink/40"
          }`}
        />
      </div>

      <div className="mb-3 flex-1 rounded-md border border-border bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white sm:h-11 sm:w-11">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={44}
                  height={44}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <Building2 size={18} strokeWidth={1.75} className="text-ink-muted" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink sm:text-xl">
                {item.company}
              </h3>
              <p className="text-[13px] font-medium text-ink-muted sm:text-sm">
                {item.role} · {item.location}
              </p>
            </div>
          </div>
          <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.06em] text-accent sm:text-sm">
            {item.period}
          </span>
        </div>

        <ul className="mt-2.5 flex flex-col gap-1">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-[13px] leading-snug text-ink-muted sm:text-sm">
              <span aria-hidden>–</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
