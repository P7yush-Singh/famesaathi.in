"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthCard({ mode = "login" }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email & password required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          remember,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful");
      router.push("/dashboard");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto rounded-2xl
                 bg-linear-to-b from-white/10 to-white/5
                 backdrop-blur border border-white/10
                 shadow-xl p-6"
    >
      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-xl
                   bg-white/90 text-black
                   focus:outline-none"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 px-4 py-3 rounded-xl
                   bg-white/90 text-black
                   focus:outline-none"
      />

      {/* Options */}
      <div className="flex justify-between items-center text-sm mb-4">
        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>

        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-blue-400 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold
                   bg-blue-600 hover:bg-blue-700
                   disabled:opacity-60 transition"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {/* Divider */}
      <div className="my-4 text-center text-gray-400">OR</div>

      {/* Google Placeholder */}
      <button
        type="button"
        onClick={() => toast.info("Google login coming soon")}
        className="w-full py-3 rounded-xl font-semibold
                   bg-white text-black hover:bg-gray-100 transition"
      >
        Sign in with Google
      </button>

      {/* Footer */}
      <p className="mt-4 text-center text-gray-400 text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-blue-400 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
