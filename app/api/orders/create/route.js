import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Auth
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Body
    const { serviceId, serviceName, link, quantity, price } =
      await req.json();

    if (!serviceId || !link || !quantity || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // 3. Wallet check
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.walletBalance < price) {
      return NextResponse.json(
        { error: "Insufficient wallet balance" },
        { status: 400 }
      );
    }

    // 4. Deduct balance
    user.walletBalance -= price;
    await user.save();

    // 5. Create order
    await Order.create({
      userId: user._id,
      serviceId,
      serviceName,
      link,
      quantity,
      price,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Order failed" },
      { status: 500 }
    );
  }
}
