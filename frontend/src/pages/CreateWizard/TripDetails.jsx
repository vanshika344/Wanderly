function TripDetails({ trip, setTrip, onBack, onNext }) {
  function set(key, value) {
    setTrip((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="mt-6 grid gap-3">
      <p className="text-xs font-semibold tracking-wider text-[#9f4955]">STEP 2 OF 4</p>
      {[
        ["place", "Where?", "Cappadocia, Turkey", "text"],
        ["tripDate", "When?", "", "date"],
        ["companions", "Who?", "friends / solo", "text"],
      ].map(([key, label, placeholder, type]) => (
        <label key={key} className="block text-left">
          <span className="font-hand text-lg text-[#9b6a52]">{label}</span>
          <input
            type={type}
            value={trip[key]}
            onChange={(e) => set(key, e.target.value)}
            placeholder={placeholder}
            className="mt-1 w-full rounded-2xl border border-[#572d27]/20 bg-white/70 px-4 py-3 outline-none"
          />
        </label>
      ))}
      <label className="block text-left">
        <span className="font-hand text-lg text-[#9b6a52]">Story notes</span>
        <textarea
          value={trip.storyNotes}
          maxLength={400}
          onChange={(e) => set("storyNotes", e.target.value)}
          placeholder="The late-night chai, the wrong train, the rooftop."
          className="mt-1 min-h-24 w-full resize-none rounded-2xl border border-[#572d27]/20 bg-white/70 p-4 outline-none"
        />
      </label>
      <div className="mt-2 flex justify-between">
        <button type="button" onClick={onBack} className="text-sm text-[#9b6a52]">← Back</button>
        <button type="button" onClick={onNext} className="text-sm uppercase tracking-[0.2em] text-[#6B21A8]">Next →</button>
      </div>
    </div>
  )
}

export default TripDetails
