import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyCollections } from "../lib/api";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCollections() {
      try {
        const data = await getMyCollections();
        setCollections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] p-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-serif text-[#5D4A66]">
          Wanderly
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-full bg-[#B68EA9] text-white"
        >
          Logout
        </button>
      </header>

      <div className="mt-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif">Your Stories</h2>
          <p className="text-gray-600 mt-2">
            Your travel memories, beautifully collected.
          </p>
        </div>

        <Link
          to="/create"
          className="bg-[#B68EA9] text-white px-6 py-3 rounded-full"
        >
          + New Story
        </Link>
      </div>

      {loading ? (
        <p className="mt-10">Loading your stories...</p>
      ) : collections.length === 0 ? (
        <div className="mt-10 bg-white rounded-3xl p-12 text-center shadow">
          <h3 className="text-2xl font-serif">No stories yet</h3>
          <p className="mt-2 text-gray-600">
            Start your first travel story.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
              className="bg-white rounded-3xl p-6 shadow"
            >
              <h3 className="text-xl font-semibold">
                {collection.title || collection.place || "Untitled Story"}
              </h3>

              <p className="mt-2 text-gray-500">
                {collection.place}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}