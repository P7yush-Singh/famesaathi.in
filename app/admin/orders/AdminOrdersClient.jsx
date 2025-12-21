"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { toast } from "react-toastify";

export default function AdminOrdersClient({ orders }) {
  const router = useRouter();
  const [cancelId, setCancelId] = useState(null);
  const [reason, setReason] = useState("");

  const cancel = async () => {
    await fetch("/api/admin/cancel-order", {
      method: "POST",
      body: JSON.stringify({ orderId: cancelId, reason }),
    });
    toast.success("Cancelled & refunded");
    setCancelId(null);
    setReason("");
    router.refresh();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {orders.map(o => (
        <div key={o._id} className="bg-[#0b2545] p-4 rounded-xl mb-3 flex justify-between">
          <div>
            <p>{o.serviceName}</p>
            <p className="text-sm text-gray-400">{o.user?.name}</p>
          </div>
          <div className="text-right">
            <p>{o.status}</p>
            {o.status === "pending" && (
              <button
                onClick={() => setCancelId(o._id)}
                className="bg-red-600 px-3 py-1 mt-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}

      <ConfirmModal
        open={!!cancelId}
        title="Cancel Order & Refund"
        description={
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full p-2 bg-[#020b18] border border-white/10"
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
