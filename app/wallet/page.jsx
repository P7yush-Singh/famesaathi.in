import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";

export default async function WalletPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await connectDB();

  const txs = await WalletTransaction.find({ userId: decoded.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Wallet History</h1>

      <div className="space-y-3">
        {txs.map(tx => (
          <div
            key={tx._id}
            className="bg-[#0b2545] border border-white/10 rounded-xl p-4 flex justify-between"
          >
            <div>
              <p className="capitalize">{tx.source}</p>
              <p className="text-xs text-gray-400">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>

            <div
              className={`font-bold ${
                tx.type === "debit" ? "text-red-400" : "text-green-400"
              }`}
            >
              {tx.type === "debit" ? "-" : "+"}₹{tx.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
