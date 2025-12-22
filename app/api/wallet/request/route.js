import { connectDB } from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ FIX: cookies() is async in Next 16
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { amount, mobile, utr } = await req.json();

    if (!amount || !mobile || !utr) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const exists = await WalletRequest.findOne({ utr });
    if (exists) {
      return NextResponse.json({ error: "UTR already used" }, { status: 400 });
    }

    await WalletRequest.create({
      userId: decoded.userId,
      amount,
      mobile,
      utr,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WALLET REQUEST ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
