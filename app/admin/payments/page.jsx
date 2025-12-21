import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import User from "@/models/User";
import AdminPaymentsClient from "./AdminPaymentsClient";

export default async function AdminPaymentsPage() {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") redirect("/dashboard");

  await connectDB();

  const txs = await WalletTransaction.find({ status: "pending" }).lean();
  const users = await User.find({ _id: { $in: txs.map(t => t.userId) } }).lean();

  const map = {};
  users.forEach(u => (map[u._id.toString()] = u));

  const data = txs.map(tx => ({ ...tx, user: map[tx.userId.toString()] }));

  return <AdminPaymentsClient payments={data} />;
}
