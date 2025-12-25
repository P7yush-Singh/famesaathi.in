import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { redirect } from "next/navigation";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";

/* ================= STATUS BADGE ================= */
function StatusBadge({ status }) {
  const base =
    "px-2 py-0.5 rounded-full text-xs font-medium inline-block";

  const styles = {
    pending: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-green-500/20 text-green-400",
    processing: "bg-blue-500/20 text-blue-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`${base} ${
        styles[status] || "bg-gray-500/20 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
}

/* ================= NEW BADGE ================= */
function NewBadge() {
  return (
    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/20 text-green-400">
      NEW
    </span>
  );
}

export default async function OrdersPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();

  // ✅ GUARANTEED newest first
  const orders = await Order.find({ userId: decoded.userId })
    .sort({ createdAt: -1, _id: -1 })
    .lean();

  // ✅ identify latest order
  const latestOrderId =
    orders.length > 0 ? orders[0]._id.toString() : null;

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="p-4 md:p-6 pb-20">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-[#0b2545] border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/30">
              <tr>
                <th className="p-3 text-left">Service</th>
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

              {orders.map((o) => {
                const isLatest = o._id.toString() === latestOrderId;

                return (
                  <tr
                    key={o._id}
                    className="border-t border-white/10 text-center"
                  >
                    <td className="p-3 text-left">
                      {o.serviceName}
                      {isLatest && <NewBadge />}
                    </td>

                    <td className="p-3 text-left">
                      <Link
                        href={`https://${o.link}`}
                        target="_blank"
                        className="text-blue-300 hover:text-blue-500 break-all"
                      >
                        {o.link}
                      </Link>
                    </td>

                    <td>
                      <StatusBadge status={o.status} />
                    </td>

                    <td>{o.quantity}</td>
                    <td>₹{o.totalAmount}</td>
                    <td>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {orders.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              No orders yet
            </div>
          )}

          {orders.map((o) => {
            const isLatest = o._id.toString() === latestOrderId;

            return (
              <div
                key={o._id}
                className="bg-[#0b2545] border border-white/10 rounded-lg p-4 space-y-2"
              >
                <div className="font-semibold text-sm flex items-center">
                  {o.serviceName}
                  {isLatest && <NewBadge />}
                </div>

                <Link
                  href={`https://${o.link}`}
                  target="_blank"
                  className="text-blue-400 text-xs break-all"
                >
                  {o.link}
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div>
                    <span className="text-gray-400">Status:</span>{" "}
                    <StatusBadge status={o.status} />
                  </div>

                  <div>
                    <span className="text-gray-400">Qty:</span>{" "}
                    {o.quantity}
                  </div>

                  <div>
                    <span className="text-gray-400">Price:</span>{" "}
                    ₹{o.totalAmount}
                  </div>

                  <div>
                    <span className="text-gray-400">Date:</span>{" "}
                    {new Date(o.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
