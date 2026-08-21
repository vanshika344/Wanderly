import { useState } from "react";

export default function StylePicker({ onNext }) {
  const [format, setFormat] = useState("magazine");
  const [colorTheme, setColorTheme] = useState("warm");

  function submit(e) {
    e.preventDefault();
    onNext({ format, colorTheme });
  }

  return (
    <form onSubmit={submit} className="p-8">
      <h1 className="text-3xl font-serif">Choose Your Style</h1>

      <select
        className="block mt-6 p-3 border rounded-xl"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <option value="magazine">Magazine</option>
        <option value="scrapbook">Scrapbook</option>
        <option value="comic">Comic</option>
        <option value="polaroid">Polaroid</option>
      </select>

      <select
        className="block mt-4 p-3 border rounded-xl"
        value={colorTheme}
        onChange={(e) => setColorTheme(e.target.value)}
      >
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="pastel">Pastel</option>
      </select>

      <button className="mt-6 bg-[#B68EA9] text-white px-6 py-3 rounded-full">
        Generate Story
      </button>
    </form>
  );
}