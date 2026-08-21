import { useState } from "react"
import { motion } from "framer-motion"
import { DUMP_SHOTS, FACES, HERO_POLAROIDS, STYLE_CARDS } from "../lib/designShots"
import { ReferenceLogo } from "./Logo"

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const revealTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] }

const viewport = { once: true, amount: 0.18 }

export function CanvaWave() {
  return (
    <div className="canva-wave-wrap" aria-hidden="true">
      <svg className="canva-wave" viewBox="0 0 1600 280" preserveAspectRatio="none">
        <path
          className="canva-wave-fill"
          d="M-80 160C120 40 280 230 470 120c190-110 310 90 520 20 210-70 330 80 520-10 80-38 160-20 250 30V280H-80Z"
        />
        <path
          className="canva-wave-stroke"
          d="M-80 148C140 28 300 218 490 108c190-110 300 96 510 24 210-72 340 86 540-8"
          fill="none"
        />
      </svg>
    </div>
  )
}

export function WatercolorWash() {
  return (
    <div className="watercolor-wash" aria-hidden="true">
      <span className="wash wash-rose" />
      <span className="wash wash-sage" />
      <span className="wash wash-sand" />
    </div>
  )
}

export function MemoryStamp() {
  return (
    <div className="memory-stamp">
      <span>MEMORIES</span>
      <small>LIVE · GO</small>
    </div>
  )
}

