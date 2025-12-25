"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

export default function WalletRequests() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const lastCountRef = useRef(0);

  /* ---------------- FETCH ---------------- */
  async function load(showToast = false) {
    const res = await fetch("/api/admin/wallet/requests", {
      cache: "no-store",
    });
    const data = await res.json();

    if (showToast && data.length > lastCountRef.current) {
      toast.info("New wallet request received");
    }

    lastCountRef.current = data.length;
    setRequests(data);
    setFiltered(data);
    setLoading(false);
  }

  /* ---------------- ACTION ---------------- */
  async function action(id, type) {
    const res = await fetch(`/api/admin/wallet/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id }),
    });

    if (!res.ok) {
      toast.error("Action failed");
      return;
    }

    toast.success(
      type === "approve"
        ? "Wallet credited successfully"
        : "Wallet request rejected"
    );

    load();
  }

  /* ---------------- SEARCH ---------------- */
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(requests);
      return;
    }

    const q = search.toLowerCase();
    const result = requests.filter((r) =>
      r.utr?.toLowerCase().includes(q) ||
      r.userId?.name?.toLowerCase().includes(q) ||
      r.userId?.email?.toLowerCase().includes(q)
    );

    setFiltered(result);
  }, [search, requests]);

  /* ---------------- AUTO REFRESH ---------------- */
  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load(true);
    }, 120000); // every 2 min

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">
          Wallet Recharge Requests
        </h1>

        <input
          type="text"
          placeholder="Search by UTR / Name / Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#020b18] border border-white/10 rounded-lg px-4 py-2 text-sm w-full sm:w-72 outline-none"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-gray-400">Loading wallet requests...</div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="bg-[#0b2545] rounded-xl p-6 text-center text-gray-400">
          No wallet requests found
        </div>
      )}

      {/* TABLE */}
      {!loading && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full bg-[#0b2545]">
            <thead className="bg-[#0a1f3a] text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">UTR</th>
                <th className="px-4 py-3 text-left">Screenshot</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {r.userId?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {r.userId?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-400">
                    ₹{r.amount}
                  </td>

                  <td className="px-4 py-3 text-sm">{r.utr}</td>

                  <td className="px-4 py-3">
                    {r.screenshot ? (
                      <a
                        href={r.screenshot}
                        target="_blank"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => action(r._id, "approve")}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => action(r._id, "reject")}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
