import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReferenceLogo } from "../components/Logo"
import { supabase } from "../supabaseClient"

const field = "mt-1 w-full rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-sm outline-none"

export function AuthCard({ title, subtitle, submitLabel, onSubmit, footer }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setBusy(true)
    try {
      await onSubmit(email, password)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="canva-page flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[1.6rem] bg-white/70 p-8 shadow-[0_12px_40px_rgba(80,60,40,0.08)]">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <ReferenceLogo className="site-logo h-24 w-auto" />
        </Link>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c45c6a]">{subtitle}</p>
        <h1 className="font-display mt-2 text-4xl">{title}</h1>
        <label className="mt-6 block text-sm">
          Email
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="mt-4 block text-sm">
          Password
          <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="mt-3 text-sm text-[#c45c6a]">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-[#c45c6a] py-3 text-sm text-white disabled:opacity-50"
        >
          {busy ? "Please wait…" : submitLabel}
        </button>
        <p className="mt-4 text-center text-sm text-[#5c534c]">{footer}</p>
      </form>
    </main>
  )
}

export default function Login() {
  const navigate = useNavigate()

  async function handleLogin(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    navigate("/dashboard")
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="log in"
      submitLabel="Log in"
      onSubmit={handleLogin}
      footer={<>Need an account? <Link to="/signup" className="text-[#c45c6a]">Sign up</Link></>}
    />
  )
}
