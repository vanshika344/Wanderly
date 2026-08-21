import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReferenceLogo } from "../components/Logo"
import { useAuth } from "../AuthContext"
import { supabase } from "../supabaseClient"
import { getMyCollections } from "../lib/api"

function AppNav() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Link to="/" className="flex items-center gap-2">
        <ReferenceLogo className="site-logo h-16 w-auto" />
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/dashboard">My stories</Link>
        <Link to="/create" className="rounded-full bg-[#c45c6a] px-5 py-2.5 text-white">New Story</Link>
        <button type="button" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  )
}

function Dashboard() {
  const { user } = useAuth()
  const [collections, setCollections] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyCollections()
      .then((data) => setCollections(Array.isArray(data) ? data : data?.collections ?? []))
      .catch((err) => setError(err.message || "Could not load stories"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="canva-page min-h-screen">
      <AppNav />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c45c6a]">your library</p>
        <h1 className="font-display mt-2 text-5xl">Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}.</h1>
        <p className="mt-3 text-[#5c534c]">Saved trips live here. Start a new one anytime.</p>

        {loading && <p className="mt-10 text-sm text-[#5c534c]">Loading...</p>}
        {error && <p className="mt-6 text-sm text-[#c45c6a]">{error}</p>}

        {!loading && !collections.length && (
          <div className="mt-12 rounded-[1.6rem] border border-dashed border-[#eadfd4] bg-white/50 p-12 text-center">
            <h2 className="font-display text-3xl">No stories yet</h2>
            <p className="mt-2 text-sm text-[#5c534c]">Upload 4–50 photos and let Wanderly write the spread.</p>
            <Link to="/create" className="mt-6 inline-block rounded-full bg-[#c45c6a] px-6 py-3 text-sm text-white">
              New Story
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item) => (
            <Link
              key={item.id}
              to={`/collection/${item.id}`}
              className="overflow-hidden rounded-[1.4rem] bg-white/70 shadow-[0_10px_24px_rgba(80,60,50,0.08)]"
            >
              <img
                src={item.photo_urls?.[0] || item.cover_url}
                alt=""
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#c45c6a]">{item.format || "story"}</p>
                <h2 className="font-display mt-1 text-2xl">{item.title || item.place || "Untitled trip"}</h2>
                <p className="mt-1 text-sm text-[#5c534c]">{[item.place, item.trip_date].filter(Boolean).join(" · ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
export { AppNav }
