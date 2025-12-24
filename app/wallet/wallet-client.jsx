"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Upload, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { toast } from "react-toastify";
import MobileBottomNav from "@/components/MobileBottomNav";

const UPI_ID = "yashsingh2314@ptaxis";

export default function WalletClient({ balance, transactions = [], hasPending }) {
  const [amount, setAmount] = useState(10);
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=FameSaathi&am=${amount}&cu=INR`;

  async function submit() {
    if (hasPending) return toast.warning("Pending recharge already exists");
    if (!file) return toast.error("Payment screenshot required");
    if (!mobile || mobile.length !== 10)
      return toast.error("Valid mobile number required");
    if (!utr) return toast.error("UTR number required");

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
    if (!res.ok) return toast.error(data.error || "Request failed");

    toast.success("Recharge request submitted");
    location.reload(); // re-fetch server data
  }

  return (
    <>
    <div className="space-y-8">

      {/* BALANCE */}
      <div className="bg-linear-to-r from-[#0b2545] to-[#133b73] rounded-2xl px-6 py-4">
        <p className="text-gray-300 mb-1">Wallet Balance</p>
        <h1 className="text-3xl font-bold text-white">
          ₹{Number(balance || 0).toFixed(2)}
        </h1>
      </div>

      {hasPending && (
        <div className="bg-yellow-500/15 text-yellow-400 p-3 rounded-lg text-sm">
          ⏳ You have a pending recharge request
        </div>
      )}

      {/* Show History Btn */}
      <a
          href="/wallet/history"
          className="block md:hidden text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
        >
          Show History
        </a>

      {/* ADD FUNDS */}
      <div className="bg-[#0b1f3a] rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold text-white">
          Add Funds (Manual UPI)
        </h2>

        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-xl">
            <QRCode value={upiLink} size={170} />
          </div>
        </div>

        <a
          href={upiLink}
          className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
        >
          Pay using UPI App
        </a>

        <input
          type="number"
          min={10}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          placeholder="Amount (min ₹10)"
        />

        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          maxLength={10}
          className="input"
          placeholder="Mobile Number"
        />

        <input
          value={utr}
          onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
          className="input"
          placeholder="UTR Number"
        />

        <label className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer">
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
          disabled={loading || hasPending || !file}
          className={`w-full py-3 rounded-lg font-semibold ${
            loading || hasPending || !file
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Recharge Request"}
        </button>
      </div>

      {/* WALLET HISTORY */}
      <div className="bg-[#0b1f3a] md:block hidden rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Wallet Transaction History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-600">
              <tr>
                <th className="text-left py-2">Type</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Source</th>
                <th className="text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No wallet transactions yet
                  </td>
                </tr>
              )}

              {transactions.map((t) => (
                <tr key={t._id} className="border-b border-gray-700">
                  <td className="py-2 flex items-center gap-2 capitalize">
                    {t.type === "credit" ? (
                      <ArrowDownCircle size={16} className="text-green-400" />
                    ) : (
                      <ArrowUpCircle size={16} className="text-red-400" />
                    )}
                    {t.type}
                  </td>
                  <td className="text-center font-medium">
                    ₹{Number(t.amount).toFixed(2)}
                  </td>
                  <td className="text-center text-gray-300">
                    {t.source || "-"}
                  </td>
                  <td className="text-center text-gray-400">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <MobileBottomNav/>
    </>
  );
}
