import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import WalletClient from "./wallet-client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";

export default async function WalletPage() {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();

  const user = await User.findById(decoded.userId).lean();
  const transactions = await WalletTransaction
    .find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />
      <div className="p-6 max-w-5xl mx-auto">
        <WalletClient
          balance={Number(user.walletBalance || 0)}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
