"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [utr, setUtr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !utr) {
      toast.error("Please enter amount and UTR");
      return;
    }

    toast.success("Payment submitted for verification");
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-linear-to-b
                   from-[#020b18] via-[#06162b] to-[#020b18]
                   text-white px-4 py-10"
      >
        <div className="max-w-xl mx-auto space-y-6">

          <h1 className="text-2xl font-bold">Wallet</h1>

          {/* Balance */}
          <div className="rounded-2xl p-5 bg-[#0b2545] border border-white/10">
            <p className="text-sm text-gray-400">Current Balance</p>
            <p className="text-3xl font-bold mt-1">₹0.00</p>
          </div>

          {/* Add Funds */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 bg-[#0b2545] border border-white/10 space-y-4"
          >
            <h2 className="font-semibold">Add Funds</h2>

            {/* QR Placeholder */}
            <div className="h-40 flex items-center justify-center
                            rounded-xl bg-[#102a4d] text-gray-400">
              QR Code Here
            </div>

            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="auth-dark-input"
            />

            <input
              type="text"
              placeholder="UTR / Transaction ID"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              className="auth-dark-input"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                         bg-green-600 hover:bg-green-700 transition"
            >
              Submit for Verification
            </button>
          </form>

        </div>
      </main>
    </>
  );
}
