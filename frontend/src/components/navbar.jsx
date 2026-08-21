import { Link, useNavigate } from "react-router-dom"
import { ReferenceLogo } from "./Logo"
import { useAuth } from "../AuthContext"
import { supabase } from "../supabaseClient"

function Navbar({ onCreate, onHome, onJump }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <nav className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <button type="button" onClick={onHome} className="flex items-center gap-2" aria-label="Wanderly home">
        <ReferenceLogo className="site-logo h-16 w-auto" />
      </button>

      <div className="hidden items-center gap-8 text-[15px] text-[#3a342f]/80 md:flex">
        <button type="button" onClick={() => onJump("how")}>How it works</button>
        <button type="button" onClick={() => onJump("mood")}>Templates</button>
        <button type="button" onClick={() => onJump("studio")}>Examples</button>
        <button type="button" onClick={() => onJump("story")}>Pricing</button>
        {user && <Link to="/dashboard">My stories</Link>}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <button type="button" onClick={handleLogout} className="text-sm text-[#5c534c]">
            Log out
          </button>
        ) : (
          <Link to="/login" className="text-sm text-[#5c534c]">Log in</Link>
        )}
        <button
          type="button"
          onClick={onCreate}
          className="rounded-full bg-[#c45c6a] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_18px_rgba(196,92,106,0.28)]"
        >
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar
