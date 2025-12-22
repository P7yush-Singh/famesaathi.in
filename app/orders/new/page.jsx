"use client";

import { useState, useMemo } from "react";
import { Instagram, IndianRupee, Info } from "lucide-react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const CATEGORIES = [
  "Trending Services",
  "Insta Reel Views",
  "Likes",
  "Story Views",
  "Followers",
  "Post Views",
  "Comments",
  "Share",
  "Repost",
  "Saves",
];

// Base prices per 1000
const SERVICES = {
  "Insta Reel Views": [
    { name: "Used by Influencers", price: 15, multiplier: 1 },
    { name: "Used by Celebrities", price: 15, multiplier: 1.4 },
    { name: "From Explore Page", price: 15, multiplier: 1.25 },
    { name: "Indian Views", price: 15, multiplier: 1.1 },
    { name: "Increase Insights", price: 15, multiplier: 1.6 },
  ],
  Likes: [
    { name: "Real Likes", price: 12, multiplier: 1 },
    { name: "High Quality Likes", price: 12, multiplier: 1.4 },
  ],
  Followers: [
    { name: "Real Followers", price: 45, multiplier: 1 },
    { name: "Indian Followers", price: 45, multiplier: 1.2 },
  ],
};

export default function NewOrderPage() {
  const [category, setCategory] = useState("Insta Reel Views");
  const [service, setService] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const total = useMemo(() => {
    if (!service || !quantity) return 0;
    const base = (quantity / 1000) * service.price * service.multiplier;
    return Math.round(base * 100) / 100;
  }, [service, quantity]);

  function validate() {
    if (!link) return "Link is required";
    if (total < 5) return "Minimum order amount is ₹5";
    if (total > 20000) return "Maximum order amount is ₹20,000";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    alert("Order ready to submit (API connect next)");
  }

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="px-4 py-6 max-w-xl mx-auto">
        <div className="bg-[#0b2545] border border-white/10 rounded-xl p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Instagram className="text-pink-500" />
            <h1 className="text-lg font-semibold">New Instagram Order</h1>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <select
              className="input"
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                setService(null);
              }}
            >
              {CATEGORIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Service */}
          {SERVICES[category] && (
            <div>
              <label className="text-sm text-gray-300">Service</label>
              <select
                className="input"
                onChange={e =>
                  setService(SERVICES[category][e.target.value])
                }
              >
                <option value="">Select Service</option>
                {SERVICES[category].map((s, i) => (
                  <option key={i} value={i}>
                    {s.name} — ₹{Math.round(s.price * s.multiplier)}/1000
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Link */}
          <div>
            <label className="text-sm text-gray-300">Instagram Link</label>
            <input
              className="input"
              placeholder="Account must be public"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm text-gray-300">Quantity</label>
            <input
              type="number"
              className="input"
              placeholder="Minimum 100"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>

          {/* Info */}
          <div className="flex gap-2 text-xs text-gray-400">
            <Info size={14} />
            <span>Minimum ₹5 | Maximum ₹20,000</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="font-medium">TOTAL</span>
            <span className="flex items-center gap-1 text-lg font-semibold">
              <IndianRupee size={16} /> {total.toFixed(2)}
            </span>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium"
          >
            ORDER
          </button>
        </div>
      </main>
    </div>
  );
}
