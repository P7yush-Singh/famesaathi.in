"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminPaymentsClient({ payments }) {
  const router = useRouter();
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");

  const approve = async (id) => {
    await fetch("/api/admin/approve-payment", {
      method: "POST",
      body: JSON.stringify({ transactionId: id }),
    });
    toast.success("Approved");
    router.refresh();
  };

  const reject = async () => {
    await fetch("/api/admin/reject-payment", {
      method: "POST",
      body: JSON.stringify({ transactionId: rejectId, reason }),
    });
    toast.success("Rejected");
    setRejectId(null);
    setReason("");
    router.refresh();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Wallet Requests</h1>

      {payments.map(p => (
        <div key={p._id} className="bg-[#0b2545] p-4 rounded-xl mb-3 flex justify-between">
          <div>
            <p>{p.user?.name}</p>
            <p className="text-sm text-gray-400">UTR: {p.utr}</p>
          </div>
          <div className="text-right">
            <p>₹{p.amount}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => approve(p._id)} className="bg-green-600 px-3 py-1 rounded">
                Approve
              </button>
              <button onClick={() => setRejectId(p._id)} className="bg-red-600 px-3 py-1 rounded">
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}

      <ConfirmModal
        open={!!rejectId}
        title="Reject Payment"
        description={
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full p-2 bg-[#020b18] border border-white/10"
            placeholder="Rejection reason"
          />
        }
        confirmText="Reject"
        onConfirm={reject}
        onClose={() => setRejectId(null)}
      />
    </>
  );
}
