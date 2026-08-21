# Wanderly — App Flow

Companion to `PRD.md` and `TECHSPEC.md`. Maps every screen, the action taken
on it, and what happens behind the scenes (frontend-only vs backend call).

---

## 0. Splash / Logo Intro

- Hand-drawn line icon draws itself in (SVG stroke animation) → fills with
  color → "Wanderly" wordmark fades in → tagline fades in
- Auto-advances to Landing Page after ~2.5–3s, or on tap/click
- No backend involved

## 1. Landing Page

- Hero: headline, subtext, "Create My Wanderly" CTA
- Scroll-triggered animation: photo cards converge into a stack + ribbon
  swoosh animates in (Framer Motion, scroll-linked)
- "How it works" 3-step preview (Drop memories → Tell the story → Let
  Wanderly tell it)
- "Choose your style" strip previewing the 4 formats
- Nav: Log in / Sign up buttons
- No backend involved (static/marketing page)

**Action → Next:** "Create My Wanderly" or "Sign up" → Auth screen (if not
logged in) → Dashboard (if already logged in)

## 2. Auth

### 2a. Sign up
- Email + password fields, or "Continue with Google"
- Email/password → `supabase.auth.signUp({ email, password })`
- Google → `supabase.auth.signInWithOAuth({ provider: 'google' })`
- On success → redirect to Dashboard

### 2b. Log in
- Same two methods → `supabase.auth.signInWithPassword(...)` or Google OAuth
- On success → redirect to Dashboard
- "Forgot password?" → Supabase password reset flow (stretch goal)

**Backend involvement:** none directly — all via Supabase client SDK from
frontend. Backend only comes into play once the user later calls
`POST /api/collections`, at which point it verifies the session token issued
here.

## 3. Dashboard

- Grid/list of the logged-in user's past collections
  (`GET` from Supabase directly: `collections` table, `eq('user_id', user.id)`)
- Empty state if no collections yet: prompt to create the first one
- Side button/icon → account info, logout, or opens login panel if somehow
  unauthenticated
- Primary CTA: "New Story" / "+" → Step 1 of the creation wizard

## 4. Creation Wizard (4 steps)

Progress indicator: "Step X of 4" throughout.

### Step 1 — Photo Dump
- Drag-and-drop zone + "Add Photos" button
- Accepts JPG/PNG, **min 4, max 50**
- Grid preview with per-photo remove (×) button
- On "Next": each photo uploads to Supabase Storage bucket `entry-photos`,
  scoped `{user_id}/{timestamp}_{filename}` → resulting public URLs held in
  local wizard state (not saved to DB yet)
- Client-side validation: block "Next" if count is outside 4–50

### Step 2 — Tell Us the Story
- Fields: **Place**, **Date**, **Companions**, free-text **story notes**
- Purely local state, no backend call yet

### Step 3 — Choose Your Style
- Format picker: **Magazine / Scrapbook / Comic / Polaroid** (4 tappable
  cards)
- Color/contrast theme picker
- Purely local state, no backend call yet

### Step 4 — Generate / Preview
- "Generate" button triggers the one real backend call:
  ```
  POST /api/collections
  Authorization: Bearer <supabase access_token>
  Body: { photo_urls, format, raw_content, color_theme, place, trip_date, companions }
  ```
- Loading state while Gemini generates (few seconds)
- On success: navigate to the Flipbook Viewer with the returned collection
- On error: show a friendly retry message (never show raw error text)

## 5. Flipbook Viewer

- Route: `/collection/:id`
- Fetches the collection (`GET /api/collections/:id`, authenticated) if
  arriving via direct link/refresh; otherwise uses the just-created data
  passed in from Step 4
- Renders `ai_pages` using `react-pageflip`:
  - `cover` page type → title page
  - `text` page type → narrative page
  - `photo_caption` page type → photo + caption page
- **Polaroid format** renders as a simple card grid instead of a flipbook
  (no page-turn mechanism)
- Color theme applied as a CSS class/variable wrapper
- Actions on this screen:
  - **Download as PDF** → captures rendered pages via `html2canvas`, stitches
    into a PDF with `jspdf`, triggers browser download
  - Back to Dashboard

## 6. Logout

- `supabase.auth.signOut()` → redirect to Landing Page

---

## Screen-to-Data Map (quick reference)

| Screen | Reads | Writes |
|---|---|---|
| Dashboard | `collections` (own rows) | — |
| Step 1 | — | Storage bucket `entry-photos` |
| Step 2/3 | — | (local state only) |
| Step 4 | — | `POST /api/collections` (backend → Gemini → `collections` insert) |
| Flipbook Viewer | `GET /api/collections/:id` | — |
