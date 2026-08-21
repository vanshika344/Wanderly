export function Sparkle({ className = "h-5 w-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <path d="M12 1.5 13.8 9 21 12l-7.2 3L12 22.5 10.2 15 3 12l7.2-3Z" />
    </svg>
  )
}

export function LeafMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <path
        d="M8 30c2-11 10-20 24-24-2 14-11 22-24 24Z"
        fill="#c45c6a"
      />
      <path
        d="M10 28c8-4 14-12 18-22"
        fill="none"
        stroke="#7a3b46"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Designer camera mark — lines first, then fills */
export function BrandLogo({
  className = "h-20 w-auto",
  alt = "Wanderly",
  variant = "brand",
  showType = true,
}) {
  return (
    <svg
      viewBox="0 0 416 416"
      role="img"
      aria-label={alt}
      className={`brand-logo brand-logo-${variant} ${className}`}
    >
      <g className="logo-camera" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="logo-ink"
          strokeWidth="10"
          d="M30 75c20-18 44-6 54 16l39 88c8 18 25 23 39 10l26-25c13-13 9-32-6-40-17-9-32 4-31 23l2 32c1 14 12 20 23 11l35-30c16-14 25-35 30-59l9-39c3-13 13-21 27-21h48c14 0 21 7 25 20l8 29c4 13 15 20 28 20h21c13 0 18 8 18 18 0 7-5 12-13 12h-9"
        />
        <path className="logo-ink" strokeWidth="10" d="M177 75h147" />
        <path className="logo-ink" strokeWidth="8" d="M193 104h37" />
        <path className="logo-ink" strokeWidth="9" d="M335 139c0 21-2 40-2 59v35c0 20-12 32-32 32H221" />
      </g>
      <circle className="logo-lens-disc" cx="257" cy="183" r="59" />
      <path className="logo-peak-front" d="M211 211l28-30 17 15 17-22 31 37z" />
      <path className="logo-peak-back" d="M211 221l28-30 17 15 17-22 31 37z" />
      <path className="logo-ink" fill="none" strokeWidth="7" strokeLinecap="round" d="M205 249h89" />
      <g className="logo-sparkles">
        <path d="M370 22l5 16 15 5-15 5-5 16-5-16-15-5 15-5z" />
        <path d="M400 72l3 10 10 3-10 3-3 10-3-10-10-3 10-3z" />
      </g>
      {showType && (
        <>
          <text className="logo-word" x="208" y="315" textAnchor="middle">
            Wanderly
          </text>
          <text className="logo-tagline" x="208" y="349" textAnchor="middle">
            TURN YOUR JOURNEY INTO A STORY
          </text>
        </>
      )}
    </svg>
  )
}

export function ReferenceLogo({ className = "", alt = "Wanderly", showType = true }) {
  return (
    <svg
      viewBox="0 0 240 220"
      role="img"
      aria-label={alt}
      className={`reference-logo ${className}`}
    >
      <defs>
        <radialGradient id="reference-lens" cx="34%" cy="28%" r="78%">
          <stop offset="0" stopColor="#f2b16d" />
          <stop offset="0.52" stopColor="#bd5a2e" />
          <stop offset="1" stopColor="#702b1f" />
        </radialGradient>
      </defs>
      <g className="reference-mark" fill="none" stroke="#403a37" strokeLinecap="round" strokeLinejoin="round">
        <path className="reference-stroke reference-stroke-one" strokeWidth="2.4" d="M70 51c-18-13-31-5-25 5 6 10 22 8 31-1 9-9 17-19 28-20" />
        <path className="reference-stroke reference-stroke-two" strokeWidth="2.1" d="M92 35c7-11 22-12 31-3 8 8 7 19 0 27-6 7-16 11-20 20" />
        <path className="reference-stroke reference-stroke-three" strokeWidth="2" d="M73 48h61c7 0 12 5 12 12v40c0 7-5 12-12 12H77c-7 0-12-5-12-12V61c0-7 3-11 8-13Z" />
      </g>
      <circle className="reference-lens" cx="116" cy="72" r="30" fill="url(#reference-lens)" stroke="#403a37" strokeWidth="2.2" />
      <path className="reference-glint" d="M103 57c5-5 12-8 19-8" fill="none" stroke="#f8d3a2" strokeWidth="2" strokeLinecap="round" />
      <path className="reference-stroke reference-stroke-four" strokeWidth="2.2" d="M78 39c8 4 11 13 8 22-3 9-2 20 8 26 11 8 27 4 32-8 5-12-2-25-13-28-10-3-20 3-22 12" fill="none" stroke="#403a37" strokeLinecap="round" strokeLinejoin="round" />
      <g className="reference-dots" fill="#8b8178">
        <circle cx="158" cy="27" r="2" />
        <circle cx="167" cy="38" r="1.4" />
        <circle cx="174" cy="52" r="1.1" />
      </g>
      {showType && (
        <>
          <text className="reference-word" x="120" y="145" textAnchor="middle">Wanderly</text>
          <text className="reference-tagline" x="120" y="164" textAnchor="middle">TURN YOUR JOURNEY INTO A STORY</text>
        </>
      )}
    </svg>
  )
}

export function SplashLogo() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-label="Wanderly">
      <path d="M45 52 Q90 18 135 52" stroke="#8B5A3C" strokeWidth="5" strokeLinecap="round" />
      <rect x="38" y="48" width="104" height="72" rx="18" fill="#8B5A3C" />
      <rect x="58" y="38" width="28" height="12" rx="6" fill="#8B5A3C" />
      <circle cx="90" cy="84" r="24" fill="#EEDFCF" />
      <circle cx="90" cy="84" r="14" fill="#8B5A3C" />
      <circle cx="124" cy="62" r="4" fill="#EEDFCF" />
    </svg>
  )
}
