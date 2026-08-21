/**
 * Mock story generator — used by the frontend until the backend is wired.
 * Replace the call in App.jsx `createStory()` with `generateStory()` from ./api.js
 * once POST /api/stories is available.
 */

const FALLBACK_TITLES = [
  "Proof we were here",
  "The days we kept",
  "Soft light, loud memories",
  "A trip, retold",
  "Camera roll, rewritten",
]

const MAGAZINE_KICKERS = [
  "The new face of your trip",
  "Dispatch",
  "On location",
  "Campaign notes",
]

const COMIC_BEATS = [
  { stamp: "01 · DEPARTURE", vibe: "Shoes on. Bags half-zipped. The trip starts before the first photo." },
  { stamp: "02 · ARRIVAL", vibe: "New streets, same chaos. Someone already lost the group chat." },
  { stamp: "03 · DETOUR", vibe: "The map lied. The snack stop did not." },
  { stamp: "04 · GOLDEN HOUR", vibe: "The light got expensive. Everyone pretended they planned this." },
  { stamp: "05 · AFTER DARK", vibe: "Too many stories, not enough sleep. Worth it." },
  { stamp: "06 · LAST FRAME", vibe: "One more photo. Then another. Then we actually left." },
]

const SCRAP_STICKERS = ["keep this", "don't forget", "ticket stub", "sunburn era", "we were here", "later, legend"]

function sentencesOf(notes) {
  return notes
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
}

function hashSeed(text) {
  let n = 0
  for (let i = 0; i < text.length; i += 1) n = (n * 31 + text.charCodeAt(i)) >>> 0
  return n
}

function pick(list, seed) {
  return list[seed % list.length]
}

function findPlace(notes) {
  const match = notes.match(
    /\b(?:in|to|at|through|around)\s+([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+){0,2})/,
  )
  return match?.[1] ?? null
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function deriveTitle(notes, seed) {
  const place = findPlace(notes)
  if (place) return place

  const first = sentencesOf(notes)[0]
  if (first && first.length < 42) return titleCase(first.replace(/[,:;].*$/, ""))

  return pick(FALLBACK_TITLES, seed)
}

function expandCopy(notes, title, photoCount) {
  const clean = notes.trim()
  const lead = clean
    ? clean
    : `We packed too much, planned too little, and still came home with ${photoCount} frames that refuse to stay buried in a camera roll.`

  return [
    `It wasn't supposed to be a story. It was just ${title.toLowerCase()} — a few days, a messy album, and the kind of light you only notice later.`,
    lead,
    `Wanderly kept the chaos and found the through-line: the in-between shots, the almost-captions, the proof that you were actually there.`,
  ]
}

function captionsFor(photos, notes, title) {
  const bits = sentencesOf(notes)
  const extras = [
    `Somewhere near ${title}, time got slower.`,
    "This one didn't need a filter. It needed a page.",
    "The photo we almost deleted. Glad we didn't.",
    "Evidence of a good detour.",
    "The frame that feels like the whole trip.",
    "Not posed. Just present.",
    "A quiet minute between the loud ones.",
    "Saved from the dump. Promoted to memory.",
  ]

  return photos.map((_, index) => {
    if (bits[index]) return bits[index]
    return extras[index % extras.length]
  })
}

export function createWanderlyStory({ notes, photos, style, referenceIndex = 0 }) {
  const seed = hashSeed(`${notes}|${photos.length}|${style}`)
  const title = deriveTitle(notes, seed)
  const captions = captionsFor(photos, notes, title)
  const copy = expandCopy(notes, title, photos.length)
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const pages = photos.map((photo, index) => ({
    id: photo.id,
    url: photo.url,
    caption: captions[index],
    sticker: pick(SCRAP_STICKERS, seed + index),
    beat: COMIC_BEATS[index % COMIC_BEATS.length],
    tilt: ((seed + index * 17) % 11) - 5,
  }))

  return {
    style,
    referenceIndex,
    title,
    kicker: pick(MAGAZINE_KICKERS, seed),
    subtitle: notes.trim()
      ? sentencesOf(notes)[0]
      : `${photos.length} photos. One trip. Finally a story.`,
    quote: copy[1].length > 90 ? `${copy[1].slice(0, 86).trim()}…` : copy[1],
    copy,
    date: today,
    issue: String(100 + (seed % 80)),
    photoCount: photos.length,
    pages,
  }
}
