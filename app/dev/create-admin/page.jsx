"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateAdminPage() {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");

  const makeAdmin = async () => {
    if (!email || !secret) {
      toast.error("Email and secret required");
      return;
    }

    const res = await fetch("/api/dev/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, secret }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error);
      return;
    }

    toast.success("User promoted to admin");
  };

  return (
    <main className="min-h-screen bg-[#020b18] text-white flex items-center justify-center">
      <div className="bg-[#0b2545] p-6 rounded-xl w-full max-w-sm">
        <h1 className="text-lg font-bold mb-4">Create Admin (TEMP)</h1>

        <input
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-dark-input mb-3"
        />

        <input
          placeholder="Admin Secret"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          className="auth-dark-input mb-4"
        />

        <button
          onClick={makeAdmin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
        >
          Make Admin
        </button>
      </div>
    </main>
  );
}
