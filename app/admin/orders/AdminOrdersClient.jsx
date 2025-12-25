"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { toast } from "react-toastify";

const statusColor = status => {
  if (status === "completed") return "bg-green-600";
  if (status === "cancelled") return "bg-red-600";
  return "bg-yellow-500";
};

export default function AdminOrdersClient({ orders }) {
  const router = useRouter();
  const [cancelId, setCancelId] = useState(null);
  const [reason, setReason] = useState("");

  const cancel = async () => {
    await fetch("/api/admin/cancel-order", {
      method: "POST",
      body: JSON.stringify({ orderId: cancelId, reason }),
    });
    toast.success("Order cancelled & refunded");
    setCancelId(null);
    setReason("");
    router.refresh();
  };

  const complete = async orderId => {
    await fetch("/api/admin/complete-order", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
    toast.success("Order marked as completed");
    router.refresh();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map(o => (
          <div
            key={o._id}
            className="bg-[#0b2545] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left */}
            <div>
              <p className="font-semibold">{o.serviceName}</p>
              <p className="text-sm text-gray-400">{o.link}</p>
              <p className="text-xs text-gray-500 mt-1">
                User: {o.user?.name} ({o.user?.email})
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <span
                className={`px-3 py-1 rounded-full text-xs text-white ${statusColor(
                  o.status
                )}`}
              >
                {o.status}
              </span>

              {o.status === "pending" && (
                <>
                  <button
                    onClick={() => complete(o._id)}
                    className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-sm"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => setCancelId(o._id)}
                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!cancelId}
        title="Cancel Order & Refund"
        description={
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full p-2 bg-[#020b18] border border-white/10 rounded"
            placeholder="Refund reason"
          />
        }
        confirmText="Cancel & Refund"
        onConfirm={cancel}
        onClose={() => setCancelId(null)}
      />
    </>
  );
}
