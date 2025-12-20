import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { userId, amount, utr } = await req.json();

  await WalletTransaction.create({
    userId,
    amount,
    utr,
  });

  return NextResponse.json({ success: true });
}
