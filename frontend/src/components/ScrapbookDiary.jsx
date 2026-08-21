import { Floral, Postmark, Washi } from "./Decor"
import { IconTicket } from "./graphics"

function ScrapbookDiary({ story }) {
  return (
    <article className="scrap-paper relative overflow-hidden rounded-[2rem] p-5 sm:p-10">
      <Floral className="absolute left-4 top-6 h-16 w-16" />
      <Floral className="absolute bottom-8 right-6 h-20 w-20 rotate-12" />
      <Postmark className="absolute right-6 top-8 hidden sm:flex" />
      <Washi className="left-1/3 top-3" rotate={-6} />

      <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-[#5C7A45]">dear diary — {story.date}</p>
          <h1 className="font-display mt-1 text-5xl leading-tight sm:text-6xl">{story.title}</h1>
        </div>
        <IconTicket className="h-12 w-24 rotate-6" />
      </div>

      <p className="font-hand relative mb-10 max-w-2xl text-2xl leading-8 text-[#3D4A2C]">
        {story.copy[1]}
      </p>

      <div className="columns-1 gap-6 sm:columns-2">
        {story.pages.map((page, index) => (
          <figure
            key={page.id}
            className="relative mb-6 break-inside-avoid bg-[#F7F1E6] p-3 shadow-[6px_8px_0_#5C7A45]"
            style={{ transform: `rotate(${page.tilt}deg)` }}
          >
            <Washi className="left-6 top-[-8px]" rotate={index % 2 ? 9 : -8} />
            <img src={page.url} alt="" className="h-52 w-full object-cover" />
            <figcaption className="font-hand mt-3 text-xl leading-6">{page.caption}</figcaption>
            <span className="absolute -right-2 -top-2 rotate-12 bg-gradient-to-r from-[#2F4A2C] to-[#A8C47A] px-2 py-1 text-[10px] uppercase tracking-widest text-[#F7F1E6]">
              {page.sticker}
            </span>
            {index === 0 && (
              <span className="absolute bottom-8 left-[-8px] rotate-[-12deg] bg-[#2F4A2C] px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#F7F1E6]">
                day one
              </span>
            )}
          </figure>
        ))}
      </div>
    </article>
  )
}

export default ScrapbookDiary
