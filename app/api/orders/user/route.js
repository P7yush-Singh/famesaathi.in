import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get("userId");

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}
