import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { transactionId, reason } = await req.json();

    await connectDB();
    const tx = await WalletTransaction.findById(transactionId);

    if (!tx || tx.status !== "pending") {
      return NextResponse.json({ error: "Invalid transaction" }, { status: 400 });
    }

    tx.status = "rejected";
    tx.adminNote = reason || "Rejected by admin";
    await tx.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REJECT PAYMENT ERROR:", err);
    return NextResponse.json({ error: "Reject failed" }, { status: 500 });
  }
}
