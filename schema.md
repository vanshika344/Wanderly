# Wanderly — Database Schema

Single source of truth for the Supabase (Postgres) schema. If frontend/backend
code ever disagrees with this file, this file wins — update code to match it,
not the other way around.

Project: `Wanderly` (Supabase, `ap-northeast-1` / Tokyo region)

---

## Table: `collections`

```sql
create table collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  title text,
  place text,
  trip_date date,
  companions text,
  raw_content text,
  format text not null,          -- 'magazine' | 'scrapbook' | 'comic' | 'polaroid'
  color_theme text,
  photo_urls text[],
  ai_pages jsonb,
  created_at timestamp with time zone default now()
);
```

### Column notes

| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | `uuid` | no | PK, auto-generated |
| `user_id` | `uuid` | no | FK → `auth.users(id)` |
| `title` | `text` | yes | falls back to AI-generated cover title if omitted on insert |
| `place` | `text` | yes | e.g. "Goa, India" |
| `trip_date` | `date` | yes | |
| `companions` | `text` | yes | free text, e.g. "solo", "with friends" |
| `raw_content` | `text` | yes | user's free-text trip notes, fed into the Gemini prompt |
| `format` | `text` | **no** | one of the 4 enum-like values below; enforced in app code, not a DB constraint |
| `color_theme` | `text` | yes | free text/enum, app-defined (e.g. `warm`, `cool`, `pastel`) |
| `photo_urls` | `text[]` | yes | Supabase Storage public URLs; app enforces 4–50 length, not a DB constraint |
| `ai_pages` | `jsonb` | yes | array of page objects, see shape below |
| `created_at` | `timestamptz` | no | default `now()` |

### `format` allowed values (app-level enum)
```
magazine | scrapbook | comic | polaroid
```

### `ai_pages` shape
```json
[
  { "type": "cover", "title": "string" },
  { "type": "text", "content": "string" },
  { "type": "photo_caption", "caption": "string" }
]
```
Additional `type` values may be added as formats get richer templates — any
frontend renderer must handle unknown types gracefully (skip/fallback), not
crash.

---

## Row Level Security (RLS)

RLS is **enabled** on `collections`. Four policies, all scoped to the
authenticated user matching `user_id`:

```sql
alter table collections enable row level security;

create policy "Users can view own collections"
on collections for select
using (auth.uid() = user_id);

create policy "Users can insert own collections"
on collections for insert
with check (auth.uid() = user_id);

create policy "Users can update own collections"
on collections for update
using (auth.uid() = user_id);

create policy "Users can delete own collections"
on collections for delete
using (auth.uid() = user_id);
```

**Important:** the backend uses the **service role key**, which bypasses RLS
entirely. RLS protects direct frontend↔Supabase calls (reads, storage). The
backend is responsible for its own authorization via `verifyAuth` middleware
— do not rely on RLS alone for backend-inserted/read data.

---

## Storage

**Bucket:** `entry-photos`
**Access:** Public
**Path convention:** `{user_id}/{timestamp}_{original_filename}`

No Storage-level RLS policies configured beyond default public-bucket
behavior — acceptable for hackathon scope since URLs are only ever generated
for the uploading user's own files and are effectively unguessable (UUID +
timestamp prefixed).

---

## Deprecated / Removed

- `entries` table — original simpler schema from early prototyping, superseded
  by `collections`. Safe to drop:
  ```sql
  drop table if exists entries;
  ```
- `photo_url` (singular, text) — replaced by `photo_urls` (array) once the
  design moved to multi-photo upload (4–50 images per collection).

---

## Migration Log

| Date | Change |
|---|---|
| Aug 20, 2026 | Created `entries` table (superseded) |
| Aug 20, 2026 | Created `collections` table: `id, user_id, format, color_theme, raw_content, photo_url, ai_pages, title, created_at` |
| Aug 20, 2026 | Enabled RLS + 4 policies on `collections` |
| Aug 20, 2026 | Added `place`, `trip_date`, `companions` |
| Aug 20, 2026 | Dropped `photo_url`, added `photo_urls text[]` |
