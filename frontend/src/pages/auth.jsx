import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let error;

    if (signup) {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      error = res.error;

      if (!error) {
        alert("Account created successfully!");
      }
    } else {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = res.error;

      if (!error) navigate("/dashboard");
    }

    if (error) alert(error.message);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-4xl font-serif text-center text-[#5D4A66]">
          {signup ? "Create Account" : "Welcome Back"}
        </h1>

        {signup && (
          <input
            className="w-full mt-6 border rounded-xl p-3"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full mt-4 border rounded-xl p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mt-4 border rounded-xl p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full mt-6 bg-[#B68EA9] text-white rounded-xl py-3 font-semibold"
        >
          {loading ? "Please wait..." : signup ? "Sign Up" : "Login"}
        </button>

        <p
          className="text-center mt-5 text-sm cursor-pointer text-[#7B5E73]"
          onClick={() => setSignup(!signup)}
        >
          {signup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}