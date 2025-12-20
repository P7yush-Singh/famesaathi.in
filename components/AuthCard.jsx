"use client";

import Link from "next/link";
import { toast } from "react-toastify";

export default function AuthCard({ mode = "login" }) {
  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Auth logic will be added later");
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-6
                    bg-linear-to-b from-[#0f274a] to-[#0b1f3a]
                    border border-white/10
                    shadow-[0_0_40px_rgba(0,0,0,0.6)]">

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-xl bg-[#142d52]
                     border border-white/10
                     text-sm placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Password"
            className="flex-1 px-4 py-3 rounded-xl bg-[#142d52]
                       border border-white/10
                       text-sm placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isLogin && (
            <button
              type="button"
              className="text-xs px-3 rounded-xl
                         bg-[#142d52] border border-white/10
                         hover:bg-white/10 transition">
              Forgot password?
            </button>
          )}
        </div>

        {/* Remember Me */}
        {isLogin && (
          <label className="flex items-center gap-2 text-xs text-gray-300">
            <input type="checkbox" className="accent-blue-500" />
            Remember me
          </label>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
                     bg-blue-600 hover:bg-blue-700
                     shadow-[0_0_20px_rgba(37,99,235,0.5)]
                     transition">
          {isLogin ? "Sign in" : "Create Account"}
        </button>

        {/* Google */}
        <button
          type="button"
          className="w-full py-3 rounded-xl bg-white text-black
                     font-medium text-sm flex items-center justify-center gap-2
                     hover:bg-gray-100 transition">
          <span className="text-lg">G</span>
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </button>

        {/* Switch */}
        <p className="text-center text-xs text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </div>
  );
}
