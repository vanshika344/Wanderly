/** Local demo travel photos — bundled in /public/images for reliable loading. */
const img = (name) => `/images/${name}`

const REFERENCE_SHOTS = {
  magazine: [img("reference-magazine-1.jpg"), img("reference-magazine-2.jpg")],
  scrapbook: [img("reference-scrapbook-1.jpg"), img("reference-scrapbook-2.jpg")],
  comic: [img("reference-comic-1.jpg"), img("reference-comic-2.jpg")],
  polaroid: [img("reference-polaroid-1.jpg"), img("reference-polaroid-2.jpg")],
}

export const HERO_POLAROIDS = [
  {
    src: img("hero-cappadocia.jpg"),
    tilt: -9,
    caption: "Swiss Alps, Switzerland",
  },
  {
    src: img("hero-lisbon.jpg"),
    tilt: 3,
    caption: "Lisbon, Portugal",
  },
  {
    src: img("hero-bali.jpg"),
    tilt: 8,
    caption: "Bali, Indonesia",
  },
  {
    src: img("dump-7.jpg"),
    tilt: -5,
    caption: "Sydney, Australia",
  },
  {
    src: img("dump-5.jpg"),
    tilt: 6,
    caption: "Venice, Italy",
  },
]

export const DUMP_SHOTS = [
  img("dump-1.jpg"), // Lisbon
  img("dump-2.jpg"), // Misty mountains
  img("dump-3.jpg"), // Bali
  img("dump-4.jpg"), // Mountain peak
  img("dump-5.jpg"), // Venice
  img("dump-6.jpg"), // Travel flat lay
  img("dump-7.jpg"), // Sydney harbour
]

export const STYLE_CARDS = [
  {
    id: "magazine",
    title: "Magazine",
    description: "Clean & elegant",
    tone: "#f3dbe1",
    shots: REFERENCE_SHOTS.magazine,
  },
  {
    id: "scrapbook",
    title: "Scrapbook",
    description: "Personal & cozy",
    tone: "#efe4d4",
    shots: REFERENCE_SHOTS.scrapbook,
  },
  {
    id: "comic",
    title: "Comic",
    description: "Fun & playful",
    tone: "#dde8d6",
    shots: REFERENCE_SHOTS.comic,
  },
  {
    id: "polaroid",
    title: "Polaroid",
    description: "Simple & nostalgic",
    tone: "#d7e4ea",
    shots: REFERENCE_SHOTS.polaroid,
  },
]

/** Avatar placeholders for social proof row */
export const FACES = [
  img("dump-2.jpg"),
  img("dump-4.jpg"),
  img("dump-5.jpg"),
  img("dump-6.jpg"),
]

export const RAIN_SHOTS = [
  img("rain-1.jpg"),
  img("rain-2.jpg"),
  img("dump-5.jpg"),
  img("rain-3.jpg"),
  img("dump-3.jpg"),
  img("dump-6.jpg"),
]
