import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { Wallet} from "lucide-react";

export default async function DashboardNavbar() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  const user = await User.findById(decoded.userId).lean();
  if (!user) redirect("/login");

  return (
    <header className="bg-[#020b18] border-b border-white/10 px-4 sm:px-6">
  <div className="h-14 flex items-center justify-between">
    
    {/* LEFT */}
    <div className="flex items-center gap-4">
      <span className="font-semibold text-lg">FameSaathi</span>

      <nav className="hidden md:flex gap-4 text-sm text-gray-300">
        <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
        <Link href="/orders/new" className="hover:text-white">New Order</Link>
        <Link href="/orders" className="hover:text-white">Orders</Link>
        <Link href="/wallet" className="hover:text-white">Wallet</Link>
      </nav>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-2 sm:gap-4 text-sm">
      <Link href="/wallet" className="bg-[#103664] px-3 py-1.5 flex gap-1 items-center rounded text-xs sm:text-sm">
        ₹{user.walletBalance}
      </Link>

      <Link href="/profile" className="hidden sm:block">{user.name}</Link>

      <form action="/api/auth/logout" method="POST">
        <button className="bg-red-600 px-3 py-1 rounded text-xs sm:text-sm">
          Logout
        </button>
      </form>
    </div>
  </div>

  {/* MOBILE NAV */}
  <nav className="md:hidden flex justify-around text-xs text-gray-300 py-2 border-t border-white/10">
    <Link href="/dashboard">Dashboard</Link>
    <Link href="/orders/new">New</Link>
    <Link href="/orders">Orders</Link>
    <Link href="/wallet">Wallet</Link>
  </nav>
</header>

  );
}
