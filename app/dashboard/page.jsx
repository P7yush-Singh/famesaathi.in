import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { middleware } from "@/middleware";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) redirect("/login");

  const orders = await Order.find({ userId: user._id });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const completedOrders = orders.filter(o => o.status === "completed").length;

  return (
    <main className="min-h-screen bg-[#020b18] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat title="Wallet Balance" value={`₹${user.walletBalance}`} />
        <Stat title="Total Orders" value={totalOrders} />
        <Stat title="Pending Orders" value={pendingOrders} />
        <Stat title="Completed Orders" value={completedOrders} />
      </div>

      <div className="bg-[#0b2545] border border-white/10 rounded-xl p-4">
        <h2 className="font-semibold mb-3">Recent Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders yet</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {orders.slice(0, 5).map(order => (
              <li
                key={order._id}
                className="flex justify-between border-b border-white/5 pb-2"
              >
                <span>{order.serviceName}</span>
                <span className="capitalize text-gray-400">
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-[#0b2545] border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
