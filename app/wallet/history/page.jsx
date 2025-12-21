import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";

export default async function WalletHistoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  const txs = await WalletTransaction.find({ userId: decoded.userId })
    .sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-[#020b18] text-white p-6">
      <h1 className="text-xl font-bold mb-4">Wallet History</h1>

      {txs.length === 0 ? (
        <p className="text-gray-400">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {txs.map(tx => (
            <div
              key={tx._id}
              className="bg-[#0b2545] border border-white/10 rounded-xl p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {tx.type === "credit" ? "Credit" : "Debit"}
                </p>
                <p className="text-sm text-gray-400">
                  UTR: {tx.utr || "-"}
                </p>
              </div>
              <div className="text-right">
                <p>₹{tx.amount}</p>
                <p className="text-sm text-gray-400 capitalize">
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
