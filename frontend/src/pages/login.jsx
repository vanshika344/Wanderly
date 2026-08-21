import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-4xl font-serif text-[#5D4A66]">
          Welcome Back
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

        {error && (
          <p className="mt-3 text-red-600 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full mt-6 bg-[#B68EA9] text-white py-3 rounded-xl"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full mt-4 text-[#7B5E73]"
        >
          Create an account
        </button>
      </form>
    </div>
  );
}