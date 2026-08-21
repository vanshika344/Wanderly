import { useState } from "react";

export default function TripDetails({ onNext }) {
  const [place, setPlace] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [companions, setCompanions] = useState("");
  const [storyNotes, setStoryNotes] = useState("");

  function submit(e) {
    e.preventDefault();

    onNext({
      place,
      tripDate,
      companions,
      storyNotes,
    });
  }

  return (
    <form onSubmit={submit} className="p-8 max-w-xl">
      <h1 className="text-3xl font-serif">Tell Us About The Trip</h1>

      <input
        className="w-full mt-6 p-3 border rounded-xl"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
      />

      <input
        className="w-full mt-4 p-3 border rounded-xl"
        type="date"
        value={tripDate}
        onChange={(e) => setTripDate(e.target.value)}
      />

      <input
        className="w-full mt-4 p-3 border rounded-xl"
        placeholder="Who were you with?"
        value={companions}
        onChange={(e) => setCompanions(e.target.value)}
      />

      <textarea
        className="w-full mt-4 p-3 border rounded-xl"
        rows="5"
        placeholder="Tell us about the memories..."
        value={storyNotes}
        onChange={(e) => setStoryNotes(e.target.value)}
      />

      <button className="mt-6 bg-[#B68EA9] text-white px-6 py-3 rounded-full">
        Continue
      </button>
    </form>
  );
}