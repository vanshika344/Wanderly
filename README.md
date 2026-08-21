# wanderly

> Your journey, your story. Turn a photo dump into a beautiful travel flipbook — in minutes.

Built for **DoraHacks 2.0** (Aug 20–23, 2026).

---

## What it does

Upload 4–50 trip photos, tell Wanderly where you went, when, with who, and
what made it special — then pick a style: **Magazine, Scrapbook, Comic, or
Polaroid**. Wanderly's AI turns it into a paginated, styled travel story you
can flip through, customize, and export as a PDF.

## How it works

1. **Sign up / Log in** — email or Google
2. **Drop your memories** — upload photos
3. **Tell the story** — place, date, companions, a few details
4. **Pick a style** — format + color/text theme
5. **Let Wanderly tell it** — AI generates your story, shown as an
   interactive flipbook
6. **Download** your finished travel diary as a PDF

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Framer Motion (scroll/page animations)
- react-pageflip (flipbook viewer)
- jsPDF + html2canvas (PDF export)

**Backend**
- Node.js + Express
- Google Gemini API (`gemini-1.5-flash`) — server-side only

**Database / Auth / Storage**
- Supabase (Postgres + Storage + Auth, Row Level Security enabled)

## Project Structure

```
frontend/
  src/
    components/       # PolaroidWall, ScrapbookDiary, Splash, Flipbook, etc.
    lib/               # Supabase client, API helpers
    App.jsx
    main.jsx
  vite.config.js

backend/
  routes/
    collections.js     # create/list/fetch collections, calls Gemini
  server.js
```

## Environment Variables

**Frontend (`frontend/.env`)** — safe to expose, RLS enforces access:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BACKEND_URL=
```

**Backend (`backend/.env`)** — never exposed to the client:
```
PORT=
GEMINI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

> ⚠️ The Gemini API key must only ever be used server-side (Express routes).
> Frontend calls the backend, backend calls Gemini.

## Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
node server.js
```

## Database

`collections` table in Supabase:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `user_id` | uuid | FK → auth.users |
| `title` | text | AI-generated or user-set |
| `place` | text | where the trip was |
| `trip_date` | date | when the trip happened |
| `companions` | text | who they went with |
| `raw_content` | text | user's free-text trip notes |
| `format` | text | magazine \| scrapbook \| comic \| polaroid |
| `color_theme` | text | selected style/theme |
| `photo_urls` | text[] | array of Supabase Storage URLs |
| `ai_pages` | jsonb | AI-generated paginated content |
| `created_at` | timestamptz | default now() |

- RLS policies restrict each user to their own rows (select/insert/update/delete)
- Photos stored in the `entry-photos` Supabase Storage bucket, scoped per user

## Formats

| Format | Vibe |
|---|---|
| Magazine | Clean & elegant |
| Scrapbook | Personal & cozy |
| Comic | Fun & playful |
| Polaroid | Simple & nostalgic |

## Known Gaps / In Progress
- Frontend auth UI (signup/login screens) — in progress
- Google OAuth provider setup in Supabase dashboard — deferred until email/password auth is working end-to-end
- Flipbook viewer, PDF export, and creation wizard screens — in progress (frontend)

## Roadmap (post-hackathon)

- Public share links
- Saved story library / dashboard history
- More templates
- Print-on-demand integration

## Team

Built by **Vanshika Nanwani** (backend: Node/Express + Supabase + Gemini),
**Vaidehi Shekhawat** (frontend: React/Vite), and **Yashika Kumawat** (design).

## License

TBD
