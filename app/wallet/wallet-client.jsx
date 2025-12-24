"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Upload } from "lucide-react";

const UPI_ID = "yashsingh2314@ptaxis";

export default function WalletClient({ balance, transactions }) {
  // ✅ SAFETY FIXES
  const safeBalance = Number(balance ?? 0);
  const txs = Array.isArray(transactions) ? transactions : [];

  const [amount, setAmount] = useState(10);
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=FameSaathi&am=${amount}&cu=INR`;

  async function submit() {
    if (!file) return alert("Payment screenshot required");
    if (!mobile || !utr) return alert("Mobile & UTR required");

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
    if (!res.ok) return alert(data.error || "Failed");

    alert("Recharge request submitted");
    setMobile("");
    setUtr("");
    setFile(null);
  }

  return (
    <div className="space-y-8">

      {/* WALLET BALANCE CARD */}
      <div className="bg-linear-to-r from-[#0b2545] to-[#133b73] rounded-2xl px-6 py-3">
        <p className="text-gray-300 mb-1">Wallet Balance</p>
        <h1 className="text-2xl font-bold text-white">
          ₹{safeBalance.toFixed(2)}
        </h1>
      </div>

      {/* ADD FUNDS CARD */}
      <div className="bg-[#0b1f3a] rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold text-white">
          Add Funds (Manual UPI)
        </h2>

        {/* QR */}
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-xl">
            <QRCode value={upiLink} size={170} />
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Scan & pay using any UPI app
        </p>

        {/* PAY BUTTON */}
        <a
          href={upiLink}
          className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
        >
          Pay using UPI App
        </a>

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="number"
              min={10}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 input"
              placeholder="Amount"
            />
          </div>

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            className="input"
            placeholder="Mobile Number"
          />
        </div>

        <input
          value={utr}
          onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
          className="input"
          placeholder="UTR Number"
        />

        {/* SCREENSHOT */}
        <label className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-blue-500">
          <Upload size={18} />
          <span className="text-sm text-gray-300">
            {file ? file.name : "Upload payment screenshot"}
          </span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Recharge Request"}
        </button>
      </div>

      {/* WALLET HISTORY */}
      <div className="bg-[#0b1f3a] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Wallet Transaction History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-600">
              <tr>
                <th className="text-left py-2">Type</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-center">Date</th>
              </tr>
            </thead>

            <tbody>
              {txs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No wallet transactions found
                  </td>
                </tr>
              )}

              {txs.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-gray-700 hover:bg-[#122b4f]"
                >
                  <td className="py-2 capitalize">{t.type}</td>
                  <td className="text-center">₹{Number(t.amount).toFixed(2)}</td>
                  <td className="text-center capitalize">{t.status}</td>
                  <td className="text-center">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
