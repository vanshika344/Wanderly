# Wanderly — Implementation Plan

Hackathon: DoraHacks 2.0, Aug 20–23, 2026. Ordered by dependency and
priority — top items block everything below them.

Legend: ✅ Done · 🟡 In progress · ⬜ Not started

---

## Phase 0 — Foundation (Day 1)

- ✅ Supabase project created (`Wanderly`)
- ✅ `collections` table + RLS policies (see `schema.md`)
- ✅ Storage bucket `entry-photos` (public)
- ✅ Express server scaffold (`server.js`)
- ✅ `routes/collections.js` — POST (create + Gemini call), GET all, GET by id
- 🟡 `middleware/verifyAuth.js` — JWT verification (code written, wiring/testing in progress)
- 🟡 CORS restricted to `FRONTEND_URL` (code written, needs restart+test)
- ⬜ Server-side photo count validation (4–50) — included in latest `collections.js`, needs testing

**Owner:** Vanshika (backend)

---

## Phase 1 — Auth (blocks almost everything else)

- ⬜ Frontend: Supabase client setup (`src/supabaseClient.js`)
- ⬜ Frontend: signup form → `supabase.auth.signUp`
- ⬜ Frontend: login form → `supabase.auth.signInWithPassword`
- ⬜ Frontend: `AuthContext` + `useAuth` hook
- ⬜ Frontend: `ProtectedRoute` wrapper for Dashboard/Wizard/Viewer
- ⬜ Frontend: attach `Authorization: Bearer <token>` header on all backend calls
- ⬜ Frontend: logout
- ⬜ Google OAuth: enable provider in Supabase dashboard (Client ID/Secret from
  Google Cloud Console) — **stretch, do after email/password works**

**Owner:** Frontend partner
**Blocks:** Dashboard, Wizard Step 4 (backend call requires a valid token),
Flipbook Viewer (fetch requires auth)

---

## Phase 2 — Core Screens (Frontend)

- ⬜ Splash/logo animation (SVG stroke-draw + Framer Motion fades)
- ⬜ Landing page (hero, scroll-triggered photo stack + ribbon animation, how-it-works, format strip)
- ⬜ Dashboard (list past collections, empty state, "New Story" CTA)
- ⬜ Step 1: Photo upload UI (drag-drop, grid preview, remove, 4–50 validation)
- ⬜ Step 1: wire uploads to Supabase Storage, collect resulting `photo_urls`
- ⬜ Step 2: trip details form (place, date, companions, story notes)
- ⬜ Step 3: format picker (4 cards) + color/contrast picker
- ⬜ Step 4: "Generate" button → `POST /api/collections` with auth header, loading state, error state

**Owner:** Frontend partner
**Depends on:** Phase 1 (auth) for anything past the landing page

---

## Phase 3 — Flipbook + Export

- ⬜ Install/configure `react-pageflip`
- ⬜ Page renderer components: `CoverPage`, `TextPage`, `PhotoCaptionPage`
- ⬜ Map `ai_pages` array → rendered pages, per `format`-specific styling
- ⬜ Polaroid format: simple card grid (no flipbook)
- ⬜ Color theme applied via CSS class/variables
- ⬜ PDF export: `jspdf` + `html2canvas`, "Download as PDF" button

**Owner:** Frontend partner
**Depends on:** Phase 2 Step 4 producing real `ai_pages` data to render against

---

## Phase 4 — Integration Testing

- ⬜ Full manual run-through: signup → login → upload 4+ photos → fill details
  → pick format → generate → view flipbook → export PDF
- ⬜ Test with at least 2 different real trips/photo sets
- ⬜ Test format switching (at least Scrapbook fully polished; others functional)
- ⬜ Confirm no secrets appear in browser devtools/network tab (Gemini key,
  service role key)
- ⬜ Confirm `GET /api/collections/:id` correctly 403s when trying another
  user's collection ID

**Owner:** Both

---

## Phase 5 — Deploy

- ⬜ Backend → Render or Railway; set env vars (`GEMINI_API_KEY`,
  `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `FRONTEND_URL`, `PORT`)
- ⬜ Frontend → Vercel; set env vars (`VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`, `VITE_BACKEND_URL` pointing at deployed backend)
- ⬜ Update backend's `FRONTEND_URL` to the deployed Vercel URL (CORS)
- ⬜ Full run-through again on the **live** deployed URLs, not localhost

**Owner:** Vanshika (backend deploy) + Frontend partner (frontend deploy)

---

## Phase 6 — Submission Prep

- ⬜ Record 2–3 min demo video (backup in case live demo fails)
- ⬜ Build pitch deck (problem, solution, live demo, tech stack, roadmap) — 5–8 slides
- ⬜ Finalize `README.md` with real setup instructions
- ⬜ Submit on DoraHacks before deadline — leave buffer, don't submit in the last 10 minutes

**Owner:** Both

---

## Explicitly Deferred (do not spend hackathon time on these)

- Rate limiting, Helmet security headers
- Multer / server-side file upload handling (uploads go frontend → Supabase
  Storage directly)
- Public share links
- Print-on-demand
- Multi-language support
- Payment/pricing tiers
