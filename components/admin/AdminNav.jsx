"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       pathname === path
         ? "bg-blue-600 text-white"
         : "text-gray-300 hover:bg-white/10"
     }`;

  return (
    <div className="bg-[#0b2545] border border-white/10 rounded-xl p-3 mb-6">
      <div className="flex flex-wrap gap-3">
        <Link href="/admin" className={linkClass("/admin")}>
          Dashboard
        </Link>

        <Link href="/admin/payments" className={linkClass("/admin/payments")}>
          Payments
        </Link>

        <Link href="/admin/orders" className={linkClass("/admin/orders")}>
          Orders
        </Link>

        <Link href="/dashboard" className="ml-auto px-4 py-2 rounded-lg text-sm
                                           text-gray-300 hover:bg-white/10">
          User Panel
        </Link>
      </div>
    </div>
  );
}
