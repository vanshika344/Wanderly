import { Link, useNavigate } from "react-router-dom"
import { AuthCard } from "./Login"
import { supabase } from "../supabaseClient"

function Signup() {
  const navigate = useNavigate()

  async function handleSignup(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    navigate("/dashboard")
  }

  return (
    <AuthCard
      title="Start your story"
      subtitle="sign up"
      submitLabel="Sign up"
      onSubmit={handleSignup}
      footer={<>Already have an account? <Link to="/login" className="text-[#c45c6a]">Log in</Link></>}
    />
  )
}

export default Signup
