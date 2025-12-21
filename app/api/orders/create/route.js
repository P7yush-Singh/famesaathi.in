import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { serviceName, link, quantity, price } = await req.json();

  await connectDB();
  const user = await User.findById(decoded.userId);
  if (!user || user.walletBalance < price) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  user.walletBalance -= price;
  await user.save();

  const order = await Order.create({
    userId: user._id,
    serviceName,
    link,
    quantity,
    price,
    status: "pending",
  });

  await WalletTransaction.create({
    userId: user._id,
    amount: price,
    type: "debit",
    referenceId: order._id,
  });

  return NextResponse.json({ success: true });
}
