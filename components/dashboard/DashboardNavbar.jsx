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
    <header className="h-14 bg-[#020b18] border-b border-white/10 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <span className="font-semibold text-lg">FameSaathi</span>

        <nav className="flex gap-4 text-sm text-gray-300">
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/orders/new" className="hover:text-white">New Order</Link>
          <Link href="/orders" className="hover:text-white">Orders</Link>
          <Link href="/wallet" className="hover:text-white">Wallet</Link>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-sm">
        <span className="bg-[#103664] px-4 py-2 flex gap-1 items-center rounded">
        <Wallet width={18} />
          ₹{user.walletBalance}
        </span>

        <span>{user.name}</span>

        <form action="/api/auth/logout" method="POST">
          <button className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
