import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import type { LightboxImage } from "@/data/types";
import { Header, SideNav, TABS, type TabId } from "@/components/portfolio/Shell";
import Lightbox from "@/components/portfolio/Lightbox";
import ShareQR from "@/components/portfolio/ShareQR";
import {
  AchievementsPanel,
  CertificatesPanel,
  EducationPanel,
  EventsPanel,
  OverviewPanel,
  TeachingPanel,
} from "@/components/portfolio/Panels";

const PANELS = {
  overview: OverviewPanel,
  education: EducationPanel,
  teaching: TeachingPanel,
  achievements: AchievementsPanel,
  events: EventsPanel,
  certificates: CertificatesPanel,
} as const;

function isTab(v: string | null): v is TabId {
  return TABS.some((t) => t.id === v);
}

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const active: TabId = isTab(raw) ? raw : "overview";

  const [lbImages, setLbImages] = useState<LightboxImage[]>([]);
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const goTo = useCallback(
    (id: TabId) => {
      setParams(id === "overview" ? {} : { tab: id });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setParams],
  );

  const openLightbox = useCallback((images: LightboxImage[], index: number) => {
    setLbImages(images);
    setLbIndex(index);
  }, []);

  const Panel = PANELS[active];

  return (
    <div data-testid="portfolio-page" className="paper min-h-screen bg-cream font-sans text-ink">
      <Header profile={portfolio.profile} />
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:flex lg:items-start lg:gap-8">
        <SideNav active={active} onSelect={goTo} />
        <main className="min-w-0 flex-1 py-8 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              data-testid={`panel-${active}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Panel data={portfolio} openLightbox={openLightbox} goTo={goTo} />
            </motion.div>
          </AnimatePresence>
          {active !== "overview" && (
            <div className="mt-10 rounded-[24px] border border-line bg-white p-5 shadow-soft md:p-6 print:break-inside-avoid">
              <ShareQR size={96} compact />
            </div>
          )}
          <footer className="mt-10 border-t border-line pt-6 text-center text-sm text-muted-ink print:hidden">
            © {portfolio.profile.name} • {portfolio.profile.subtitle}
          </footer>
        </main>
      </div>
      <Lightbox images={lbImages} index={lbIndex} onChange={setLbIndex} />
    </div>
  );
}
