import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") redirect("/dashboard");

  await connectDB();

  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const pending = await Order.countDocuments({ status: "pending" });

  const revenueAgg = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, sum: { $sum: "$totalAmount" } } },
  ]);

  return (
    <AdminDashboardClient
      stats={{
        users,
        orders,
        pending,
        revenue: revenueAgg[0]?.sum || 0,
      }}
    />
  );
}
