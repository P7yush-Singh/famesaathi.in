import { connectDB } from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { requestId } = await req.json();
  await WalletRequest.findByIdAndUpdate(requestId, {
    status: "rejected",
  });

  return NextResponse.json({ success: true });
}
