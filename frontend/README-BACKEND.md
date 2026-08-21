# Wanderly Frontend — Backend Handoff

This document describes how to connect the Wanderly React frontend to a real API.

## Quick start (frontend only)

```bash
cd frontend
npm install
npm run dev
```

The app works end-to-end without a backend using the mock in `src/lib/createStory.js`.

## State shape (App.jsx)

| State    | Type | Description |
|----------|------|-------------|
| `photos` | `{ id, file, url }[]` | User uploads; `url` is a blob URL for preview |
| `trip`   | `{ place, when, who, notes }` | Story metadata from the form |
| `style`  | `"magazine" \| "scrapbook" \| "comic" \| "polaroid"` | Selected template |
| `story`  | `WanderlyStory` | Generated output (see below) |
| `view`   | `"home" \| "generating" \| "story"` | Current screen |

## Integration point

In `src/App.jsx`, function `createStory()` currently:

1. Validates photos exist
2. Builds a `notes` string from trip fields
3. Shows a generating overlay (~2.2s)
4. Calls `createWanderlyStory({ notes, photos, style })`

**To connect the backend**, replace step 4 with:

```js
import { generateStory } from "./lib/api"

// inside createStory(), after setView("generating"):
try {
  const result = await generateStory({ photos, trip, style })
  setStory(result)
  setView("story")
} catch (err) {
  setError(err.message)
  setView("home")
} finally {
  window.clearInterval(stepTimer.current)
}
```

## API contract (`src/lib/api.js`)

### `POST /api/stories`

**Request:** `multipart/form-data`

| Field     | Type   | Required |
|-----------|--------|----------|
| `photos`  | File[] | yes      |
| `style`   | string | yes      |
| `place`   | string | no       |
| `when`    | string | no       |
| `who`     | string | no       |
| `notes`   | string | no       |

**Response:** `200` JSON matching `WanderlyStory`:

```json
{
  "style": "scrapbook",
  "title": "Jaipur",
  "kicker": "Dispatch",
  "subtitle": "We went to Jaipur. It was March 2024.",
  "quote": "A few days in the Pink City…",
  "copy": ["paragraph 1", "paragraph 2", "paragraph 3"],
  "date": "August 20, 2026",
  "issue": "142",
  "photoCount": 8,
  "pages": [
    {
      "id": "photo-id",
      "url": "https://cdn.example.com/…",
      "caption": "The rooftop at golden hour",
      "sticker": "keep this",
      "beat": { "stamp": "01 · DEPARTURE", "vibe": "…" },
      "tilt": -3
    }
  ]
}
```

Set `VITE_API_BASE` in `.env` if the API is not served from `/api`.

## Demo images

Bundled travel photos live in `public/images/` and are referenced from `src/lib/designShots.js`. Replace or extend these for marketing; user uploads use blob URLs at runtime.

## Story templates

Rendered in `src/components/`:

| Style      | Component        |
|------------|------------------|
| magazine   | MagazineSpread.jsx |
| scrapbook  | ScrapbookDiary.jsx |
| comic      | ComicStrip.jsx     |
| polaroid   | PolaroidWall.jsx   |

Each receives `story` with `pages[].url` pointing to displayable image URLs.
