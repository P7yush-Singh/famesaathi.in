import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  const { orderId } = await req.json();
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  await Order.findByIdAndUpdate(orderId, {
    status: "completed",
    completedAt: new Date(),
  });

  return Response.json({ success: true });
}
