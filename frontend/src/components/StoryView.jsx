import { useRef, useState } from "react"
import MagazineSpread from "./MagazineSpread"
import ScrapbookDiary from "./ScrapbookDiary"
import ComicStrip from "./ComicStrip"
import PolaroidWall from "./PolaroidWall"
import { exportStoryAsPDF } from "../lib/exportPdf"

export function StoryLayout({ story }) {
  if (story.style === "scrapbook") return <ScrapbookDiary story={story} />
  if (story.style === "comic") return <ComicStrip story={story} />
  if (story.style === "polaroid") return <PolaroidWall story={story} />
  return <MagazineSpread story={story} />
}

export function StoryView({ story, photos, onBack, backLabel = "Start over" }) {
  const [showBefore, setShowBefore] = useState(false)
  const [exporting, setExporting] = useState(false)
  const exportRef = useRef(null)

  async function handleDownloadPDF() {
    if (!exportRef.current) return
    setExporting(true)
    try {
      const safeName = (story.title || "wanderly-trip").toLowerCase().replace(/[^a-z0-9]+/g, "-")
      await exportStoryAsPDF(exportRef.current, `${safeName}.pdf`)
    } catch (err) {
      console.error("PDF export failed:", err)
      alert("Couldn't generate the PDF. Check the console for details.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c45c6a]">before vs after</p>
          <h2 className="font-display text-3xl">Your camera roll, rewritten.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setShowBefore((v) => !v)} className="rounded-full border border-[#eadfd4] px-4 py-2 text-xs">
            {showBefore ? "Show after" : "Show dump"}
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={exporting}
            className="rounded-full bg-[#c45c6a] px-4 py-2 text-xs text-white disabled:opacity-50"
          >
            {exporting ? "Preparing PDF…" : "Download as PDF"}
          </button>
          <button type="button" onClick={() => window.print()} className="rounded-full border border-[#eadfd4] px-4 py-2 text-xs">
            Print / save
          </button>
          <button type="button" onClick={onBack} className="rounded-full border border-[#eadfd4] px-4 py-2 text-xs">
            {backLabel}
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl">
        {showBefore ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {photos.map((photo) => (
              <img key={photo.id || photo.url} src={photo.url} alt="" className="h-32 w-full rounded-lg object-cover" />
            ))}
          </div>
        ) : (
          <div ref={exportRef}>
            <StoryLayout story={story} />
          </div>
        )}
      </div>
    </section>
  )
}
