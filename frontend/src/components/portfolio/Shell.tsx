import { useEffect } from "react";
import { Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/data/types";

export const TABS = [
  { id: "overview", label: "Overview & Profile" },
  { id: "education", label: "Education & Marks" },
  { id: "teaching", label: "Teaching & Internships" },
  { id: "achievements", label: "Achievements & Skills" },
  { id: "events", label: "Events & Photo Gallery" },
  { id: "certificates", label: "Certificates (Ascending Order)" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export function Header({ profile }: { profile: Profile }) {
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 border-b border-line bg-cream/85 shadow-nav backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <img
            src={profile.portrait}
            alt=""
            className="size-11 shrink-0 rounded-xl object-cover object-top ring-2 ring-white md:size-12"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p data-testid="header-name" className="font-heading text-xl font-bold leading-tight text-cocoa md:text-2xl">
                {profile.name}
              </p>
              <span className="hidden rounded-full bg-amber-soft px-2.5 py-0.5 text-xs font-semibold text-amber-ink sm:inline-block">
                {profile.headline_badge}
              </span>
            </div>
            <p className="truncate text-sm text-muted-ink">{profile.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 print:hidden">
          <a
            data-testid="header-resume-button"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-cocoa-deep"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <button
            data-testid="header-print-button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-cocoa transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cocoa"
          >
            <Printer className="size-4" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function SideNav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    document
      .querySelector(`[data-testid="nav-tab-${active}"]`)
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);
  return (
    <nav
      data-testid="section-nav"
      aria-label="Portfolio sections"
      className="sticky top-[73px] z-30 -mx-4 border-b border-line bg-cream/90 px-4 py-3 backdrop-blur-xl lg:top-[104px] lg:mx-0 lg:w-[290px] lg:shrink-0 lg:rounded-[24px] lg:border lg:bg-white lg:p-4 lg:shadow-soft print:hidden"
    >
      <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1.5 lg:overflow-visible">
        {TABS.map((t, i) => {
          const isActive = t.id === active;
          return (
            <li key={t.id} className="shrink-0">
              <button
                data-testid={`nav-tab-${t.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onSelect(t.id)}
                className={cn(
                  "group flex w-full items-center gap-3 whitespace-nowrap rounded-2xl px-3.5 py-2.5 text-left text-[15px] font-semibold transition-[background-color,color,box-shadow] duration-200 lg:whitespace-normal lg:py-3",
                  isActive
                    ? "bg-cocoa text-white shadow-md"
                    : "bg-white text-ink hover:bg-amber-soft/70 hover:text-cocoa-deep lg:bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-200",
                    isActive ? "bg-amber-deep text-white" : "bg-amber-soft text-cocoa",
                  )}
                >
                  {i + 1}
                </span>
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
