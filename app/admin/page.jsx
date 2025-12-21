import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") redirect("/dashboard");

  await connectDB();

  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const pending = await Order.countDocuments({ status: "pending" });
  const revenueAgg = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, sum: { $sum: "$price" } } },
  ]);

  const revenue = revenueAgg[0]?.sum || 0;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Users" value={users} />
        <Stat title="Orders" value={orders} />
        <Stat title="Pending Orders" value={pending} />
        <Stat title="Revenue" value={`₹${revenue}`} />
      </div>

      <div className="flex gap-4 mt-6">
  <a
    href="/api/admin/export/orders"
    className="bg-blue-600 px-4 py-2 rounded-lg text-sm"
  >
    Export Orders CSV
  </a>

  <a
    href="/api/admin/export/wallet"
    className="bg-green-600 px-4 py-2 rounded-lg text-sm"
  >
    Export Wallet CSV
  </a>
</div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-[#0b2545] border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    
  );
}
