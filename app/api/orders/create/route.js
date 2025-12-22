import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import WalletHistory from "@/models/WalletHistory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const body = await req.json();
  const total = body.total;

  const user = await User.findById(decoded.userId);

  if (user.walletBalance < total) {
    return NextResponse.json(
      { error: "Insufficient wallet balance" },
      { status: 400 }
    );
  }

  user.walletBalance -= total;
  await user.save();

  const order = await Order.create({
    ...body,
    userId: user._id,
    status: "pending",
  });

  await WalletHistory.create({
    userId: user._id,
    type: "debit",
    amount: total,
    source: `Order #${order._id}`,
  });

  return NextResponse.json({ success: true });
}
