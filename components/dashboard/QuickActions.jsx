import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Link
        href="/orders/new"
        className="text-center py-4 rounded-xl
                   bg-blue-600 hover:bg-blue-700 transition"
      >
        New Order
      </Link>

      <Link
        href="/wallet"
        className="text-center py-4 rounded-xl
                   bg-green-600 hover:bg-green-700 transition"
      >
        Add Funds
      </Link>
    </div>
  );
}
