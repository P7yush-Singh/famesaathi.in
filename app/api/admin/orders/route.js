import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function PATCH(req) {
  await connectDB();
  const { orderId, action, adminNote } = await req.json();

  const order = await Order.findById(orderId);
  if (!order)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (action === "complete") {
    order.status = "completed";
  }

  if (action === "cancel") {
    order.status = "cancelled";
    order.adminNote = adminNote || "";
  }

  await order.save();
  return NextResponse.json({ success: true });
}
