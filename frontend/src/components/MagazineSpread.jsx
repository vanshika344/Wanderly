import { ElementsKit, FilmStrip, IconRose, IconStamp } from "./graphics"

function MagazineSpread({ story }) {
  const filmPhotos = story.pages.slice(0, 4)
  const rest = story.pages.slice(1)

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#0D0D0D] bg-[#FAF7F2] text-[#0D0D0D] shadow-[0_24px_80px_rgba(13,13,13,0.25)]">
      <div className="grid min-h-[540px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-between bg-gradient-to-b from-[#2F4A2C] via-[#5C7A45] to-[#A8C47A] px-8 py-10 text-[#F7F1E6] sm:px-12">
          <p className="text-[11px] uppercase tracking-[0.42em]">
            the new face of your trip
          </p>
          <div>
            <h1 className="font-display text-6xl uppercase leading-[0.85] sm:text-8xl">
              {story.title}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/90">{story.subtitle}</p>
          </div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em]">
            <span>Vol. {story.issue}</span>
            <span>{story.date}</span>
          </div>
          <IconRose className="absolute bottom-8 right-8 h-14 w-14 opacity-90" />
        </div>
        <FilmStrip photos={filmPhotos} className="min-h-full" />
      </div>

      <div className="border-y border-[#0D0D0D] bg-[#EDE6D9] px-6 py-8 sm:px-10">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.4em] text-[#5C7A45]">
          additional elements kit
        </p>
        <ElementsKit />
      </div>

      <div className="grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-[17px] leading-8">
          {story.copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="relative border-l border-[#0D0D0D] pl-6">
          <IconStamp className="absolute -right-2 -top-4 h-16 w-16" />
          <p className="font-display text-3xl italic leading-snug">
            “{story.quote}”
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[#5C7A45]">
            {story.photoCount} frames · unedited dump
          </p>
        </aside>
      </div>

      {rest.length > 0 && (
        <div className="grid gap-0 border-t border-[#0D0D0D] sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((page, index) => (
            <figure key={page.id} className="border-[#0D0D0D] sm:border-r">
              <img src={page.url} alt="" className="h-56 w-full object-cover grayscale" />
              <figcaption className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#6B5148]">
                Fig. {String(index + 2).padStart(2, "0")} — {page.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  )
}

export default MagazineSpread
