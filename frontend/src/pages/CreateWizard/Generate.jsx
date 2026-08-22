import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCollection } from "../../lib/api"
import { uploadPhoto } from "../../lib/uploadPhoto"
import { useAuth } from "../../AuthContext"

function Generate({ photos, trip, format, referenceIndex, colorTheme, onBack }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function handleGenerate() {
    if (!user) return
    setBusy(true)
    setError("")
    try {
      const photoUrls = []
      for (const photo of photos) {
        photoUrls.push(await uploadPhoto(photo.file, user.id))
      }
      const created = await createCollection({
        photoUrls,
        format,
        reference_Index:referenceIndex
        storyNotes: trip.storyNotes,
        colorTheme,
        place: trip.place,
        tripDate: trip.tripDate,
        companions: trip.companions,
      })
      const id = created.id || created.collection?.id
      if (!id) throw new Error("Story was created but no id was returned")
      navigate(`/collection/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not generate story")
      setBusy(false)
    }
  }

  return (
    <div className="mt-6 text-center">
      <p className="text-xs font-semibold tracking-wider text-[#9f4955]">STEP 4 OF 4</p>
      <h2 className="font-display mt-4 text-4xl">Ready to write it down?</h2>
      <p className="mt-3 text-sm text-[#5c534c]">
        {photos.length} photos · {format} · reference {referenceIndex + 1} · {colorTheme}
        {trip.place ? ` · ${trip.place}` : ""}
      </p>
      {busy && (
        <div className="mt-8 rounded-[1.4rem] bg-[#faebeb] p-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#c45c6a]">Wanderly studio</p>
          <h3 className="font-display mt-3 text-3xl">Sorting the dump…</h3>
        </div>
      )}
      {error && <p className="mt-4 text-sm text-[#c45c6a]">{error}</p>}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} disabled={busy} className="text-sm text-[#9b6a52]">← Back</button>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={busy}
          className="rounded-full bg-[#c45c6a] px-6 py-3 text-sm text-white disabled:opacity-50"
        >
          {busy ? "Generating…" : "Create My Wanderly"}
        </button>
      </div>
    </div>
  )
}

export default Generate
