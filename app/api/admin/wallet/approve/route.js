import { connectDB } from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import User from "@/models/User";
import WalletHistory from "@/models/WalletHistory";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { requestId } = await req.json();
  const request = await WalletRequest.findById(requestId);

  if (!request || request.status !== "pending") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await User.findByIdAndUpdate(request.userId, {
    $inc: { walletBalance: request.amount },
  });

  await WalletHistory.create({
    userId: request.userId,
    type: "credit",
    amount: request.amount,
    source: "Wallet Topup",
  });

  request.status = "approved";
  await request.save();

  return NextResponse.json({ success: true });
}
