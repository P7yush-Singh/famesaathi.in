import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";
import { MIN_RECHARGE_AMOUNT } from "@/lib/constants";

export async function POST(req) {
  await connectDB();
  const { userId, amount, utr } = await req.json();

  if (amount < MIN_RECHARGE_AMOUNT) {
  return NextResponse.json(
    { error: `Minimum recharge is ₹${MIN_RECHARGE_AMOUNT}` },
    { status: 400 }
  );
}

  await WalletTransaction.create({
    userId,
    amount,
    utr,
  });

  return NextResponse.json({ success: true });
}
