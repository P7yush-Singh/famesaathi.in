"use client";

import { toast } from "react-toastify";

export default function AdminOrderRow({ order }) {
  const complete = () => {
    toast.success("Order marked as completed");
  };

  const cancel = () => {
    toast.error("Order cancelled");
  };

  return (
    <tr className="border-b border-white/5">
      <td className="p-3">{order.id}</td>
      <td className="p-3">{order.user}</td>
      <td className="p-3">{order.service}</td>
      <td className="p-3">{order.quantity}</td>
      <td className="p-3 capitalize">{order.status}</td>
      <td className="p-3 space-x-2">
        <button
          onClick={complete}
          className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          Complete
        </button>
        <button
          onClick={cancel}
          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
