"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  CreditCard,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/wallet", label: "Wallet Requests", icon: Wallet },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden sm:block min-h-screen bg-[#0b2545] border-r border-white/10 px-4 py-6">
      <h2 className="text-xl font-bold mb-8 text-white">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
