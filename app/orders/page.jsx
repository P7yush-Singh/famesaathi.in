import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { redirect } from "next/navigation";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function OrdersPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await connectDB();

  const orders = await Order.find({ userId: decoded.userId })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        <div className="bg-[#0b2545] border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/30">
              <tr>
                <th className="p-3 text-left">History</th>
                <th className="p-3 text-left">Link</th>
                <th>Status</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No orders yet
                  </td>
                </tr>
              )}

              {orders.map(o => (
                <tr key={o._id} className="border-t text-center border-white/10">
                  <td className="p-3 text-left">{o.serviceName}</td>
                  <td className="p-3 text-left">
                    <Link href={`https://${o.link}`} target="_blank" className="text-blue-300 hover:text-blue-500">{o.link}</Link>
                  </td>
                  <td>{o.status}</td>
                  <td>{o.quantity}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <MobileBottomNav/>
    </div>
  );
}
