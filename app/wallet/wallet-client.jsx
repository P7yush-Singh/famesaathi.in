"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";

export default function WalletClient() {
  const [amount, setAmount] = useState(10);
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);

  const qrRef = useRef(null);

  useEffect(() => {
  async function loadHistory() {
    try {
      const res = await fetch("/api/wallet/history");
      if (!res.ok) throw new Error("Failed to load history");
      const data = await res.json();
      setHistory(data || []);
    } catch (err) {
      console.error("Wallet history error:", err);
      setHistory([]);
    }
  }

  loadHistory();
}, []);



  const upiId = process.env.NEXT_PUBLIC_UPI_ID;
  const upiUrl = `upi://pay?pa=${upiId}&pn=FameSaathi&am=${amount}&cu=INR`;

  async function submitRequest() {
    setMsg("");

    if (amount < 10) return setMsg("Minimum amount is ₹10");
    if (!mobile || !utr) return setMsg("Mobile & UTR are required");

    const res = await fetch("/api/wallet/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, mobile, utr }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Failed");

    setMsg("Payment request submitted. Wait 5 to 15Mints.");
    setUtr("");
  }

  function downloadQR() {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = pngFile;
      a.download = `FameSaathi-UPI-${amount}.png`;
      a.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgStr)));
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-5">
      <h1 className="text-xl font-semibold">Add Funds</h1>

      {/* Amount */}
      <input
        type="number"
        min={10}
        className="input"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount (₹)"
      />

      {/* QR Code */}
      <div className="bg-white p-4 rounded flex justify-center" ref={qrRef}>
        <QRCode value={upiUrl} size={200} />
      </div>

      <p className="text-sm text-center text-gray-400">
        Pay ₹{amount} to <b>{upiId}</b>
      </p>

      <button
        onClick={downloadQR}
        className="w-full bg-blue-600 py-2 cursor-pointer hover:bg-blue-700 rounded"
      >
        Download QR Code
      </button>

      {/* Mobile */}
      <input
        className="input"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      {/* UTR */}
      <input
        className="input"
        placeholder="UTR Number"
        value={utr}
        onChange={(e) => setUtr(e.target.value)}
      />

    <button onClick={() => window.open(upiUrl, "_blank")}
        className="w-full bg-purple-600 py-2 cursor-pointer hover:bg-purple-700 rounded">
        Pay Now
    </button>

      <button
        onClick={submitRequest}
        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 py-2 rounded"
      >
        Submit Payment Request
      </button>

      {msg && <p className="text-sm text-yellow-400">{msg}</p>}

      <div className="mt-6">
  <h2 className="text-lg font-semibold mb-2">Wallet History</h2>

  {history.length === 0 ? (
    <p className="text-sm text-gray-400">No wallet transactions</p>
  ) : (
    <div className="space-y-2">
      {history.map((h) => (
        <div
          key={h._id}
          className="flex justify-between bg-slate-800 p-3 rounded"
        >
          <span className="capitalize">{h.type}</span>
          <span>₹{h.amount}</span>
          <span className="text-xs text-gray-400">
            {new Date(h.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
