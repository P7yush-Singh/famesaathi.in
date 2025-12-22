import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      category,
      serviceId,
      serviceName,
      pricePer1000,
      quantity,
      link
    } = body;

    const totalAmount = (quantity / 1000) * pricePer1000;

    // ✅ VALIDATION
    if (totalAmount < 5)
      return NextResponse.json(
        { error: "Minimum order amount is ₹5" },
        { status: 400 }
      );

    if (totalAmount > 20000)
      return NextResponse.json(
        { error: "Maximum order amount is ₹20,000" },
        { status: 400 }
      );

    if (user.walletBalance < totalAmount)
      return NextResponse.json(
        { error: "Insufficient wallet balance" },
        { status: 400 }
      );

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId: user._id,
      category,
      serviceId,
      serviceName,
      link,
      quantity,
      pricePer1000,
      totalAmount
    });

    // ✅ DEDUCT WALLET
    user.walletBalance -= totalAmount;
    await user.save();

    return NextResponse.json({
      success: true,
      orderId: order._id
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
