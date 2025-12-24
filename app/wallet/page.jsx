import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import WalletClient from "./wallet-client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function WalletPage() {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  const user = await User.findById(decoded.userId).lean();

  return (
    <>
      <DashboardNavbar />
      <div className="p-6">
        <WalletClient balance={user.walletBalance || 0} />
      </div>
    </>
  );
}
