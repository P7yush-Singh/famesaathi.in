"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  PlusCircle,
  Wallet,
  User
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/orders/new", label: "New", icon: PlusCircle },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#020b18] border-t border-white/10 md:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center text-xs ${
                active ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Icon
                size={20}
                className={active ? "stroke-blue-500" : ""}
              />
              <span className="mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
