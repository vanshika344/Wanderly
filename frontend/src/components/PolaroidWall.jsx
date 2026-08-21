import { IconRose, IconTicket } from "./graphics"

function PolaroidWall({ story }) {
  return (
    <article className="rounded-[2rem] bg-[#EDE6D9] p-6 sm:p-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#5C7A45]">memory wall</p>
          <h1 className="font-display mt-2 text-5xl leading-none">
            {story.title}
          </h1>
        </div>
        <IconTicket className="h-12 w-20" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {story.pages.map((page, index) => (
          <figure
            key={page.id}
            className="relative bg-white p-3 pb-12 shadow-[8px_12px_0_#0D0D0D]"
            style={{ transform: `rotate(${page.tilt}deg)` }}
          >
            <img src={page.url} alt="" className="h-52 w-full object-cover" />
            <figcaption
              className="mt-3 text-center text-lg text-[#0D0D0D]"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              {page.caption}
            </figcaption>
            {index % 3 === 0 && (
              <span className="absolute -right-3 -top-3">
                <IconRose className="h-8 w-8" />
              </span>
            )}
          </figure>
        ))}
      </div>
    </article>
  )
}

export default PolaroidWall
