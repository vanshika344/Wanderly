import { IconCamera, IconPlane, IconStamp } from "./graphics"

function ComicStrip({ story }) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border-4 border-[#0D0D0D] bg-[#FAF7F2] p-4 sm:p-8">
      <IconPlane className="absolute right-6 top-6 h-12 w-12 opacity-80" />
      <header className="mb-6 border-b-4 border-[#0D0D0D] pb-4">
        <p className="font-mono text-xs tracking-[0.4em] text-[#5C7A45]">WANDERLY COMICS</p>
        <h1
          className="mt-2 text-5xl uppercase leading-none sm:text-6xl"
          style={{ fontFamily: '"Bangers", system-ui' }}
        >
          {story.title}!
        </h1>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {story.pages.map((page, index) => (
          <figure
            key={page.id}
            className={`relative border-4 border-[#0D0D0D] bg-white p-2 ${
              index === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <span className="absolute left-3 top-3 z-10 bg-[#5C7A45] px-2 py-1 font-mono text-[10px] tracking-widest text-white">
              {page.beat.stamp}
            </span>
            <img
              src={page.url}
              alt=""
              className={`w-full object-cover ${index === 0 ? "h-72" : "h-48"}`}
            />
            <figcaption className="mt-2 bg-[#0D0D0D] px-3 py-2 text-sm text-[#FAF7F2]">
              {page.caption}
            </figcaption>
            {index === 1 && (
              <span className="absolute -right-2 -top-2 rotate-6">
                <IconStamp className="h-14 w-14" />
              </span>
            )}
            {index === 2 && (
              <span className="absolute bottom-14 right-3">
                <IconCamera className="h-8 w-8" />
              </span>
            )}
          </figure>
        ))}
      </div>
    </article>
  )
}

export default ComicStrip
