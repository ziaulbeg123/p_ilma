import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & Record<`data-${string}`, string>) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[24px] border border-line bg-white p-6 shadow-soft md:p-9",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-amber-soft px-3.5 py-1 text-sm font-semibold text-amber-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-deep">
            {eyebrow}
          </p>
        )}
        <h2 className="font-heading text-2xl font-bold tracking-[-0.015em] text-cocoa md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

/** Fades + lifts children into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
