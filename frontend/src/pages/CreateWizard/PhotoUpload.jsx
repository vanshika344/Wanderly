const MIN = 4
const MAX = 50

function PhotoUpload({ photos, setPhotos, onNext }) {
  function handleChange(event) {
    const files = Array.from(event.target.files || []).slice(0, MAX)
    setPhotos((prev) => {
      prev.forEach((photo) => URL.revokeObjectURL(photo.url))
      return files.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        file,
        url: URL.createObjectURL(file),
      }))
    })
  }

  function removePhoto(id) {
    setPhotos((prev) => {
      const gone = prev.find((photo) => photo.id === id)
      if (gone) URL.revokeObjectURL(gone.url)
      return prev.filter((photo) => photo.id !== id)
    })
  }

  const ready = photos.length >= MIN && photos.length <= MAX

  return (
    <div className="flex flex-col text-left">
      <p className="mb-4 text-xs font-semibold tracking-wider text-[#9f4955]">STEP 1 OF 4</p>
      <h2 className="font-display mb-8 text-4xl leading-tight text-[#0f172a] sm:text-5xl">
        Start with your<br />photo dump.
      </h2>
      <p className="mb-6 text-sm text-[#5c534c]">Add {MIN}–{MAX} photos. You have {photos.length}.</p>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <label className="flex w-full shrink-0 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-[#e0b9b9] bg-[#faebeb] p-10 lg:w-[320px]">
          <p className="mb-1 font-medium text-[#0f172a]">Drop your memories here</p>
          <p className="mb-8 text-sm text-gray-500">or click to browse</p>
          <span className="rounded-full bg-[#9f4955] px-8 py-3 text-sm font-semibold text-white">Add Photos</span>
          <p className="mt-8 text-xs text-gray-500">JPG, PNG • {MIN} to {MAX} photos</p>
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleChange} />
        </label>

        <div className="min-h-[240px] w-full flex-1">
          {photos.length ? (
            <div className="grid max-h-[450px] grid-cols-2 gap-4 overflow-auto pr-2 sm:grid-cols-3">
              {photos.map((photo) => (
                <div key={photo.id} className="relative overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
                  <img src={photo.url} alt="" className="h-40 w-full rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-gray-200/50">
              <p className="text-gray-400">Your photos will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <button type="button" onClick={onNext} disabled={!ready} className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f4955] disabled:opacity-50">
          Next →
        </button>
      </div>
    </div>
  )
}

export default PhotoUpload
