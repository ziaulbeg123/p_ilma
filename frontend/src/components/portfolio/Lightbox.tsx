import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { LightboxImage } from "@/data/types";

interface Props {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export default function Lightbox({ images, index, onChange }: Props) {
  const open = index !== null && images[index] !== undefined;
  const many = images.length > 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight" && many) onChange(((index ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft" && many)
        onChange(((index ?? 0) - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, index, many, images.length, onChange]);

  const current = open ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key="lightbox"
          data-testid="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(25,14,8,0.94)] p-4 backdrop-blur-sm md:p-8 print:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-start justify-between gap-4 text-cream">
            <div className="min-w-0">
              <p data-testid="lightbox-caption" className="font-heading text-lg font-semibold md:text-xl">
                {current.caption}
              </p>
              {current.sub && <p className="mt-1 text-sm text-[#D6C4B5]">{current.sub}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                data-testid="lightbox-open-original"
                href={current.src}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="grid size-10 place-items-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/25"
                aria-label="Open original"
              >
                <ExternalLink className="size-4" />
              </a>
              <button
                data-testid="lightbox-close-button"
                onClick={() => onChange(null)}
                className="grid size-10 place-items-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/25"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            {many && (
              <button
                data-testid="lightbox-prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! - 1 + images.length) % images.length);
                }}
                className="absolute left-0 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/25"
                aria-label="Previous"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}
            <motion.img
              key={current.src}
              data-testid="lightbox-image"
              src={current.src}
              alt={current.caption}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
            {many && (
              <button
                data-testid="lightbox-next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! + 1) % images.length);
                }}
                className="absolute right-0 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/25"
                aria-label="Next"
              >
                <ChevronRight className="size-6" />
              </button>
            )}
          </div>
          {many && (
            <p data-testid="lightbox-counter" className="text-center text-sm text-[#D6C4B5]">
              {index! + 1} / {images.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
