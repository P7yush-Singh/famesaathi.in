"use client";

import { toast } from "react-toastify";

export default function PaymentRow({ payment }) {
  const approve = () => {
    toast.success("Payment approved");
  };

  const reject = () => {
    toast.error("Payment rejected");
  };

  return (
    <tr className="border-b border-white/5">
      <td className="p-3">{payment.user}</td>
      <td className="p-3">₹{payment.amount}</td>
      <td className="p-3">{payment.utr}</td>
      <td className="p-3 text-gray-400">{payment.date}</td>
      <td className="p-3 space-x-2">
        <button
          onClick={approve}
          className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={reject}
          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700"
        >
          Reject
        </button>
      </td>
    </tr>
  );
}
