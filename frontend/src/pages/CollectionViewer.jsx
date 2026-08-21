import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppNav } from "./Dashboard"
import { getCollection } from "../lib/api"
import { collectionToStory } from "../lib/mapCollection"
import { StoryView } from "../components/StoryView"

function Flipbook({ pages, photos }) {
  const [index, setIndex] = useState(0)
  const page = pages[index]
  const captionNumber = pages.slice(0, index + 1).filter((p) => p.type === "photo_caption").length - 1
  const photoUrl = page?.type === "photo_caption" ? photos[Math.max(0, captionNumber)] : photos[0]

  if (!page) return <p className="text-sm text-[#5c534c]">No pages yet.</p>

  return (
    <div className="mx-auto max-w-3xl">
      <article className="min-h-[420px] rounded-[1.6rem] bg-white/80 p-10 shadow-[0_18px_40px_rgba(80,50,40,0.1)]">
        {page.type === "cover" && (
          <div className="flex min-h-[320px] flex-col justify-end">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#c45c6a]">cover</p>
            <h1 className="font-display mt-4 text-5xl">{page.title}</h1>
          </div>
        )}
        {page.type === "text" && <p className="text-lg leading-8 text-[#3a342f]">{page.content}</p>}
        {page.type === "photo_caption" && (
          <figure>
            {photoUrl && <img src={photoUrl} alt="" className="mb-6 h-72 w-full rounded-xl object-cover" />}
            <figcaption className="font-hand text-2xl">{page.caption}</figcaption>
          </figure>
        )}
      </article>
      <div className="mt-6 flex items-center justify-between text-sm">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className="disabled:opacity-40">
          ← Prev
        </button>
        <span>{index + 1} / {pages.length}</span>
        <button type="button" disabled={index === pages.length - 1} onClick={() => setIndex((i) => i + 1)} className="disabled:opacity-40">
          Next →
        </button>
      </div>
    </div>
  )
}

function CollectionViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [collection, setCollection] = useState(null)
  const [error, setError] = useState("")
  const [mode, setMode] = useState("layout")

  useEffect(() => {
    getCollection(id)
      .then((data) => setCollection(data.collection || data))
      .catch((err) => setError(err.message || "Could not load collection"))
  }, [id])

  if (error) {
    return (
      <main className="canva-page min-h-screen">
        <AppNav />
        <p className="p-10 text-center text-[#c45c6a]">{error}</p>
      </main>
    )
  }

  if (!collection) {
    return (
      <main className="canva-page min-h-screen">
        <AppNav />
        <p className="p-10 text-center">Loading...</p>
      </main>
    )
  }

  const story = collectionToStory(collection)
  const photos = (collection.photo_urls || []).map((url, i) => ({ id: String(i), url }))
  const isPolaroid = collection.format === "polaroid"

  return (
    <main className="canva-page min-h-screen">
      <AppNav />
      {!isPolaroid && (
        <div className="mx-auto flex max-w-6xl justify-end gap-3 px-6 pt-4">
          <button
            type="button"
            onClick={() => setMode("layout")}
            className={`rounded-full px-4 py-2 text-xs ${mode === "layout" ? "bg-[#c45c6a] text-white" : "border border-[#eadfd4]"}`}
          >
            Styled spread
          </button>
          <button
            type="button"
            onClick={() => setMode("flip")}
            className={`rounded-full px-4 py-2 text-xs ${mode === "flip" ? "bg-[#c45c6a] text-white" : "border border-[#eadfd4]"}`}
          >
            Flipbook
          </button>
        </div>
      )}

      {isPolaroid || mode === "layout" ? (
        <StoryView story={story} photos={photos} onBack={() => navigate("/dashboard")} backLabel="Back to library" />
      ) : (
        <section className="px-6 py-10">
          <Flipbook pages={collection.ai_pages || []} photos={collection.photo_urls || []} />
        </section>
      )}
    </main>
  )
}

export default CollectionViewer
