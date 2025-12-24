"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthCard from "./AuthCard";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="px-6 pt-20 text-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 
                      w-[500px] h-[500px]
                      bg-blue-500/20 blur-[120px]" />

      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        India’s Trusted <br />
        <span className="bg-linear-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
          Instagram Growth Platform
        </span>
      </h1>

      <p className="mt-5 text-gray-300 max-w-xl mx-auto">
        Buy Instagram Likes, Followers & Views instantly starting at ₹5.00.
        100% manual delivery. No bots.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => toast.info("Demo video coming soon")}
          className="px-6 py-3 rounded-full font-semibold
                     bg-linear-to-r from-red-500 to-pink-500
                     shadow-[0_0_25px_rgba(239,68,68,0.45)]
                     hover:scale-105 transition"
        >
          Watch Demo
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-6 py-3 rounded-full font-semibold
                     bg-linear-to-r from-blue-500 to-blue-600
                     shadow-[0_0_25px_rgba(59,130,246,0.45)]
                     hover:scale-105 transition"
        >
          Register
        </button>
      </div>

      {/* Login Card */}
      <div className="mt-10">
        <AuthCard mode="login" />
      </div>
    </section>
  );
}
