import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import WalletHistory from "@/models/WalletHistory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies(); // ✅ Next 16+
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();

    const totalAmount = Number(body.totalAmount);

    if (!totalAmount || totalAmount < 5) {
      return NextResponse.json(
        { error: "Minimum order amount is ₹5" },
        { status: 400 }
      );
    }

    if (totalAmount > 20000) {
      return NextResponse.json(
        { error: "Maximum order amount is ₹20,000" },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.walletBalance < totalAmount) {
      return NextResponse.json(
        { error: "Insufficient wallet balance" },
        { status: 400 }
      );
    }

    // ✅ Wallet deduction (rounded)
    user.walletBalance = Number(
      (user.walletBalance - totalAmount).toFixed(2)
    );
    await user.save();

    await Order.create({
      userId: user._id,
      category: body.category,
      serviceName: body.serviceName,
      link: body.link,
      quantity: body.quantity,
      pricePer1000: body.pricePer1000,
      totalAmount, // ✅ SAVED CORRECTLY
      status: "pending",
    });

    await WalletHistory.create({
      userId: user._id,
      type: "debit",
      amount: totalAmount,
      source: "Order Placement",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
