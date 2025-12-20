"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/services";
import { toast } from "react-toastify";

export default function AdvancedOrderForm() {
  const insta = SERVICES.instagram;
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");

  const selectedService = insta.services.find(
    (s) => s.id === selectedServiceId
  );

  const total =
    selectedService && quantity
      ? ((quantity / 1000) * selectedService.pricePer1000).toFixed(2)
      : "0.00";

  const placeOrder = async () => {
  if (!selectedService || !link || !quantity) {
    toast.error("Please fill all required fields");
    return;
  }

  const price = (quantity / 1000) * selectedService.pricePer1000;

  const res = await fetch("/api/orders/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      link,
      quantity,
      price,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.error || "Order failed");
    return;
  }

  toast.success("Order placed successfully");
};

  return (
    <div className="rounded-2xl bg-[#0b2545] border border-white/10 p-6 space-y-6">

      {/* Search */}
      <input
        placeholder="Search"
        className="auth-dark-input"
      />

      {/* Category */}
      <div>
        <label className="text-sm text-gray-400">Category</label>
        <div className="mt-2 px-4 py-3 rounded-xl bg-[#102a4d]">
          {insta.category}
        </div>
      </div>

      {/* Service */}
      <div>
        <label className="text-sm text-gray-400">Service</label>
        <select
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-xl
                     bg-[#102a4d] border border-white/10 text-white"
        >
          <option value="">Select Service</option>
          {insta.services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ₹{service.pricePer1000} per 1000
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      {selectedService && (
        <div className="rounded-xl bg-[#102a4d] p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Info label="Start Time" value={selectedService.description.start} />
            <Info label="Speed" value={selectedService.description.speed} />
            <Info label="Refill" value={selectedService.description.refill} />
            <Info label="Cancel" value={selectedService.description.cancel} />
            <Info label="Drop" value={selectedService.description.drop} />
            <Info label="Quality" value={selectedService.description.quality} />
          </div>

          <ul className="text-xs text-gray-300 list-disc ml-4">
            {selectedService.description.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Link */}
      <div>
        <label className="text-sm text-gray-400">Link</label>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Account should be public"
          className="auth-dark-input mt-2"
        />
      </div>

      {/* Quantity */}
      {selectedService && (
        <div>
          <label className="text-sm text-gray-400">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={`Min: ${selectedService.min} - Max: ${selectedService.max}`}
            className="auth-dark-input mt-2"
          />
        </div>
      )}

      {/* Delivery Time */}
      {selectedService && (
        <div className="rounded-xl bg-[#102a4d] px-4 py-3 text-sm">
          Delivery Time: {selectedService.deliveryTime}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">TOTAL</span>
        <span className="text-lg font-bold">₹{total}</span>
      </div>

      <button
        onClick={placeOrder}
        className="w-full py-3 rounded-xl font-semibold
                   bg-blue-600 hover:bg-blue-700"
      >
        ORDER
      </button>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
