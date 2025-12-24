"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Instagram, IndianRupee } from "lucide-react";
import { SERVICES } from "@/lib/newServices";

export default function OrderForm({ walletBalance }) {
  const router = useRouter();

  const categoryKeys = Object.keys(SERVICES);
  const [categoryKey, setCategoryKey] = useState(categoryKeys[0]);
  const [serviceIndex, setServiceIndex] = useState("");
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const services = SERVICES[categoryKey]?.services ?? [];
  const selectedService =
    serviceIndex !== "" ? services[serviceIndex] : null;

  const totalAmount = useMemo(() => {
    if (!selectedService || !quantity) return 0;
    return Math.round(
      (quantity / 1000) * selectedService.pricePer1000
    );
  }, [selectedService, quantity]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedService) return setError("Select a service");
    if (!link) return setError("Instagram link required");
    if (totalAmount < 5) return setError("Minimum order ₹5");
    if (totalAmount > 20000) return setError("Maximum order ₹20,000");

    if (walletBalance < totalAmount) {
      return setError("Insufficient wallet balance");
    }

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: SERVICES[categoryKey].category,
        serviceName: selectedService.name,
        link,
        quantity: Number(quantity),
        pricePer1000: selectedService.pricePer1000,
        totalAmount, // ✅ IMPORTANT
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Order failed");
      return;
    }

    router.push("/orders");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b2545] border border-white/10 rounded-xl p-5 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Instagram className="text-pink-500" />
        <h1 className="text-lg font-semibold">New Instagram Order</h1>
      </div>

      <select
        className="input"
        value={categoryKey}
        onChange={(e) => {
          setCategoryKey(e.target.value);
          setServiceIndex("");
        }}
      >
        {categoryKeys.map((key) => (
          <option key={key} value={key}>
            {SERVICES[key].category}
          </option>
        ))}
      </select>

      <select
        className="input"
        value={serviceIndex}
        onChange={(e) => setServiceIndex(e.target.value)}
      >
        <option value="">Select Service</option>
        {services.map((s, i) => (
          <option key={s.id} value={i}>
            {s.name} — ₹{s.pricePer1000}/1000
          </option>
        ))}
      </select>

      <input
        className="input"
        placeholder="Instagram link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="number"
        min="100"
        className="input"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <div className="flex justify-between pt-2 border-t border-white/10">
        <span>Total</span>
        <span className="flex items-center gap-1 font-semibold">
          <IndianRupee size={14} /> {totalAmount.toFixed(2)}
        </span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button className="w-full bg-blue-600 py-3 rounded-lg">
        Place Order
      </button>
    </form>
  );
}
