import { connectDB } from "@/lib/db";
import WalletRequest from "@/models/WalletRequest";
import User from "@/models/User"; // IMPORTANT
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const requests = await WalletRequest.find({ status: "pending" })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json(requests);
}
