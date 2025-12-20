import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { transactionId } = await req.json();

  const tx = await WalletTransaction.findById(transactionId);
  if (!tx || tx.status !== "pending") {
    return NextResponse.json({ error: "Invalid transaction" }, { status: 400 });
  }

  tx.status = "approved";
  await tx.save();

  const user = await User.findById(tx.userId);
  user.walletBalance += tx.amount;
  await user.save();

  return NextResponse.json({ success: true });
}
