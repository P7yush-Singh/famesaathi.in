import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const token = (await cookies()).get("token")?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { serviceId, serviceName, link, quantity, price } = await req.json();

    await connectDB();

    const user = await User.findById(decoded.id);
    if (user.walletBalance < price) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    user.walletBalance -= price;
    await user.save();

    const order = await Order.create({
      userId: user._id,
      serviceId,
      serviceName,
      link,
      quantity,
      price,
    });

    await WalletTransaction.create({
      userId: user._id,
      amount: price,
      type: "debit",
      source: "order",
      referenceId: order._id,
      status: "completed",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}
