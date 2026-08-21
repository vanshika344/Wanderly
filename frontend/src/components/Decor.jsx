import { Sparkle } from "./Logo"
import { RAIN_SHOTS } from "../lib/designShots"

export function PhotoRain({ extra = [] }) {
  const frames = [...extra.map((p) => p.url).filter(Boolean), ...RAIN_SHOTS].slice(0, 10)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {frames.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="rain-polaroid absolute top-[-20%] bg-white p-1.5 shadow-lg"
          style={{
            left: `${6 + (index * 9.4) % 88}%`,
            width: index % 3 === 0 ? 78 : 64,
            animationDuration: `${7 + (index % 5) * 1.4}s`,
            animationDelay: `${index * 0.55}s`,
            "--tilt": `${(index % 7) * 4 - 12}deg`,
            zIndex: index % 2,
          }}
        >
          <img src={src} alt="" className="h-20 w-full object-cover" />
        </div>
      ))}
      {[
        { top: "12%", left: "18%" },
        { top: "28%", left: "72%" },
        { top: "48%", left: "8%" },
        { top: "62%", left: "86%" },
        { top: "16%", left: "52%" },
      ].map((pos, i) => (
        <span key={`star-${i}`} className="absolute" style={pos}>
          <Sparkle
            className="y2k-star h-5 w-5"
            color={i % 2 ? "#C6FF6B" : "#5C7A45"}
          />
        </span>
      ))}
    </div>
  )
}

export function Postmark({ className = "" }) {
  return (
    <div
      className={`flex h-24 w-24 rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-[#5C7A45]/70 text-center ${className}`}
    >
      <div className="rounded-full border border-dashed border-[#5C7A45] px-3 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F4A2C]">
          memories
        </p>
        <p className="font-hand text-sm text-[#5C7A45]">wanderly</p>
      </div>
    </div>
  )
}

export function Washi({ className = "", rotate = -8 }) {
  return (
    <span
      className={`absolute h-4 w-20 bg-gradient-to-r from-[#D4B896] to-[#C5A57A] opacity-80 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  )
}

export function Floral({ className = "h-16 w-16" }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <path d="M40 72c-8-16-24-22-24-38a24 24 0 1 1 48 0c0 16-16 22-24 38Z" fill="#A8C47A" />
      <path d="M40 28c6 4 10 8 10 14s-4 8-10 14c-6-6-10-8-10-14s4-10 10-14Z" fill="#5C7A45" />
      <path d="M18 50c10 4 18 2 22-6" stroke="#2F4A2C" strokeWidth="1.4" />
    </svg>
  )
}

export function PaperPlane({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M8 32 56 12 28 52 24 36Z" stroke="#2F4A2C" strokeWidth="2" fill="#E4EAD4" />
      <path d="M24 36 56 12" stroke="#5C7A45" strokeWidth="2" />
    </svg>
  )
}

export function Birds({ className = "h-8 w-16" }) {
  return (
    <svg viewBox="0 0 80 32" className={className} fill="none" aria-hidden>
      <path d="M8 20c6-8 12-8 16 0" stroke="#2F4A2C" strokeWidth="1.8" />
      <path d="M34 12c5-7 10-7 14 0" stroke="#2F4A2C" strokeWidth="1.8" />
      <path d="M56 18c4-6 8-6 12 0" stroke="#2F4A2C" strokeWidth="1.8" />
    </svg>
  )
}

export function Y2KStar({ className = "h-8 w-8" }) {
  return <Sparkle className={`y2k-star ${className}`} color="#C6FF6B" />
}
