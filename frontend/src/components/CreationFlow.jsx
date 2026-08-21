import { ReferenceLogo } from "./Logo"
import { Washi } from "./Decor"

const STYLES = [
  { id: "magazine", title: "Magazine" },
  { id: "scrapbook", title: "Scrapbook" },
  { id: "comic", title: "Comic" },
  { id: "polaroid", title: "Polaroid" },
]

function CreationFlow({
  step,
  setStep,
  photos,
  onChange,
  onRemove,
  trip,
  setTrip,
  style,
  setStyle,
  error,
  onClose,
  onCreate,
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#3B0764]/45 p-4 backdrop-blur-sm">
      <div className={`relative w-full ${step === 1 ? "max-w-5xl" : "max-w-2xl"} overflow-hidden rounded-[1.8rem] bg-[#f7f2eb] p-6 shadow-[0_24px_60px_rgba(87,45,39,0.22)] sm:p-10 transition-all duration-300 mx-4`}>
        <Washi className="-top-1 left-10" rotate={-8} />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#572d27] hover:bg-black/5"
          aria-label="Close"
        >
          ×
        </button>
        
        {step !== 1 && (
          <>
            <ReferenceLogo className="site-logo mx-auto h-24 w-auto" />
            <p className="mt-2 text-center text-[11px] uppercase tracking-[0.28em] text-[#9b6a52]">
              {step === 2 ? "the story" : "the look"}
            </p>
          </>
        )}

        {step === 1 && (
          <div className="flex flex-col text-left">
            <p className="text-xs font-semibold tracking-wider text-[#9f4955] mb-4">STEP 1 OF 4</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0f172a] mb-10 leading-tight">Start with your<br/>photo dump.</h2>
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Upload Dropzone */}
              <div className="w-full lg:w-[320px] shrink-0 flex flex-col items-center justify-center p-10 rounded-3xl border border-dashed border-[#e0b9b9] bg-[#faebeb] relative">
                <svg className="w-12 h-12 text-[#9f4955] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-[#0f172a] font-medium mb-1">Drop your memories here</p>
                <p className="text-sm text-gray-500 mb-8">or click to browse</p>
                
                <label className="cursor-pointer bg-[#9f4955] hover:bg-[#853945] text-white rounded-full px-8 py-3 text-sm font-semibold transition-colors">
                  Add Photos
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={onChange} />
                </label>
                
                <p className="text-xs text-gray-500 mt-8">JPG, PNG • up to 50 photos</p>
              </div>

              {/* Photos Grid */}
              <div className="w-full flex-1 min-h-[300px]">
                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-h-[450px] overflow-auto pb-4 pr-2 custom-scrollbar">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative rounded-2xl overflow-hidden bg-white shadow-sm p-1">
                        <img src={photo.url} alt="" className="h-48 w-full rounded-xl object-cover" />
                        <button 
                          type="button" 
                          onClick={() => onRemove(photo.id)} 
                          className="absolute top-3 right-3 bg-white text-gray-700 w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md hover:bg-gray-100 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full min-h-[300px] w-full flex items-center justify-center rounded-3xl border border-dashed border-gray-200/50 bg-white/20">
                     <p className="text-gray-400">Your photos will appear here</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={photos.length === 0}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f4955] hover:text-[#853945] disabled:opacity-50 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 grid gap-3">
            {[
              ["place", "Where?", "Jaipur, Goa…"],
              ["when", "When?", "March 2026"],
              ["who", "Who?", "friends / solo"],
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block text-left">
                <span className="font-hand text-lg text-[#9b6a52]">{label}</span>
                <input
                  value={trip[key]}
                  onChange={(event) => setTrip((prev) => ({ ...prev, [key]: event.target.value }))}
                  placeholder={placeholder}
                  className="mt-1 w-full rounded-2xl border border-[#572d27]/20 bg-white/70 px-4 py-3 outline-none focus:border-[#6B21A8]"
                />
              </label>
            ))}
            <label className="block text-left">
              <span className="font-hand text-lg text-[#9b6a52]">What made it special?</span>
              <textarea
                value={trip.notes}
                maxLength={400}
                onChange={(event) => setTrip((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="The late-night chai, the wrong train, the rooftop."
                className="mt-1 min-h-24 w-full resize-none rounded-2xl border border-[#572d27]/20 bg-white/70 p-4 outline-none focus:border-[#6B21A8]"
              />
            </label>
            <div className="mt-2 flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="text-sm text-[#9b6a52]">
                ← Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="text-sm uppercase tracking-[0.2em] text-[#6B21A8]">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyle(item.id)}
                  className={`rounded-2xl border px-4 py-3 font-display text-xl ${
                    style === item.id ? "border-[#6B21A8] bg-[#E9D5FF]/50" : "border-[#572d27]/15 bg-white/50"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {error && <p className="mt-3 text-sm text-[#572d27]">{error}</p>}
            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="text-sm text-[#9b6a52]">
                ← Back
              </button>
              <button type="button" onClick={onCreate} className="btn-brand rounded-full px-6 py-3 text-sm font-semibold">
                Create My Wanderly
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreationFlow
