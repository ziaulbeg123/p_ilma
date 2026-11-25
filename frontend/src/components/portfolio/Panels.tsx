import { ArrowRight, Award, BookOpen, Briefcase, Calendar, GraduationCap, Mail, MapPin, Phone, School, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Certificate, LightboxImage, Portfolio } from "@/data/types";
import type { TabId } from "./Shell";
import { Card, Pill, Reveal, SectionHeading } from "./ui";
import ShareQR from "./ShareQR";

type OpenLightbox = (images: LightboxImage[], index: number) => void;

interface PanelProps {
  data: Portfolio;
  openLightbox: OpenLightbox;
  goTo: (id: TabId) => void;
}

function eventImages(data: Portfolio): LightboxImage[] {
  return data.events.flatMap((e) =>
    e.photos.map((src) => ({ src, caption: e.title, sub: `${e.date} • ${e.place}` })),
  );
}

function certImages(certs: Certificate[]): LightboxImage[] {
  return certs.map((c) => ({ src: c.files[0], caption: c.title, sub: c.issuer }));
}

function PhotoButton({
  src,
  alt,
  testId,
  onClick,
}: {
  src: string;
  alt: string;
  testId: string;
  onClick: () => void;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-amber-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

/* ---------------- 1. Overview ---------------- */

const contactIcon: Record<string, ReactNode> = {
  Location: <MapPin className="size-4" />,
  Institution: <School className="size-4" />,
  Email: <Mail className="size-4" />,
  Phone: <Phone className="size-4" />,
};

function contactHref(label: string, value: string): string | undefined {
  if (label === "Email") return `mailto:${value}`;
  if (label === "Phone") return `tel:+91${value.replace(/\D/g, "")}`;
  return undefined;
}

export function OverviewPanel({ data, openLightbox, goTo }: PanelProps) {
  const { profile } = data;
  const photos = eventImages(data).slice(0, 6);
  return (
    <div className="space-y-8">
      <Card className="relative grid items-center gap-10 overflow-hidden md:p-12 lg:grid-cols-[1fr_300px]">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-amber-soft/60 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((b, i) => (
              <Pill key={b} className="hero-badge">
                <span data-testid={`hero-badge-${i}`}>{b}</span>
              </Pill>
            ))}
          </div>
          <h1
            data-testid="hero-name"
            className="mt-6 font-heading text-5xl font-extrabold tracking-[-0.025em] text-cocoa md:text-6xl"
          >
            {profile.name}
          </h1>
          <p data-testid="hero-tagline" className="mt-3 text-lg font-semibold text-amber-deep">
            {profile.tagline}
          </p>
          <p data-testid="hero-bio" className="mt-5 max-w-3xl text-base leading-relaxed text-muted-ink md:text-lg">
            {profile.bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              data-testid="hero-certificates-button"
              onClick={() => goTo("certificates")}
              className="group inline-flex items-center gap-2 rounded-xl bg-cocoa px-6 py-3 font-semibold text-white shadow-md transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-cocoa-deep hover:shadow-lg"
            >
              View {data.certificates.length} Verified Certificates
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-events-button"
              onClick={() => goTo("events")}
              className="rounded-xl border border-line bg-white px-6 py-3 font-semibold text-cocoa transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cocoa"
            >
              View Event &amp; Award Photos
            </button>
          </div>
        </div>
        <div
          data-testid="hero-portrait"
          className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[24px] bg-cocoa shadow-lg ring-8 ring-amber-soft/50"
        >
          <img src={profile.portrait} alt={`${profile.name} portrait`} className="h-full w-full object-cover object-top" />
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div
              data-testid={`stat-card-${i}`}
              className="h-full rounded-[24px] border border-line bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift md:p-7"
            >
              <p className="text-sm font-semibold text-muted-ink">{s.label}</p>
              <p className="mt-2 font-heading text-3xl font-bold text-cocoa">{s.value}</p>
              <p className="mt-2 text-sm text-muted-ink">{s.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Card data-testid="featured-photos-section">
          <SectionHeading title="Featured Event & Award Photos">
            <button
              data-testid="featured-open-gallery-button"
              onClick={() => goTo("events")}
              className="group inline-flex items-center gap-1.5 font-semibold text-amber-deep transition-colors duration-200 hover:text-cocoa"
            >
              Open Events &amp; Photo Gallery
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </SectionHeading>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((p, i) => (
              <PhotoButton
                key={p.src}
                src={p.src}
                alt={p.caption}
                testId={`featured-photo-${i}`}
                onClick={() => openLightbox(photos, i)}
              />
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal>
        <Card data-testid="contact-section">
          <SectionHeading title="Contact & Verification" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.contact.map((c, i) => {
              const href = contactHref(c.label, c.value);
              const inner = (
                <>
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-ink">
                    <span className="text-amber-deep">{contactIcon[c.label]}</span>
                    {c.label}
                  </p>
                  <p className="mt-1.5 break-words font-semibold text-cocoa">{c.value}</p>
                </>
              );
              const cls =
                "block h-full rounded-2xl border border-transparent bg-cream p-5 transition-[border-color,transform] duration-200";
              return href ? (
                <a
                  key={c.label}
                  data-testid={`contact-item-${i}`}
                  href={href}
                  className={`${cls} hover:-translate-y-0.5 hover:border-amber-deep/40`}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} data-testid={`contact-item-${i}`} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-cream p-5 md:p-6">
            <ShareQR />
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

/* ---------------- 2. Education ---------------- */

export function EducationPanel({ data, openLightbox }: PanelProps) {
  const marksheets = data.certificates
    .filter((c) => c.category === "Academic Marksheets")
    .sort((a, b) => a.date.localeCompare(b.date));
  const marksheetImgs = certImages(marksheets);
  return (
    <Card data-testid="education-section">
      <SectionHeading eyebrow="Academic Record" title="Education & Marks" />
      <ol className="relative ml-3 mt-8 space-y-6 border-l-2 border-line pl-8">
        {data.education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <li data-testid={`education-item-${i}`} className="relative">
              <span className="absolute -left-[45px] top-5 grid size-7 place-items-center rounded-full bg-cocoa text-white ring-4 ring-white">
                <GraduationCap className="size-3.5" />
              </span>
              <div className="rounded-2xl border border-line bg-cream/60 p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft md:p-6">
                <p className="text-sm font-semibold text-amber-deep">{e.period}</p>
                <h3 className="mt-1 font-heading text-xl font-bold text-cocoa md:text-2xl">{e.title}</h3>
                <p className="mt-1 text-muted-ink">{e.institution}</p>
                <Pill className="mt-4 bg-white ring-1 ring-line">
                  <span data-testid={`education-result-${i}`}>{e.result}</span>
                </Pill>
                {e.title.includes("B.Sc") && marksheets.length > 0 && (
                  <div data-testid="bsc-marksheets" className="mt-6">
                    <p className="text-sm font-semibold text-cocoa">
                      Year-wise Marksheets <span className="font-normal text-muted-ink">(click to view full-size)</span>
                    </p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-3">
                      {marksheets.map((m, mi) => (
                        <button
                          key={m.title}
                          data-testid={`marksheet-card-${mi}`}
                          onClick={() => openLightbox(marksheetImgs, mi)}
                          className="group overflow-hidden rounded-2xl border border-line bg-white text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
                        >
                          <div className="overflow-hidden bg-amber-soft/50">
                            <img
                              src={m.files[0]}
                              alt={m.title}
                              loading="lazy"
                              className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          </div>
                          <div className="p-3.5">
                            <p className="text-sm font-bold leading-snug text-cocoa">
                              {m.title.replace("B.Sc. B.Ed. ", "")}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-ink">{m.details}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Card>
  );
}

/* ---------------- 3. Teaching ---------------- */

export function TeachingPanel({ data }: PanelProps) {
  return (
    <div className="space-y-6">
      <Card className="pb-6 md:pb-8">
        <SectionHeading eyebrow="Classroom Experience" title="Teaching & Internships" />
        <p className="mt-3 max-w-2xl text-muted-ink">
          School observations, substitute teaching and private tutoring across middle-school classes.
        </p>
      </Card>
      {data.internships.map((it, i) => (
        <Reveal key={`${it.title}-${it.period}`} delay={i * 0.05}>
          <Card data-testid={`internship-item-${i}`} className="transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-soft text-cocoa">
                  <Briefcase className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-cocoa md:text-2xl">{it.title}</h3>
                  <p className="mt-0.5 text-muted-ink">{it.place}</p>
                </div>
              </div>
              <Pill>{it.period}</Pill>
            </div>
            <ul className="mt-5 space-y-2.5 md:pl-[60px]">
              {it.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-ink">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-deep" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- 4. Achievements ---------------- */

export function AchievementsPanel({ data }: PanelProps) {
  return (
    <div className="space-y-8">
      <Card data-testid="achievements-section">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data.achievements.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 0.06}>
              <div
                data-testid={`achievement-item-${i}`}
                className="h-full rounded-2xl border border-line bg-cream/60 p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-amber-deep/30 hover:shadow-soft md:p-6"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-deep">
                  <Award className="size-4" />
                  {a.meta}
                </div>
                <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-cocoa md:text-xl">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-ink">{a.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        {data.skills.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <Card data-testid={`skills-group-${i}`} className="h-full md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-amber-soft text-cocoa">
                  {i === 0 ? <BookOpen className="size-5" /> : <Sparkles className="size-5" />}
                </span>
                <h3 className="font-heading text-xl font-bold text-cocoa">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-[background-color,border-color] duration-200 hover:border-amber-deep/40 hover:bg-amber-soft/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 5. Events ---------------- */

export function EventsPanel({ data, openLightbox }: PanelProps) {
  return (
    <div className="space-y-8">
      <Card className="pb-6 md:pb-8">
        <SectionHeading eyebrow="Gallery" title="Events & Photo Gallery" />
        <p className="mt-3 max-w-2xl text-muted-ink">
          Photos from camps, conferences and award ceremonies. Tap any photo to view it larger.
        </p>
      </Card>
      {data.events.map((ev, ei) => {
        const imgs: LightboxImage[] = ev.photos.map((src) => ({
          src,
          caption: ev.title,
          sub: `${ev.date} • ${ev.place}`,
        }));
        return (
          <Reveal key={ev.title}>
            <Card data-testid={`event-group-${ei}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{ev.category}</Pill>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink">
                  <Calendar className="size-4" />
                  {ev.date}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-2xl font-bold text-cocoa md:text-3xl">{ev.title}</h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink">
                <MapPin className="size-4" />
                {ev.place}
              </p>
              <p className="mt-3 max-w-3xl leading-relaxed text-ink">{ev.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {ev.photos.map((src, pi) => (
                  <PhotoButton
                    key={src}
                    src={src}
                    alt={`${ev.title} photo ${pi + 1}`}
                    testId={`event-${ei}-photo-${pi}`}
                    onClick={() => openLightbox(imgs, pi)}
                  />
                ))}
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------------- 6. Certificates ---------------- */

export function CertificatesPanel({ data, openLightbox }: PanelProps) {
  const certs = [...data.certificates].sort((a, b) => a.date.localeCompare(b.date));
  const imgs = certImages(certs);
  return (
    <div className="space-y-8">
      <Card className="pb-6 md:pb-8">
        <SectionHeading eyebrow={`${certs.length} Verified Documents`} title="Certificates (Ascending Order)" />
        <p className="mt-3 max-w-2xl text-muted-ink">
          Olympiads, co-curricular, conference, internship and academic records arranged oldest to newest. Click any certificate
          to view it full-size.
        </p>
      </Card>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.06}>
            <button
              data-testid={`certificate-card-${i}`}
              onClick={() => openLightbox(imgs, i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-line bg-white text-left shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
            >
              <div className="relative overflow-hidden bg-amber-soft/50">
                <img
                  src={c.files[0]}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-cocoa backdrop-blur">
                  #{i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-deep">{c.category}</p>
                <h3 data-testid={`certificate-title-${i}`} className="mt-2 font-heading text-lg font-bold leading-snug text-cocoa">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-ink">{c.issuer}</p>
                <p className="mt-2 text-sm text-ink/80">{c.details}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-cocoa">
                  View full certificate
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
