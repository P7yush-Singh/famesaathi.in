import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import AdminOrdersClient from "./AdminOrdersClient";

export default async function AdminOrdersPage({ searchParams }) {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") redirect("/dashboard");

  const { q = "", status = "" } = searchParams;

  await connectDB();

  const orders = await Order.find({
    ...(status && { status }),
    ...(q && {
      $or: [
        { serviceName: { $regex: q, $options: "i" } },
        { link: { $regex: q, $options: "i" } },
      ],
    }),
  }).lean();

  const users = await User.find({ _id: { $in: orders.map(o => o.userId) } }).lean();
  const map = {};
  users.forEach(u => (map[u._id.toString()] = u));

  return <AdminOrdersClient orders={orders.map(o => ({ ...o, user: map[o.userId] }))} />;
}
