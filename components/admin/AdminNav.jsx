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
    <div className="bg-[#0b2545] border border-white/10 rounded-xl px-4 py-3 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <Link href="/admin" className={linkClass("/admin")}>
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className={linkClass("/admin/orders")}
        >
          Orders
        </Link>

        <Link
          href="/admin/wallet"
          className={linkClass("/admin/wallet")}
        >
          Wallet Requests
        </Link>

        <div className="ml-auto">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg text-sm
                       text-gray-300 hover:bg-white/10"
          >
            Go to User Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
