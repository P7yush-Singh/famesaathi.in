"use client";

import { useEffect, useState } from "react";

export default function WalletRequests() {
  const [requests, setRequests] = useState([]);

  async function load() {
    const res = await fetch("/api/admin/wallet/requests");
    const data = await res.json();
    setRequests(data);
  }

  async function action(id, type) {
    await fetch(`/api/admin/wallet/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id }),
    });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Wallet Requests</h1>

      <table className="w-full bg-[#0b2545] rounded">
        <thead>
          <tr className="text-left">
            <th>User</th>
            <th>Amount</th>
            <th>UTR</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.name}</td>
              <td>₹{r.amount}</td>
              <td>{r.utr}</td>
              <td className="space-x-2">
                <button
                  className="bg-green-600 px-3 py-1 rounded"
                  onClick={() => action(r._id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded"
                  onClick={() => action(r._id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
