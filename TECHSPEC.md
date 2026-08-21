# Wanderly — Technical Specification

**Built for:** DoraHacks 2.0 Hackathon (Aug 20–23, 2026)
**Companion docs:** `Wanderly_PRD.md`, `Wanderly_README.md`

---

## 1. Architecture Overview

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Frontend  │  HTTPS  │      Backend      │  HTTPS  │   Gemini    │
│  React/Vite │────────▶│   Node/Express    │────────▶│     API     │
└──────┬──────┘         └────────┬──────────┘         └─────────────┘
       │                         │
       │  (auth, direct CRUD,    │  (service-role,
       │   storage upload)       │   trusted server calls)
       ▼                         ▼
┌─────────────────────────────────────────┐
│                Supabase                  │
│  Postgres (RLS)  │  Auth  │  Storage     │
└─────────────────────────────────────────┘
```

- **Frontend → Supabase directly**: auth (signup/login/OAuth), reading own
  `collections` rows, uploading photos to Storage. Protected by RLS.
- **Frontend → Backend**: only for the AI generation step (`POST /api/collections`),
  since the Gemini key must never reach the browser.
- **Backend → Supabase**: uses the **service role key** (bypasses RLS) — trusted
  server context only, never exposed to frontend.
- **Backend → Gemini**: server-side only, key loaded from `.env`.

---

## 2. Environments

| Env var | Where | Exposed to browser? |
|---|---|---|
| `VITE_SUPABASE_URL` | frontend `.env` | Yes (safe — RLS-protected) |
| `VITE_SUPABASE_ANON_KEY` | frontend `.env` | Yes (safe — RLS-protected) |
| `VITE_BACKEND_URL` | frontend `.env` | Yes |
| `PORT` | backend `.env` | No |
| `SUPABASE_URL` | backend `.env` | No |
| `SUPABASE_SERVICE_KEY` | backend `.env` | **Never** — bypasses RLS |
| `GEMINI_API_KEY` | backend `.env` | **Never** |
| `FRONTEND_URL` | backend `.env` | No — used for CORS allowlist |

---

## 3. Auth Flow

1. User signs up/logs in via Supabase Auth (email/password or Google OAuth) —
   handled entirely by the frontend calling `supabase.auth.*` methods directly.
2. Supabase issues a session containing a JWT (`access_token`).
3. For any call to the backend, the frontend attaches:
   ```
   Authorization: Bearer <access_token>
   ```
4. Backend's `middleware/verifyAuth.js` calls `supabase.auth.getUser(token)`
   to validate the token server-side and retrieve the real user.
5. `req.user.id` (verified) is used as `user_id` everywhere on the backend —
   the backend **never trusts** a `user_id` field sent in the request body.
6. If the token is missing/invalid/expired → `401 Unauthorized`.

**Google OAuth setup (one-time, dashboard-only):**
- Supabase Dashboard → Authentication → Providers → Google → Enable
- Requires a Google Cloud Console OAuth Client ID + Secret
- Redirect URI is provided by Supabase, pasted into Google Cloud Console
- No backend code required — Supabase handles the OAuth handshake

---

## 4. API Reference (Backend)

Base URL: `http://localhost:5000` (dev) — swap for deployed Render/Railway URL in prod.

All routes below require `Authorization: Bearer <token>` unless noted.

### `GET /`
Health check. No auth required.
**Response:** `200` — `"Wanderly backend is running!"`

### `POST /api/collections`
Creates a new collection: calls Gemini, saves the result.

**Body:**
```json
{
  "photo_urls": ["https://.../img1.jpg", "..."],
  "format": "magazine | scrapbook | comic | polaroid",
  "raw_content": "free text the user wrote about the trip",
  "color_theme": "warm | cool | pastel | ...",
  "title": "optional, AI will generate one if omitted",
  "place": "e.g. Goa, India",
  "trip_date": "YYYY-MM-DD",
  "companions": "e.g. friends, solo, family"
}
```

**Validation:**
- `photo_urls` must have between 4 and 50 entries → else `400`
- `user_id` is derived from the verified token, not accepted from the body

