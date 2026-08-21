import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-serif text-[#5D4A66] mb-4">
          Wanderly
        </h1>

        <p className="text-gray-700 mb-8">
          Turn your travel photos into a beautiful AI-powered digital diary.
        </p>

        <Link
          to="/login"
          className="inline-block rounded-full bg-[#B68EA9] px-8 py-3 text-white font-medium hover:opacity-90"
        >
          Start Your Journey
        </Link>
      </div>
    </div>
  );
}