import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import OrderForm from "./OrderForm";
import MobileBottomNav from "@/components/MobileBottomNav";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function NewOrderPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  const user = await User.findById(decoded.userId).lean();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#020b18] text-white">
      <DashboardNavbar />

      <main className="px-4 py-6">
        <OrderForm walletBalance={Number(user.walletBalance || 0)} />
      </main>

      <MobileBottomNav />
    </div>
  );
}