**Response `200`:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "...",
  "ai_pages": [
    { "type": "cover", "title": "..." },
    { "type": "text", "content": "..." },
    { "type": "photo_caption", "caption": "..." }
  ],
  "photo_urls": [...],
  "format": "...",
  "color_theme": "...",
  "place": "...",
  "trip_date": "...",
  "companions": "...",
  "created_at": "..."
}
```

**Errors:**
- `400` — invalid photo count
- `401` — missing/invalid auth token
- `500` — Gemini call failed, JSON parse failed, or Supabase insert failed
  (raw Gemini/Supabase error details are never leaked to the client — only a
  generic message)

### `GET /api/collections`
Lists the logged-in user's own collections, newest first.
**Response `200`:** array of collection objects (same shape as above).

### `GET /api/collections/:id`
Fetches a single collection. Server-side ownership check in addition to RLS —
returns `403` if the collection exists but belongs to a different user.

---

## 5. Data Model

### `collections` table (Postgres, RLS enabled)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `auth.users(id)`, not null |
| `title` | `text` | user-set or AI-generated fallback |
| `place` | `text` | |
| `trip_date` | `date` | |
| `companions` | `text` | |
| `raw_content` | `text` | user's free-text trip notes |
| `format` | `text` | `magazine \| scrapbook \| comic \| polaroid` |
| `color_theme` | `text` | |
| `photo_urls` | `text[]` | Supabase Storage public URLs |
| `ai_pages` | `jsonb` | Gemini-generated paginated content |
| `created_at` | `timestamptz` | default `now()` |

**RLS policies** (all four: select/insert/update/delete):
```sql
using (auth.uid() = user_id)
-- insert uses: with check (auth.uid() = user_id)
```

### Storage

- Bucket: `entry-photos` (public)
- Path convention: `{user_id}/{timestamp}_{filename}`
- Frontend uploads directly via `supabase.storage.from('entry-photos').upload(...)`,
  then passes the resulting public URLs into `photo_urls` on collection creation.

---

## 6. Gemini Integration

- Model: `gemini-1.5-flash`
- Called via `@google/generative-ai` SDK, server-side only (`routes/collections.js`)
- Prompt is built dynamically per request using `format`, `place`, `trip_date`,
  `companions`, and `raw_content`
- Expected output: a single JSON object (no markdown fences) with a `pages` array
- Backend strips any accidental ` ```json ` fences before `JSON.parse`
- If Gemini output isn't valid JSON, the request fails with `500` and a generic
  error — no partial/garbage data is saved

**Page types currently defined:**
| `type` | Fields |
|---|---|
| `cover` | `title` |
| `text` | `content` |
| `photo_caption` | `caption` |

(Frontend flipbook renders one component per `type`.)

---

## 7. Frontend Responsibilities (summary)

- Supabase client init (`src/supabaseClient.js`) using `VITE_SUPABASE_URL` /
  `VITE_SUPABASE_ANON_KEY`
- Auth: signup, login (email + Google), `AuthContext`, protected routes
- Photo upload directly to Supabase Storage (`entry-photos` bucket)
- 4-step creation wizard: photo dump → trip details → style picker → generate
- Calls `POST /api/collections` with the Supabase session's `access_token` in
  the `Authorization` header
- Flipbook viewer (`react-pageflip`) rendering `ai_pages` per format
- PDF export (`jspdf` + `html2canvas`) of the rendered flipbook

---

## 8. Security Checklist

- [x] `.env` in `.gitignore`, never committed
- [x] Gemini key and Supabase service key used server-side only, never in
      any API response
- [x] `collections` table has RLS on all four operations
- [x] Backend derives `user_id` from a verified JWT, not from request body
- [x] Server-side ownership check on `GET /api/collections/:id`
- [x] Server-side photo count validation (4–50)
- [x] CORS restricted to `FRONTEND_URL` (not `*`)
- [ ] Rate limiting — deferred, not needed for hackathon demo scope
- [ ] Helmet / additional security headers — deferred, same reasoning
- [ ] Multer / server-side upload handling — not needed; uploads go directly
      frontend → Supabase Storage, backend never touches raw file bytes

---

## 9. Known Limitations (hackathon scope)

- Single AI provider (Gemini) — no fallback if it's down/rate-limited
- No retry logic on Gemini failures — user must resubmit
- No image moderation/content filtering on uploaded photos
- No pagination on `GET /api/collections` (fine at hackathon data volumes)
- PDF export captures rendered DOM (raster), not vector text
