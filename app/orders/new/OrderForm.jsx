"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Instagram,
  IndianRupee,
  ChevronDown,
  ClipboardPaste,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/newServices";

const INSTAGRAM_URL_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/.+/i;

/* ================= HELPERS ================= */


function getCategoryKeyByUrlType(type, servicesConfig) {
  if (!type) return null;

  const map = {
    Reel: ["reel"],
    Post: ["post"],
    Story: ["story"],
    Profile: ["follower", "profile"],
  };

  const keywords = map[type] || [];

  return Object.keys(servicesConfig).find((key) =>
    keywords.some((k) =>
      servicesConfig[key].category.toLowerCase().includes(k)
    )
  );
}


function detectInstagramType(url = "") {
  if (!url) return null;
  if (url.includes("/reel/")) return "Reel";
  if (url.includes("/p/")) return "Post";
  if (url.includes("/stories/")) return "Story";
  return "Profile";
}

function findServiceIndexByType(services, type) {
  if (!type) return "";

  const keywordMap = {
    Reel: "reel",
    Post: "post",
    Story: "story",
    Profile: "follower",
  };

  const keyword = keywordMap[type];

  const index = services.findIndex((s) =>
    s.name.toLowerCase().includes(keyword)
  );

  return index !== -1 ? String(index) : "";
}

/* ================= SKELETON ================= */

function OrderFormSkeleton() {
  return (
    <div className="max-w-xl mx-auto bg-[#0b2545] border border-white/10 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="h-5 w-40 bg-white/10 rounded" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-11 bg-white/10 rounded" />
      ))}
      <div className="h-4 w-32 bg-white/10 rounded" />
      <div className="h-11 bg-white/10 rounded" />
    </div>
  );
}

/* ================= MAIN ================= */

export default function OrderForm({ walletBalance = 0 }) {
  const router = useRouter();

  const categoryKeys = Object.keys(SERVICES);

  const [loadingUI, setLoadingUI] = useState(true);
  const [categoryKey, setCategoryKey] = useState(categoryKeys[0]);
  const [serviceIndex, setServiceIndex] = useState("");
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoadingUI(false), 300);
    return () => clearTimeout(t);
  }, []);

  const services = SERVICES[categoryKey]?.services ?? [];
  const selectedService =
    serviceIndex !== "" ? services[serviceIndex] : null;

  const instaType = useMemo(
    () => detectInstagramType(link),
    [link]
  );

  /* 🔥 AUTO-SELECT SERVICE BASED ON URL TYPE */
  useEffect(() => {
  if (!instaType) return;

  const matchedCategoryKey = getCategoryKeyByUrlType(
    instaType,
    SERVICES
  );

  if (!matchedCategoryKey) return;

  // switch category
  setCategoryKey(matchedCategoryKey);

  // auto select first service of that category
  const services = SERVICES[matchedCategoryKey]?.services || [];
  if (services.length > 0) {
    setServiceIndex("0");
  }
}, [instaType]);


  const totalAmount = useMemo(() => {
    if (!selectedService || !quantity) return 0;
    return Math.round(
      (Number(quantity) / 1000) * selectedService.pricePer1000
    );
  }, [selectedService, quantity]);

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setLink(text.trim());
    } catch {
      setError("Clipboard access denied");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedService)
      return setError("Please select a service");

    if (!link)
      return setError("Instagram link is required");

    if (!INSTAGRAM_URL_REGEX.test(link))
      return setError("Enter a valid Instagram URL");

    if (!quantity || Number(quantity) <= 0)
      return setError("Enter valid quantity");

    if (totalAmount < 5)
      return setError("Minimum order amount is ₹5");

    if (totalAmount > 20000)
      return setError("Maximum order amount is ₹20,000");

    if (walletBalance < totalAmount)
      return setError("Insufficient wallet balance");

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: SERVICES[categoryKey].category,
        serviceName: selectedService.name,
        link: link.trim(),
        quantity: Number(quantity),
        pricePer1000: selectedService.pricePer1000,
        totalAmount,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Order failed");

    router.push("/orders");
  }

  if (loadingUI) return <OrderFormSkeleton />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-[#0b2545] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Instagram className="text-pink-500" />
        <h1 className="text-lg font-semibold">
          New Instagram Order
        </h1>
      </div>

      {/* Category */}
      <div className="relative">
        <select
          className="w-full appearance-none bg-[#020b18] border border-white/10 rounded-lg px-4 py-3 text-sm"
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
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Service */}
      <div className="relative">
        <select
          className="w-full appearance-none bg-[#020b18] border border-white/10 rounded-lg px-4 py-3 text-sm"
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
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Instagram URL */}
      <div className="relative">
        <input
          className="w-full bg-[#020b18] border border-white/10 rounded-lg px-4 py-3 pr-12 text-sm"
          placeholder="Instagram link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="button"
          onClick={pasteFromClipboard}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <ClipboardPaste size={18} />
        </button>
      </div>

      {/* URL Preview */}
      {instaType && (
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <LinkIcon size={14} />
          Detected: <span className="font-medium">{instaType}</span>
        </div>
      )}

      {/* Estimated Delivery */}
      {selectedService && (
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <Clock size={14} />
          Estimated delivery:{" "}
          <span className="font-medium">
            {selectedService.deliveryTime ||
              "Usually starts within a few hours"}
          </span>
        </div>
      )}

      {/* Quantity */}
      <input
        type="number"
        min="100"
        inputMode="numeric"
        className="w-full bg-[#020b18] border border-white/10 rounded-lg px-4 py-3 text-sm"
        placeholder="Quantity (e.g. 1000)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* Total */}
      <div className="flex justify-between items-center pt-3 border-t border-white/10 text-sm">
        <span className="text-gray-300">Total Amount</span>
        <span className="flex items-center gap-1 font-semibold">
          <IndianRupee size={14} /> {totalAmount.toFixed(2)}
        </span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium">
        Place Order
      </button>
    </form>
  );
}
