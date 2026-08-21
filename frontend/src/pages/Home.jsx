import { createWanderlyStory } from "../lib/createStory"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"
import Splash from "../components/Splash"
import { StoryView } from "../components/StoryView"
import { useAuth } from "../AuthContext"
import {
  Footer,
  Hero,
  HowItWorks,
  PreviewStrip,
  StoryForm,
  Studio,
  Styles,
} from "../components/Landing"

const GENERATE_STEPS = ["Sorting the dump…", "Finding the through-line…", "Taping the spread…"]

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showSplash, setShowSplash] = useState(true)
  const [photos, setPhotos] = useState([])
  const [style, setStyle] = useState("scrapbook")
  const [referenceIndex, setReferenceIndex] = useState(0)
  const [trip, setTrip] = useState({ place: "", when: "", who: "", notes: "" })
  const [view, setView] = useState("home")
  const [story, setStory] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState("")
  const studioRef = useRef(null)
  const howRef = useRef(null)
  const moodRef = useRef(null)
  const storyRef = useRef(null)
  const previewRef = useRef(null)
  const generateTimer = useRef(null)
  const stepTimer = useRef(null)
  const photosRef = useRef(photos)
  const splashDone = useRef(false)
  photosRef.current = photos

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url))
      if (generateTimer.current) window.clearTimeout(generateTimer.current)
      if (stepTimer.current) window.clearInterval(stepTimer.current)
    }
  }, [])

  function finishSplash() {
    if (splashDone.current) return
    splashDone.current = true
    setShowSplash(false)
  }

  function jump(id) {
    const map = { how: howRef, mood: moodRef, studio: studioRef, story: storyRef, preview: previewRef }
    map[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function goCreate() {
    if (user) navigate("/create")
    else navigate("/signup")
  }

  function pickStyle(id) {
    setStyle(id)
    jump("mood")
  }

  function handlePhotoChange(event) {
    const files = Array.from(event.target.files || []).slice(0, 50)
    setPhotos((prev) => {
      prev.forEach((photo) => URL.revokeObjectURL(photo.url))
      return files.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        file,
        url: URL.createObjectURL(file),
      }))
    })
    setError("")
  }

  function removePhoto(id) {
    setPhotos((prev) => {
      const next = prev.filter((photo) => photo.id !== id)
      const gone = prev.find((photo) => photo.id === id)
      if (gone) URL.revokeObjectURL(gone.url)
      return next
    })
  }

  function createStory() {
    if (!photos.length) {
      setError("Upload a few trip photos first.")
      jump("studio")
      return
    }

    const notes = [trip.place && `We went to ${trip.place}`, trip.when && `It was ${trip.when}`, trip.who && `With ${trip.who}`, trip.notes]
      .filter(Boolean)
      .join(". ")

    setError("")
    setView("generating")
    setStepIndex(0)

    stepTimer.current = window.setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, GENERATE_STEPS.length - 1))
    }, 700)

    generateTimer.current = window.setTimeout(() => {
      if (stepTimer.current) window.clearInterval(stepTimer.current)
      setStory(createWanderlyStory({ notes, photos, style, referenceIndex }))
      setView("story")
    }, 2200)
  }

  function startOver() {
    setView("home")
    setStory(null)
    setStepIndex(0)
  }

  return (
    <main className="canva-page relative min-h-screen overflow-x-hidden text-[#1f1b18]">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <Splash key="intro" onDone={finishSplash} />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar onCreate={goCreate} onHome={() => { startOver(); window.scrollTo(0, 0) }} onJump={jump} />

            {view === "generating" && <GeneratingOverlay step={GENERATE_STEPS[stepIndex]} />}

            {view === "story" && story ? (
              <StoryView story={story} photos={photos} onBack={startOver} />
            ) : (
              <>
                <Hero onCreate={goCreate} />
                <HowItWorks sectionRef={howRef} />
                <Styles
                  sectionRef={moodRef}
                  style={style}
                  setStyle={setStyle}
                  referenceIndex={referenceIndex}
                  setReferenceIndex={setReferenceIndex}
                  onPreview={() => jump("preview")}
                />
                <Studio sectionRef={studioRef} photos={photos} onChange={handlePhotoChange} onRemove={removePhoto} />
                <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
                  <StoryForm sectionRef={storyRef} trip={trip} setTrip={setTrip} error={error} />
                  <PreviewStrip
                    sectionRef={previewRef}
                    photos={photos}
                    trip={trip}
                    style={style}
                    onCreate={createStory}
                    onCustomize={() => jump("story")}
                  />
                </div>
                <Footer onHome={startOver} onPickStyle={pickStyle} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function GeneratingOverlay({ step }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1b18]/50 backdrop-blur-sm">
      <div className="w-[min(92vw,420px)] rounded-[1.6rem] bg-[#f7f1e6] p-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#c45c6a]">Wanderly studio</p>
        <h2 className="font-display mt-4 text-4xl">{step}</h2>
      </div>
    </div>
  )
}

export default Home
