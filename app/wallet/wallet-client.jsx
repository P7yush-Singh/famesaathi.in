"use client";

import { useState } from "react";

export default function WalletClient({ balance }) {
  const [amount, setAmount] = useState(10);
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!file) return alert("Upload screenshot");

    const fd = new FormData();
    fd.append("amount", amount);
    fd.append("mobile", mobile);
    fd.append("utr", utr);
    fd.append("screenshot", file);

    setLoading(true);
    const res = await fetch("/api/wallet/request", {
      method: "POST",
      body: fd,
    });
    setLoading(false);

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    alert("Request submitted for verification");
    setFile(null);
    setMobile("");
    setUtr("");
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-[#0b2545] p-4 rounded">
        Current Balance: <b>₹{Number(balance).toFixed(2)}</b>
      </div>

      <input
        type="number"
        min={10}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
        placeholder="Amount"
      />

      <input
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
        maxLength={10}
        className="input"
        placeholder="Mobile number"
      />

      <input
        value={utr}
        onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
        className="input"
        placeholder="UTR number"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 w-full py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Payment"}
      </button>
    </div>
  );
}
