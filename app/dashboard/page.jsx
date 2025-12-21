import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  const user = await User.findById(decoded.userId).lean();
  if (!user) redirect("/login");

  const orders = await Order.find({ userId: user._id });

  const stats = {
    balance: user.walletBalance,
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    completed: orders.filter(o => o.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Dashboard
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Wallet Balance" value={`₹${stats.balance}`} />
          <StatCard title="Total Orders" value={stats.total} />
          <StatCard title="Pending Orders" value={stats.pending} />
          <StatCard title="Completed Orders" value={stats.completed} />
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-[#0b2545] border border-white/10 rounded-lg p-5">
          <h2 className="font-medium mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <ActionBtn href="/new-order" label="New Order" />
            <ActionBtn href="/wallet" label="Add Funds" />
            <ActionBtn href="/orders" label="View Orders" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#0b2545] border border-white/10 rounded-lg p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function ActionBtn({ href, label }) {
  return (
    <a
      href={href}
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
    >
      {label}
    </a>
  );
}
