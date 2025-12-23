"use client";

import { useState } from "react";

export default function WalletClient({ balance }) {
  const [amount, setAmount] = useState(10);
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitRequest = async () => {
    setMsg("");

    if (!amount || amount < 10) {
      setMsg("Minimum recharge is ₹10");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setMsg("Enter valid 10 digit mobile number");
      return;
    }
    if (!/^\d+$/.test(utr)) {
      setMsg("UTR must contain only numbers");
      return;
    }
    if (!screenshot) {
      setMsg("Payment screenshot is required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("amount", amount);
    form.append("mobile", mobile);
    form.append("utr", utr);
    form.append("screenshot", screenshot);

    const res = await fetch("/api/wallet/request", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(data.error || "Request failed");
      return;
    }

    setMsg("Recharge request submitted. Waiting for admin approval.");
    setAmount(10);
    setMobile("");
    setUtr("");
    setScreenshot(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* BALANCE CARD */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <p className="text-sm text-gray-400">Wallet Balance</p>
        <h2 className="text-3xl font-bold text-white">
          ₹{Number.isFinite(Number(balance)) ? Number(balance).toFixed(2) : "0.00"}

        </h2>
      </div>

      {/* ADD FUNDS */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-5">
        <h3 className="text-lg font-semibold text-white">
          Add Funds (Manual UPI)
        </h3>

        {/* QR */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yashsingh2314@ptaxis&pn=FameSaathi&am=${amount}`}
            alt="UPI QR"
            className="rounded-lg border border-slate-700"
          />
          <p className="text-xs text-gray-400">
            Scan & pay using any UPI app
          </p>
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            value={amount}
            min={10}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-slate-800 rounded px-3 py-2 text-white outline-none"
            placeholder="Amount (₹)"
          />

          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className="bg-slate-800 rounded px-3 py-2 text-white outline-none"
            placeholder="Mobile Number"
            maxLength={10}
          />

          <input
            type="text"
            value={utr}
            onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
            className="bg-slate-800 rounded px-3 py-2 text-white outline-none md:col-span-2"
            placeholder="UTR Number"
          />
        </div>

        {/* UPLOAD */}
        <label className="block">
          <div className="border border-dashed border-slate-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
            <p className="text-sm text-gray-300">
              {screenshot ? screenshot.name : "Upload payment screenshot"}
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setScreenshot(e.target.files[0])}
          />
        </label>

        {msg && (
          <p className="text-sm text-center text-red-400">{msg}</p>
        )}

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Recharge Request"}
        </button>
      </div>
    </div>
  );
}
