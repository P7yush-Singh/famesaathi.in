import { connectDB } from "@/lib/db";
import WalletHistory from "@/models/WalletHistory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const history = await WalletHistory.find({ userId: decoded.userId })
    .sort({ createdAt: -1 });

  return NextResponse.json(history);
}
