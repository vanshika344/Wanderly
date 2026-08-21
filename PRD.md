# Wanderly — Product Requirements Document

**Tagline:** Turn your travel memories into a story worth keeping.
**Built for:** DoraHacks 2.0 Hackathon (Aug 20–23, 2026)

---

## 1. Overview

Wanderly is an AI-powered travel diary web app. Users upload trip photos, add a
few details about the journey, pick a visual storytelling style, and Wanderly
turns it into a beautifully formatted, paginated flipbook — ready to read
online or download as a PDF keepsake.

**Core value prop:** Photo dump → a few quick inputs → AI-generated, styled
travel story. No design skill or writing effort required from the user.

---

## 2. Problem

People take hundreds of trip photos that sit unorganized in camera rolls.
They rarely turn into anything meaningful — no story, no keepsake, no easy way
to relive or share the trip beyond a random Instagram dump.

## 3. Target User

- Travelers who want a personal keepsake of a trip (primary)
- Content creators wanting a polished, shareable travel recap
- Anyone journaling their travel memories for themselves or loved ones

## 4. Core User Flow

1. **Splash / logo animation** — hand-drawn icon intro before entering the app
2. **Landing page** — value prop, "Create My Wanderly" CTA, style previews,
   scroll-triggered photo-stack animation
3. **Auth** — Sign up / Log in via email+password or Google OAuth
4. **Dashboard** — entry point to start a new story or view past ones, side
   button for login/account info
5. **Step 1 — Photo dump**
   - Upload **min 4, max 50** photos (JPG/PNG)
6. **Step 2 — Tell us the story**
   - Where did you go? (`place`)
   - When was it? (`trip_date`)
   - Who was it with? (`companions`)
   - What made it special? (`raw_content`, free text)
7. **Step 3 — Choose your style**
   - Format: **Magazine / Scrapbook / Comic / Polaroid**
   - Customize: color palette, text/font style (`color_theme`)
8. **Step 4 — Preview**
   - AI (Gemini) generates paginated story content (`ai_pages`) matched to
     the chosen format
   - Rendered in an interactive **flipbook viewer** (Polaroid renders as a
     simple card grid instead of a flipbook)
9. **Output actions**
   - Download as PDF
   - Customize/edit further (stretch goal)

## 5. Feature Scope (Hackathon MVP)

| Feature | Priority | Status |
|---|---|---|
| Email/password auth | Must-have | Not started (frontend) |
| Google OAuth | Must-have | Deferred until email/password works |
| Photo upload (4–50 images) | Must-have | Storage bucket ready; UI + count validation pending |
| Trip metadata form (place, date, companions, story notes) | Must-have | DB columns ready; form pending |
| 4 format templates (Magazine, Scrapbook, Comic, Polaroid) | Must-have | Backend prompt supports `format`; frontend templates pending |
| Color/text style picker | Must-have | Pending (frontend) |
| AI-generated paginated content (Gemini) | Must-have | Backend route built, untested with real key |
| Flipbook viewer | Must-have | Pending (frontend, react-pageflip) |
| PDF export | Must-have | Pending (frontend, jsPDF + html2canvas) |
| Saved past stories / dashboard history | Should-have | Backend GET routes ready |
| Sharing/public link | Nice-to-have | Not started |

## 6. Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, react-pageflip
- **Backend:** Node.js + Express
- **Database & Storage:** Supabase (Postgres + Storage buckets, RLS enabled)
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **AI:** Google Gemini API (`gemini-1.5-flash`), server-side only — called
  via Express backend, never directly from frontend, to keep the key secret
- **Deployment:** Vercel (frontend) + Render/Railway (backend)

## 7. Data Model

**`collections` table** (Supabase, RLS enabled) — full detail in `schema.md`

| Column | Type |
|---|---|
| `id` | uuid, primary key |
| `user_id` | uuid, FK → auth.users |
| `title` | text |
| `place` | text |
| `trip_date` | date |
| `companions` | text |
| `raw_content` | text |
| `format` | text (magazine \| scrapbook \| comic \| polaroid) |
| `color_theme` | text |
| `photo_urls` | text[] |
| `ai_pages` | jsonb |
| `created_at` | timestamptz, default now() |

RLS policies: select/insert/update/delete, each scoped to `auth.uid() = user_id`.

Photos live in the `entry-photos` Supabase Storage bucket (public), scoped by
user ID in the file path.

## 8. Security Notes

- Supabase **anon/publishable key** is safe in frontend by design — access is
  enforced via RLS policies on `collections` and the storage bucket, not key
  secrecy.
- **Gemini API key stays backend-only**, loaded from `.env`, never returned in
  any API response.
- Backend verifies the Supabase session JWT (`Authorization: Bearer <token>`)
  on protected routes and derives `user_id` from it — never trusts a
  `user_id` field sent in the request body.
- Server-side validation of photo count (4–50), not just frontend validation.
- Server-side ownership check on single-collection fetch, not RLS alone.

## 9. Design Direction

- Elegant, warm, storybook-like aesthetic — soft cream/pink/mauve palette,
  serif display type paired with clean sans body text, polaroid-style photo
  framing, hand-drawn accents (ink-stroke swooshes, sparkles) to reinforce the
  "travel diary" feel.
- Splash screen: hand-drawn line-art icon animates in stroke-by-stroke, fills
  with color, followed by wordmark and tagline.
- Landing page hero: scroll-triggered photo cards converging into a stack
  alongside an animated ribbon swoosh.
- Each format (Magazine/Scrapbook/Comic/Polaroid) has a visually distinct
  template while sharing the same core layout system.

## 10. Success Criteria (for hackathon demo)

- End-to-end flow works live: sign up/log in → upload → form → style pick →
  AI generation → flipbook → PDF export
- At least one full demo run with real trip photos
- No exposed secrets in frontend bundle or network responses
- Email/password auth functional; Google OAuth functional if time allows
- At least one format (recommended: Scrapbook) fully polished visually

## 11. Out of Scope (for this hackathon)

- Payments/pricing tiers (shown on landing page for future, not built)
- Public sharing/social feed
- Mobile native app
- Multi-language support
- Print-on-demand / physical printing
- Rate limiting, Helmet, and other hardening beyond RLS + JWT verification

---

**Related docs:** `TECHSPEC.md` (API contracts, architecture),
`schema.md` (DB source of truth), `appflow.md` (screen-by-screen flow),
`implementationplan.md` (build order), `tracker.md` (live status),
`rules.md` (team conventions).
