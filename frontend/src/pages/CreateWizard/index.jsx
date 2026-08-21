import { useState } from "react"
import { AppNav } from "../Dashboard"
import { ReferenceLogo } from "../../components/Logo"
import { Washi } from "../../components/Decor"
import PhotoUpload from "./PhotoUpload"
import TripDetails from "./TripDetails"
import StylePicker from "./StylePicker"
import Generate from "./Generate"

function CreateWizard() {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState([])
  const [format, setFormat] = useState("magazine")
  const [referenceIndex, setReferenceIndex] = useState(0)
  const [colorTheme, setColorTheme] = useState("warm")
  const [trip, setTrip] = useState({
    place: "",
    tripDate: "",
    companions: "",
    storyNotes: "",
  })

  return (
    <main className="canva-page min-h-screen">
      <AppNav />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className={`relative overflow-hidden rounded-[1.8rem] bg-[#f7f2eb] p-6 shadow-[0_24px_60px_rgba(87,45,39,0.12)] sm:p-10 ${step === 1 ? "" : "max-w-2xl mx-auto"}`}>
          <Washi className="-top-1 left-10" rotate={-8} />
          {step !== 1 && (
            <>
              <ReferenceLogo className="site-logo mx-auto h-24 w-auto" />
              <p className="mt-2 text-center text-[11px] uppercase tracking-[0.28em] text-[#9b6a52]">
                {step === 2 ? "the story" : step === 3 ? "the look" : "generate"}
              </p>
            </>
          )}
          {step === 1 && <PhotoUpload photos={photos} setPhotos={setPhotos} onNext={() => setStep(2)} />}
          {step === 2 && <TripDetails trip={trip} setTrip={setTrip} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && (
            <StylePicker
              format={format}
              setFormat={setFormat}
              referenceIndex={referenceIndex}
              setReferenceIndex={setReferenceIndex}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <Generate
              photos={photos}
              trip={trip}
              format={format}
              referenceIndex={referenceIndex}
              colorTheme={colorTheme}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CreateWizard
