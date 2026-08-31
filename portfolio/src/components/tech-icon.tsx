import {
  siPython,
  siCplusplus,
  siOpenjdk,
  siJavascript,
  siHtml5,
  siOcaml,
  siReact,
  siExpress,
  siDjango,
  siFastapi,
  siLanggraph,
  siDocker,
  siCockroachlabs,
  siPostgresql,
  siFirebase,
  siGit,
  siCmake,
  type SimpleIcon,
} from "simple-icons";
import { Database, Cloud, Workflow, Sparkles, Table2, type LucideIcon } from "lucide-react";

// Real brand marks where simple-icons has one; a plain lucide glyph for
// items that aren't a single product/brand (SQL, RAG) or aren't carried
// by simple-icons (AWS Bedrock, Power Automate, Microsoft Dataverse).
// Rendered monochrome (currentColor) either way, to stay in the site's palette.
const BRAND_ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  "C++": siCplusplus,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  "HTML/CSS": siHtml5,
  OCaml: siOcaml,
  React: siReact,
  "React Native": siReact,
  "Express.js": siExpress,
  Django: siDjango,
  FastAPI: siFastapi,
  LangGraph: siLanggraph,
  Docker: siDocker,
  CockroachDB: siCockroachlabs,
  PostgreSQL: siPostgresql,
  Firebase: siFirebase,
  Git: siGit,
  CMake: siCmake,
};

const FALLBACK_ICONS: Record<string, LucideIcon> = {
  SQL: Database,
  "AWS Bedrock": Cloud,
  "Power Automate": Workflow,
  RAG: Sparkles,
  "Microsoft Dataverse": Table2,
};

export function TechIcon({ name, size = 18 }: { name: string; size?: number }) {
  const brand = BRAND_ICONS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        className="shrink-0"
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Fallback = FALLBACK_ICONS[name] ?? Sparkles;
  return <Fallback size={size} strokeWidth={1.75} className="shrink-0" aria-hidden />;
}
