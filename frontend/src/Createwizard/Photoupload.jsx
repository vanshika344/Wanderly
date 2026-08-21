import { useState } from "react";

export default function PhotoUpload({ onNext }) {
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    const selected = Array.from(e.target.files);

    if (selected.length < 4 || selected.length > 50) {
      alert("Please select between 4 and 50 photos.");
      return;
    }

    setFiles(selected);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif">Choose Your Photos</h1>

      <input
        className="mt-6"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />

      <p className="mt-4">
        {files.length} photos selected
      </p>

      <button
        disabled={files.length < 4}
        onClick={() => onNext(files)}
        className="mt-6 bg-[#B68EA9] text-white px-6 py-3 rounded-full disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}