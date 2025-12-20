"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AuthSplitCard({ mode = "login" }) {
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(
      isLogin ? "/api/auth/login" : "/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Something went wrong");
      return;
    }

    toast.success(isLogin ? "Login successful" : "Signup successful");

    window.location.href = isLogin ? "/dashboard" : "/login";
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl overflow-hidden
                    bg-[#0b2545] border border-white/10
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

      <div className="grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-10 text-white">
          <Image src="/logo.png" alt="FameSaathi" width={140} height={40} />

          <h2 className="text-2xl font-bold mt-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {isLogin
              ? "Login to manage your orders"
              : "Start growing your Instagram today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="auth-dark-input"
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="auth-dark-input"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="auth-dark-input"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                         bg-blue-600 hover:bg-blue-700">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            {isLogin ? "No account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="text-blue-400 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center
                        bg-gradient-to-br from-[#1e3a8a] to-[#2563eb]
                        p-10 text-white">
          <h3 className="text-xl font-bold mb-3">
            India’s Trusted Growth Platform
          </h3>
          <p className="text-sm text-blue-100 text-center">
            Manual delivery • Real engagement • Secure payments
          </p>
        </div>

      </div>
    </div>
  );
}
