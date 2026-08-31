import { CONTACT } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-ink">Oshin Rex</span>
          <span aria-hidden>·</span>
          <span>Built with Next.js</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <span aria-hidden>·</span>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
            Email
          </a>
        </div>

        <p>© 2026 Oshin Rex</p>
      </div>
    </footer>
  );
}
