import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { orderId, reason } = await req.json();

    await connectDB();
    const order = await Order.findById(orderId);
    if (!order || order.status !== "pending") {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    const user = await User.findById(order.userId);
    user.walletBalance += order.price;
    await user.save();

    order.status = "cancelled";
    order.adminNote = reason || "Cancelled by admin";
    await order.save();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Cancel failed" }, { status: 500 });
  }
}
