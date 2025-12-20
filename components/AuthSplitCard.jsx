"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AuthSplitCard({ mode = "login" }) {
  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info(`${isLogin ? "Login" : "Signup"} logic coming soon`);
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl overflow-hidden
                    bg-[#0b2545] border border-white/10
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

      <div className="grid md:grid-cols-2">

        {/* LEFT: FORM */}
        <div className="p-10 text-white">
          {/* Logo inside card */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="FameSaathi"
              width={140}
              height={40}
            />
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {isLogin
              ? "Login to manage your orders"
              : "Start growing your Instagram today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="auth-dark-input"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              className="auth-dark-input"
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-dark-input"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="auth-dark-input"
              />
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                         bg-blue-600 hover:bg-blue-700 transition">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="text-blue-400 hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT: INFO + SOCIAL */}
        <div className="hidden md:flex flex-col justify-center items-center
                        bg-linear-to-br from-[#1e3a8a] to-[#2563eb]
                        p-10 text-white">

          <h3 className="text-xl font-bold mb-3">
            India’s Trusted Growth Platform
          </h3>
          <p className="text-sm text-blue-100 text-center mb-8">
            Manual delivery • Real engagement • Secure payments
          </p>

          <div className="w-full space-y-3">
            <button
              type="button"
              onClick={() => toast.info("Google login coming soon")}
              className="w-full py-3 rounded-xl border border-white/30
                         hover:bg-white/10 transition">
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => toast.info("Facebook login coming soon")}
              className="w-full py-3 rounded-xl border border-white/30
                         hover:bg-white/10 transition">
              Continue with Facebook
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
