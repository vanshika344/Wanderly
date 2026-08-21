import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Account created. Check your email if confirmation is required."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-6">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-4xl font-serif text-[#5D4A66]">
          Create Account
        </h1>

        <input
          className="w-full mt-6 p-3 border rounded-xl"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mt-4 p-3 border rounded-xl"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className="mt-3 text-sm">{message}</p>
        )}

        <button className="w-full mt-6 bg-[#B68EA9] text-white py-3 rounded-xl">
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-[#7B5E73]"
        >
          Already have an account? Log in
        </button>
      </form>
    </div>
  );
}