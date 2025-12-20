"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ServiceSelector from "./ServiceSelector";

export default function OrderForm() {
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");

  const pricePer1000 = 50; // example pricing
  const total =
    quantity && !isNaN(quantity)
      ? ((quantity / 1000) * pricePer1000).toFixed(2)
      : "0.00";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!service || !link || !quantity) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Order placed (manual processing)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 bg-[#0b2545] border border-white/10 space-y-5"
    >
      <ServiceSelector value={service} onChange={setService} />

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Instagram Link</label>
        <input
          type="url"
          placeholder="https://instagram.com/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="auth-dark-input"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Quantity</label>
        <input
          type="number"
          placeholder="Min 100"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="auth-dark-input"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-300">
        <span>Total</span>
        <span className="font-semibold">₹{total}</span>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold
                   bg-blue-600 hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </form>
  );
}