export function Hero({ onCreate }) {
  const collagePositions = [
    { width: 166, left: "2%", top: 32, zIndex: 2 },
    { width: 176, left: "30%", top: 8, zIndex: 4 },
    { width: 166, left: "63%", top: 28, zIndex: 3 },
    { width: 166, left: "10%", top: 228, zIndex: 3 },
    { width: 176, left: "42%", top: 210, zIndex: 4 },
  ]
  const entranceOffsets = [
    { x: -36, y: -34 },
    { x: 0, y: -58 },
    { x: 38, y: -42 },
    { x: -42, y: 38 },
    { x: 28, y: 46 },
  ]

  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-2">
      <CanvaWave />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-20">
          <p className="font-script text-4xl text-[#c45c6a]">your journey, your story.</p>
          <h1 className="font-display mt-3 max-w-xl text-[52px] leading-[1.05] text-[#1f1b18] sm:text-6xl">
            Turn your travel memories into a <em>story</em> worth keeping.
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#5c534c]">
            A few photos. A little story.
            <br />
            Our beautiful Wanderly templates do the rest.
          </p>
          <button
            type="button"
            onClick={onCreate}
            className="mt-7 rounded-full border border-[#c45c6a] bg-white/70 px-7 py-3 text-sm text-[#c45c6a]"
          >
            Create My Wanderly →
          </button>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {FACES.map((src) => (
                <img key={src} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <p className="max-w-[220px] text-xs leading-5 text-[#5c534c]">
              Join 10K+ travelers who turned their trips into keepsakes.
            </p>
          </div>
        </div>

        <div className="relative z-20 h-[420px]">
          <MemoryStamp />
          {HERO_POLAROIDS.map((shot, index) => (
            <motion.figure
              key={shot.caption}
              className="polaroid-card absolute bg-white p-2 pb-8 shadow-[8px_16px_30px_rgba(70,50,40,0.16)]"
              style={collagePositions[index]}
              initial={{ ...entranceOffsets[index], opacity: 0, rotate: shot.tilt + (index % 2 ? -4 : 4) }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: shot.tilt }}
              transition={{ delay: 0.15 + index * 0.52, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
                <img src={shot.src} alt="" className={`photo-shuffle photo-shuffle-${index} h-52 w-full object-cover`} />
              <figcaption className="font-hand absolute bottom-2 left-0 right-0 text-center text-lg text-[#4a4038]">
                {shot.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks({ sectionRef }) {
  const steps = [
    {
      n: "01",
      title: "Drop your memories.",
      copy: "Upload the photos that made your journey special.",
      tone: "#f4dce2",
      icon: "cloud",
    },
    {
      n: "02",
      title: "Tell us the story.",
      copy: "Add little details that bring your memories to life.",
      tone: "#e7dff0",
      icon: "note",
    },
    {
      n: "03",
      title: "Let Wanderly tell it.",
      copy: "Your memories become a beautiful travel story.",
      tone: "#dde6d4",
      icon: "star",
    },
  ]

  return (
    <motion.section
      ref={sectionRef}
      id="how"
      className="relative px-6 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      transition={revealTransition}
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.34em] text-[#c45c6a]">how it works</p>
      <h2 className="font-display mx-auto mt-2 max-w-3xl text-center text-5xl text-[#1f1b18]">
        From photo dump to travel story.
      </h2>
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.article
            key={step.n}
            className="relative rounded-[1.6rem] p-6 pt-8"
            style={{ background: step.tone }}
            variants={reveal}
            transition={{ ...revealTransition, delay: index * 0.12 }}
            whileHover={{ y: -8, rotate: index % 2 ? 1 : -1, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.98 }}
          >
            {index < 2 && <span className="how-arrow">→</span>}
            <div className="mb-4 flex items-center justify-between text-[#c45c6a]">
              <StepIcon name={step.icon} />
              <span className="font-display text-2xl">{step.n}</span>
            </div>
            <h3 className="font-display text-2xl text-[#1f1b18]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5c534c]">{step.copy}</p>
            <div className="mt-5 flex gap-2">
              <img src={DUMP_SHOTS[index]} alt="" className="photo-shuffle photo-shuffle-small h-16 w-20 rotate-[-6deg] rounded-md object-cover shadow" />
              <img src={DUMP_SHOTS[index + 3]} alt="" className="photo-shuffle photo-shuffle-small-reverse h-16 w-20 rotate-[5deg] rounded-md object-cover shadow" />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

function StepIcon({ name }) {
  if (name === "cloud") {
    return (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M10 22h12a5 5 0 0 0 .4-10 7 7 0 0 0-13.2 2A4.5 4.5 0 0 0 10 22Z" />
      </svg>
    )
  }
  if (name === "note") {
    return (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="8" y="6" width="16" height="20" rx="2" />
        <path d="M12 12h8M12 16h8M12 20h5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
      <path d="M16 4 18 12h8l-6 5 2 8-6-4-6 4 2-8-6-5h8Z" />
    </svg>
  )
}

export function Styles({ sectionRef, style, setStyle, referenceIndex, setReferenceIndex, onPreview }) {
  const [showReferences, setShowReferences] = useState(false)
  const selectedStyle = STYLE_CARDS.find((item) => item.id === style) ?? STYLE_CARDS[0]

  function pickStyle(id) {
    setStyle(id)
    setShowReferences(true)
  }

  function previewStyle(id) {
    setStyle(id)
    setShowReferences(true)
    onPreview?.()
  }

  return (
    <motion.section
      ref={sectionRef}
      id="mood"
      className="relative px-6 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      transition={revealTransition}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[0.7fr_1.7fr_0.7fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c45c6a]">choose your style</p>
          <h2 className="font-display mt-2 text-4xl leading-tight text-[#1f1b18]">
            Four ways to tell one unforgettable journey.
          </h2>
          <p className="mt-3 text-sm text-[#5c534c]">Pick a style that fits your vibe.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STYLE_CARDS.map((item) => (
            <motion.div
              key={item.id}
              className="rounded-[1.4rem] p-3"
              style={{ background: item.tone, outline: style === item.id ? "2px solid #c45c6a" : "none" }}
              variants={reveal}
              transition={{ ...revealTransition, delay: STYLE_CARDS.indexOf(item) * 0.1 }}
              whileHover={{ y: -7, rotate: item.id === style ? 0 : 1.5, transition: { duration: 0.22 } }}
            >
              <button type="button" onClick={() => pickStyle(item.id)} className="w-full text-left">
                <div className="relative h-28">
                  <img src={item.shots[0]} alt="" className="photo-shuffle absolute left-2 top-2 aspect-square w-[46%] rotate-[-6deg] object-contain shadow" />
                  <img src={item.shots[1]} alt="" className="photo-shuffle photo-shuffle-reverse absolute right-2 top-3 aspect-square w-[46%] rotate-[7deg] object-contain shadow" />
                </div>
                <p className="mt-3 font-medium text-[#1f1b18]">{item.title}</p>
                <p className="text-xs text-[#6a615a]">{item.description}</p>
              </button>
              <button
                type="button"
                onClick={() => previewStyle(item.id)}
                className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs text-[#c45c6a] hover:bg-[#fff5f6]"
              >
                Preview
              </button>
            </motion.div>
          ))}
        </div>
        {showReferences && <div className="lg:col-span-3">
          <p className="font-hand text-lg text-[#9b6a52]">How should your {selectedStyle.title.toLowerCase()} look?</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {selectedStyle.shots.map((shot, index) => (
              <button
                key={shot}
                type="button"
                onClick={() => setReferenceIndex(index)}
                className={`overflow-hidden rounded-2xl border text-left transition-shadow ${
                  referenceIndex === index
                    ? "border-[#c45c6a] bg-[#faebeb] shadow-[0_8px_20px_rgba(196,92,106,0.16)]"
                    : "border-[#eadfce] bg-white/60 hover:shadow-[0_8px_20px_rgba(80,60,50,0.1)]"
                }`}
              >
                <img src={shot} alt={`${selectedStyle.title} reference ${index + 1}`} className="aspect-square w-full bg-[#f4eee5] object-contain" />
                <span className="block px-3 py-2 text-xs text-[#5c534c]">Reference {index + 1}</span>
              </button>
            ))}
          </div>
        </div>}
        <aside className="relative rotate-2 rounded-[1.2rem] border border-[#eadfce] bg-[#f7f1e6] p-5 shadow-[6px_8px_0_rgba(196,92,106,0.12)]">
          <p className="font-display text-3xl text-[#1f1b18]">Made for wanderers</p>
          <ul className="mt-4 space-y-2 text-sm text-[#5c534c]">
            <li>✓ Beautiful templates</li>
            <li>✓ Easy storytelling</li>
            <li>✓ Your memories, forever</li>
          </ul>
        </aside>
      </div>
    </motion.section>
  )
}

export function Studio({ sectionRef, photos, onChange, onRemove }) {
  const display = photos.length
    ? photos.map((p) => ({ id: p.id, src: p.url, uploaded: true }))
    : DUMP_SHOTS.map((src) => ({ id: src, src, uploaded: false }))

  const top = display.slice(0, 3)
  const bottom = display.slice(3, 7)

  return (
    <motion.section
      ref={sectionRef}
      id="studio"
      className="relative px-6 py-14"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      transition={revealTransition}
    >
      <span className="corner-florals" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c45c6a]">step 1 of 4</p>
          <h2 className="font-display mt-2 text-5xl leading-[1.05] text-[#1f1b18]">
            Start with your
            <br />
            photo dump.
          </h2>
          <span className="mt-4 block h-[3px] w-16 bg-[#c45c6a]" />
          <label className="dump-drop mt-8 block cursor-pointer">
            <CloudUp />
            <p className="mt-3 font-medium text-[#1f1b18]">Drop your memories here</p>
            <p className="mt-1 text-sm text-[#8a7f77]">or click to browse</p>
            <span className="mt-5 inline-block rounded-full bg-[#9a4d5c] px-8 py-2.5 text-sm text-white">Add Photos</span>
            <p className="mt-4 text-xs tracking-wide text-[#9a9088]">JPG, PNG • up to 50 photos</p>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={onChange} />
          </label>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {top.map((item) => (
              <DumpCard key={item.id} item={item} onRemove={onRemove} tall />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {bottom.map((item) => (
              <DumpCard key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function DumpCard({ item, onRemove, tall }) {
  return (
    <motion.div
      className="dump-card relative overflow-hidden rounded-[1.15rem] bg-white p-1.5 shadow-[0_10px_24px_rgba(80,60,50,0.12)]"
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...revealTransition, delay: item.uploaded ? 0 : 0.08 }}
      whileHover={{ y: -6, rotate: tall ? -1 : 1, transition: { duration: 0.2 } }}
      layout
    >
      <img src={item.src} alt="" className={`w-full rounded-[0.9rem] object-cover ${tall ? "h-44" : "h-32"}`} />
      {item.uploaded ? (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-[#1f1b18] shadow"
        >
          ×
        </button>
      ) : (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-[#1f1b18] shadow">
          ×
        </span>
      )}
    </motion.div>
  )
}

function CloudUp() {
  return (
    <svg viewBox="0 0 64 64" className="mx-auto h-12 w-12 text-[#c45c6a]" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M18 42h26a10 10 0 0 0 1-20 14 14 0 0 0-26.4 4A9 9 0 0 0 18 42Z" />
      <path d="M32 38V24m0 0-6 6m6-6 6 6" />
    </svg>
  )
}

export function StoryForm({ sectionRef, trip, setTrip, error }) {
  return (
    <motion.section
      ref={sectionRef}
      id="story"
      className="py-8"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      transition={revealTransition}
    >
      <motion.div className="rounded-[1.6rem] bg-white/55 p-7 shadow-[0_12px_40px_rgba(80,60,40,0.06)]" whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c45c6a]">step 2 of 4</p>
        <h2 className="font-display mt-2 text-4xl text-[#1f1b18]">Tell us the story behind the journey.</h2>
        <div className="mt-6 space-y-4">
          <Field label="Where did you go?" placeholder="e.g. Jaipur, India" value={trip.place} onChange={(v) => setTrip((p) => ({ ...p, place: v }))} />
          <Field label="When was it?" placeholder="e.g. March 2024" value={trip.when} onChange={(v) => setTrip((p) => ({ ...p, when: v }))} />
          <Field label="Who was it with?" placeholder="e.g. Friends, Family" value={trip.who} onChange={(v) => setTrip((p) => ({ ...p, who: v }))} />
          <label className="block">
            <span className="text-sm text-[#3a342f]">What made it special?</span>
            <textarea
              value={trip.notes}
              onChange={(e) => setTrip((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Share your favorite moments..."
              className="mt-1 min-h-24 w-full resize-none rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-sm outline-none"
            />
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-[#c45c6a]">{error}</p>}
      </motion.div>
    </motion.section>
  )
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-[#3a342f]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-sm outline-none"
      />
    </label>
  )
}

export function PreviewStrip({ sectionRef, photos, trip, style, onCreate, onCustomize }) {
  const pages = photos.length ? photos.slice(0, 5).map((p) => p.url) : DUMP_SHOTS.slice(0, 5)
  const styleLabel = STYLE_CARDS.find((c) => c.id === style)?.title ?? "Scrapbook"
  return (
    <motion.section
      ref={sectionRef}
      id="preview"
      className="py-8"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      transition={revealTransition}
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c45c6a]">preview your story</p>
        <h2 className="font-display mt-1 text-4xl text-[#1f1b18]">Here&apos;s how your Wanderly story looks!</h2>
        <div className="open-book mt-8 grid gap-0 overflow-hidden rounded-[1.4rem] bg-[#f3eadc] shadow-[0_18px_40px_rgba(80,50,40,0.12)] sm:grid-cols-2">
          <div className="border-r border-[#e4d6c4] p-8">
            <p className="font-display text-4xl text-[#1f1b18]">{trip.place ? `${trip.place} Diaries` : "Jaipur Diaries"}</p>
            <p className="mt-1 text-sm text-[#c45c6a]">{trip.when || "May 2024"}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8a7f77]">{styleLabel} style</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#5c534c]">
              {trip.notes ||
                "A few days filled with colors, laughter and memories that will last forever."}
            </p>
          </div>
          <div className="relative min-h-64 p-6">
            {pages.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className="preview-photo absolute rounded-md object-cover shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: [-8, 4, [-4, 6, -3, 8, 2][i]] }}
                viewport={viewport}
                transition={{ ...revealTransition, delay: i * 0.1 }}
                style={{
                  width: i === 0 ? 150 : 90,
                  height: i === 0 ? 170 : 80,
                  left: i === 0 ? 40 : 40 + (i % 2) * 100,
                  top: i === 0 ? 20 : 30 + Math.floor((i - 1) / 2) * 90,
                  transform: `rotate(${[-4, 6, -3, 8, 2][i]}deg)`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCustomize}
            className="rounded-full border border-[#d7cbbd] px-5 py-2 text-sm hover:bg-[#faf6f0]"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="rounded-full bg-[#5f6f58] px-5 py-2 text-sm text-white"
          >
            Download Story ↓
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export function Footer({ onHome, onPickStyle }) {
  const templates = [
    { id: "magazine", label: "Magazine" },
    { id: "scrapbook", label: "Scrapbook" },
    { id: "comic", label: "Comic" },
    { id: "polaroid", label: "Polaroid" },
  ]

  return (
    <footer className="border-t border-[#eadfd4] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-8">
        <button type="button" onClick={onHome} className="flex items-center gap-2">
          <ReferenceLogo className="site-logo h-20 w-auto" />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a9088]">explore templates</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#5c534c]">
            {templates.map((t) => (
              <button key={t.id} type="button" onClick={() => onPickStyle?.(t.id)} className="hover:text-[#c45c6a]">
                {t.label}
              </button>
            ))}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a9088]">trusted by travellers worldwide</p>
          <p className="mt-2 text-sm tracking-wide text-[#5c534c]">Airbnb · Booking.com · Expedia · Tripadvisor · Emirates</p>
        </div>
        <p className="font-hand text-2xl text-[#c45c6a]">Let&apos;s keep the memories alive.</p>
      </div>
    </footer>
  )
}
