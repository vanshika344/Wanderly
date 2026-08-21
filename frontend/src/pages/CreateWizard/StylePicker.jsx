import { useState } from "react"
import { STYLE_CARDS } from "../../lib/designShots"

const FORMATS = [
  ...STYLE_CARDS,
]

const THEMES = [
  { id: "warm", title: "Warm" },
  { id: "cool", title: "Cool" },
  { id: "earth", title: "Earth" },
  { id: "mono", title: "Mono" },
]

function StylePicker({ format, setFormat, referenceIndex, setReferenceIndex, colorTheme, setColorTheme, onBack, onNext }) {
  const [showReferences, setShowReferences] = useState(false)
  const selectedFormat = FORMATS.find((item) => item.id === format) ?? FORMATS[0]

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold tracking-wider text-[#9f4955]">STEP 3 OF 4</p>
      <p className="font-hand mt-2 text-lg text-[#9b6a52]">Format</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FORMATS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setFormat(item.id)
              setShowReferences(true)
            }}
            className={`overflow-hidden rounded-2xl border text-left transition-shadow ${
              format === item.id
                ? "border-[#6B21A8] bg-[#E9D5FF]/50 shadow-[0_8px_20px_rgba(107,33,168,0.14)]"
                : "border-[#572d27]/15 bg-white/50 hover:shadow-[0_8px_20px_rgba(87,45,39,0.1)]"
            }`}
          >
            <div className="grid grid-cols-2 gap-1.5 bg-white/60 p-1.5">
              {item.shots.map((shot, index) => (
                <img
                  key={shot}
                  src={shot}
                  alt={`${item.title} reference ${index + 1}`}
                  className="aspect-square w-full bg-[#f4eee5] object-contain"
                />
              ))}
            </div>
            <div className="px-4 py-3">
              <p className="font-display text-xl text-[#2f2420]">{item.title}</p>
              <p className="mt-1 text-xs text-[#8a7464]">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
      {showReferences && <div className="mt-6">
        <p className="font-hand text-lg text-[#9b6a52]">How should your {selectedFormat.title.toLowerCase()} look?</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {selectedFormat.shots.map((shot, index) => (
            <button
              key={shot}
              type="button"
              onClick={() => setReferenceIndex(index)}
              className={`overflow-hidden rounded-2xl border text-left transition-shadow ${
                referenceIndex === index
                  ? "border-[#c45c6a] bg-[#faebeb] shadow-[0_8px_20px_rgba(196,92,106,0.16)]"
                  : "border-[#572d27]/15 bg-white/50 hover:shadow-[0_8px_20px_rgba(87,45,39,0.1)]"
              }`}
            >
              <img src={shot} alt={`${selectedFormat.title} reference ${index + 1}`} className="aspect-square w-full bg-[#f4eee5] object-contain" />
              <span className="block px-3 py-2 text-xs text-[#5c534c]">Reference {index + 1}</span>
            </button>
          ))}
        </div>
      </div>}
      <p className="font-hand mt-6 text-lg text-[#9b6a52]">Color theme</p>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {THEMES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setColorTheme(item.id)}
            className={`rounded-2xl border px-4 py-3 text-sm ${
              colorTheme === item.id ? "border-[#c45c6a] bg-[#faebeb]" : "border-[#572d27]/15 bg-white/50"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button type="button" onClick={onBack} className="text-sm text-[#9b6a52]">← Back</button>
        <button type="button" onClick={onNext} className="text-sm uppercase tracking-[0.2em] text-[#6B21A8]">Next →</button>
      </div>
    </div>
  )
}

export default StylePicker
