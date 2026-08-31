type SectionIntroProps = {
  number: string;
  label: string;
  heading: string;
  compact?: boolean;
};

export function SectionIntro({ number, label, heading, compact }: SectionIntroProps) {
  return (
    <div className={compact ? "mb-5 sm:mb-6" : "mb-8 sm:mb-10"}>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">
        {number} — {label}
      </p>
      <h2
        className={`font-serif font-bold leading-[1.02] text-ink ${
          compact
            ? "text-[2.25rem] sm:text-5xl md:text-6xl"
            : "text-[2.75rem] sm:text-6xl md:text-7xl"
        }`}
      >
        {heading}
      </h2>
    </div>
  );
}
