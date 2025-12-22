import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";
import { redirect } from "next/navigation";

export default async function WalletPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await connectDB();

  const user = await User.findById(decoded.userId).lean();
  const txns = await WalletTransaction.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Wallet</h1>

        <div className="bg-[#0b2545] border border-white/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400">Current Balance</p>
          <p className="text-2xl font-semibold">₹{user.walletBalance}</p>
        </div>

        <h2 className="font-medium mb-3">Wallet History</h2>

        <div className="bg-[#0b2545] border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/30">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th>Amount</th>
                <th>Source</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {txns.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">
                    No wallet transactions
                  </td>
                </tr>
              )}

              {txns.map(t => (
                <tr key={t._id} className="border-t border-white/10">
                  <td className="p-3">{t.type}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.source}</td>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
