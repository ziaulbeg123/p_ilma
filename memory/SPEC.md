# Ilma Muskan — Educator E-Portfolio

Rebuild of https://shreya-build--0ui94ofk.preview.emergentagent.com/ (same content/photos, refreshed finish).

## What it does
Single-page portfolio at `/` with a sticky header (portrait, name, badge, Resume PDF link, Print/PDF) and 6 numbered tabs
(sidebar on desktop, horizontal scroll bar on mobile). Active tab lives in `?tab=` (overview | education | teaching | achievements | events | certificates).

1. Overview: badges, name, tagline, bio, portrait, CTA buttons (-> certificates / events tabs), 4 stat cards, 6 featured photos (lightbox), Contact & Verification (mailto/tel links)
2. Education & Marks: 3 entries (86.15%, 73.4%, 84.5%); B.Sc. B.Ed. entry shows 3 year-wise marksheets (marksheet-card-0..2, lightbox)
- QR code (qrcode.react) to fixed https://ilma-muskan-portfolio.netlify.app (PORTFOLIO_URL in ShareQR.tsx): in Overview "Contact & Verification" card (with Copy link) and a compact card at the bottom of every other tab (prints too)
3. Teaching & Internships: 4 roles
4. Achievements (6) & Skills (2 groups)
5. Events & Photo Gallery: 5 events (5th = CTET 2026 felicitation, 1 photo); first 4 have 3 photos each (3rd = Practical Work & Teaching Aid Models, 4th = Two-Week School Observation at Sacred Hearts, Apr 2026), lightbox w/ prev/next/Esc
6. Certificates: 14 (incl. 2 internship certificates: Bedi Intl School observation, Sacred Hearts Kiducation-2 internship), sorted ascending by date, click opens full-size lightbox

## Data
Frontend-only static site — the backend was removed at the user's request (no /api, no DB). Netlify config in `/app/netlify.toml` (base `frontend`, build `yarn build`, publish `dist`, SPA redirect).
Static, fixed content in `frontend/src/data/portfolio.ts` (types in `data/types.ts`). No admin, no login.
All assets are self-hosted: certificates in `frontend/public/certificates/`, portrait/event photos/marksheets/resume PDF in `frontend/public/media/`. No external asset URLs (Netlify-ready: base `frontend`, build `yarn build`, publish `frontend/dist`).
