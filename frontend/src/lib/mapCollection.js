const COMIC_BEATS = [
  { stamp: "01 · DEPARTURE", vibe: "The trip starts before the first photo." },
  { stamp: "02 · ARRIVAL", vibe: "New streets, same chaos." },
  { stamp: "03 · DETOUR", vibe: "The map lied. The snack stop did not." },
  { stamp: "04 · GOLDEN HOUR", vibe: "The light got expensive." },
  { stamp: "05 · AFTER DARK", vibe: "Too many stories, not enough sleep." },
  { stamp: "06 · LAST FRAME", vibe: "One more photo. Then we actually left." },
]

const STICKERS = ["keep this", "don't forget", "ticket stub", "we were here"]

export function collectionToStory(collection) {
  const urls = collection.photo_urls ?? []
  const pagesAi = collection.ai_pages ?? []
  const captions = pagesAi.filter((p) => p.type === "photo_caption")
  const texts = pagesAi.filter((p) => p.type === "text").map((p) => p.content).filter(Boolean)
  const cover = pagesAi.find((p) => p.type === "cover")
  const title = collection.title || cover?.title || collection.place || "Untitled trip"

  const pages = urls.map((url, index) => ({
    id: `${collection.id}-${index}`,
    url,
    caption: captions[index]?.caption || collection.place || "A frame from the trip.",
    sticker: STICKERS[index % STICKERS.length],
    beat: COMIC_BEATS[index % COMIC_BEATS.length],
    tilt: ((index * 17) % 11) - 5,
  }))

  const lead = texts[0] || collection.raw_content || `${urls.length} photos from ${collection.place || "the road"}.`

  return {
    style: collection.format || "magazine",
    title,
    kicker: "Dispatch",
    subtitle: texts[1] || collection.place || "A trip, retold.",
    quote: lead.length > 90 ? `${lead.slice(0, 86).trim()}…` : lead,
    copy: texts.length ? texts : [lead],
    date: collection.trip_date || "",
    issue: "01",
    photoCount: urls.length,
    pages,
    colorTheme: collection.color_theme,
    place: collection.place,
    companions: collection.companions,
    aiPages: pagesAi,
    photoUrls: urls,
  }
}
