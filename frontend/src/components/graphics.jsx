export function IconRose({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M32 54c-8-10-18-18-18-28a18 18 0 1 1 36 0c0 10-10 18-18 28Z" fill="#5C7A45" />
      <path d="M32 18c4 4 8 6 8 12 0 6-4 8-8 12-4-4-8-6-8-12 0-6 4-8 8-12Z" fill="#8B1028" />
      <path d="M32 54V38" stroke="#0D0D0D" strokeWidth="2" />
      <path d="M32 44c-6 2-8 8-8 8M32 48c6 2 9 7 9 7" stroke="#1F6B3A" strokeWidth="2" />
    </svg>
  )
}

export function IconHeel({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M10 34c8-2 16-14 28-14 6 0 10 4 14 10v6H28c-8 0-14 4-18 8" stroke="#0D0D0D" strokeWidth="2.4" fill="#5C7A45" />
      <path d="M50 36v16" stroke="#0D0D0D" strokeWidth="2.4" />
      <path d="M46 52h10" stroke="#0D0D0D" strokeWidth="2.4" />
    </svg>
  )
}

export function IconBag({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect x="12" y="24" width="40" height="28" rx="4" fill="#5C7A45" stroke="#0D0D0D" strokeWidth="2.2" />
      <path d="M22 24c0-8 5-14 10-14s10 6 10 14" stroke="#0D0D0D" strokeWidth="2.2" />
      <circle cx="32" cy="38" r="3" fill="#0D0D0D" />
    </svg>
  )
}

export function IconDress({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M24 10h16M26 10l-4 12 10 4 10-4-4-12" stroke="#0D0D0D" strokeWidth="2.2" />
      <path d="M22 22 12 54h40L42 22" fill="#5C7A45" stroke="#0D0D0D" strokeWidth="2.2" />
    </svg>
  )
}

export function IconSunglasses({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M8 28h10M46 28h10" stroke="#0D0D0D" strokeWidth="2.4" />
      <rect x="10" y="24" width="18" height="14" rx="7" fill="#0D0D0D" />
      <rect x="36" y="24" width="18" height="14" rx="7" fill="#0D0D0D" />
      <path d="M28 30h8" stroke="#5C7A45" strokeWidth="2.4" />
    </svg>
  )
}

export function IconPerfume({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect x="20" y="22" width="24" height="30" rx="4" fill="#5C7A45" stroke="#0D0D0D" strokeWidth="2.2" />
      <rect x="26" y="12" width="12" height="10" fill="#0D0D0D" />
      <rect x="28" y="8" width="8" height="4" fill="#5C7A45" />
    </svg>
  )
}

export function IconPlane({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M8 36 56 20l-8 16 8 8-18-2-8 10-4-10-18-6Z" fill="#5C7A45" stroke="#0D0D0D" strokeWidth="2" />
    </svg>
  )
}

export function IconCamera({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect x="8" y="20" width="48" height="32" rx="4" fill="#0D0D0D" />
      <circle cx="32" cy="36" r="10" fill="#EDE6D9" />
      <circle cx="32" cy="36" r="5" fill="#5C7A45" />
      <rect x="22" y="14" width="12" height="8" rx="2" fill="#5C7A45" />
    </svg>
  )
}

export function IconStamp({ className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden>
      <rect x="8" y="8" width="56" height="56" rx="4" stroke="#5C7A45" strokeWidth="3" strokeDasharray="6 4" />
      <circle cx="36" cy="32" r="10" stroke="#5C7A45" strokeWidth="2" />
      <path d="M20 50c8-8 24-8 32 0" stroke="#5C7A45" strokeWidth="2" />
    </svg>
  )
}

export function IconTicket({ className = "h-10 w-16" }) {
  return (
    <svg viewBox="0 0 88 48" className={className} fill="none" aria-hidden>
      <path d="M4 8h80v12c-4 0-6 4-6 8s2 8 6 8v12H4V36c4 0 6-4 6-8s-2-8-6-8V8Z" fill="#FAF7F2" stroke="#0D0D0D" strokeWidth="2" />
      <path d="M30 8v32" stroke="#5C7A45" strokeWidth="2" strokeDasharray="3 3" />
      <rect x="38" y="16" width="36" height="6" fill="#0D0D0D" />
      <rect x="38" y="26" width="24" height="4" fill="#5C7A45" />
    </svg>
  )
}

export const ELEMENT_KIT = [
  { id: "rose", node: IconRose },
  { id: "heel", node: IconHeel },
  { id: "bag", node: IconBag },
  { id: "dress", node: IconDress },
  { id: "glasses", node: IconSunglasses },
  { id: "perfume", node: IconPerfume },
  { id: "plane", node: IconPlane },
  { id: "camera", node: IconCamera },
]

export function ElementsKit({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-5 ${className}`}>
      {ELEMENT_KIT.map(({ id, node: Icon }) => (
        <Icon key={id} className="h-11 w-11" />
      ))}
    </div>
  )
}

export function FilmStrip({ photos = [], className = "" }) {
  const frames = photos.length
    ? photos.slice(0, 6)
    : Array.from({ length: 4 }, (_, i) => ({ id: `ph-${i}`, url: null }))

  return (
    <div className={`relative bg-[#0D0D0D] px-3 py-4 ${className}`}>
      <div className="absolute inset-y-0 left-0 flex w-4 flex-col justify-between py-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={`l-${i}`} className="mx-auto h-2 w-2 rounded-[1px] bg-[#EDE6D9]" />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 flex w-4 flex-col justify-between py-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={`r-${i}`} className="mx-auto h-2 w-2 rounded-[1px] bg-[#EDE6D9]" />
        ))}
      </div>
      <p className="mb-2 text-center font-mono text-[10px] tracking-[0.35em] text-[#EDE6D9]">
        RYBA 00 · WANDERLY
      </p>
      <div className="space-y-2 px-3">
        {frames.map((frame, index) => (
          <div key={frame.id || index} className="relative overflow-hidden bg-[#1A1A1A]">
            {frame.url ? (
              <img src={frame.url} alt="" className="h-28 w-full object-cover grayscale" />
            ) : (
              <div className="flex h-28 items-center justify-center bg-gradient-to-b from-[#2A2A2A] to-[#111]">
                <span className="font-mono text-xs text-[#5C7A45]">{String(index + 47).padStart(2, "0")}</span>
              </div>
            )}
            <span className="absolute bottom-1 right-2 font-mono text-[10px] text-white/80">
              {String(index + 47).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
