import { connectDB } from "@/lib/db";
import WalletHistory from "@/models/WalletHistory";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const records = await WalletHistory.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  const rows = [
    ["User", "Email", "Amount", "Type", "Reference", "Date"],
    ...records.map(r => [
      r.userId?.name || "",
      r.userId?.email || "",
      r.amount,
      r.type, // credit / debit
      r.reference || "",
      new Date(r.createdAt).toISOString(),
    ]),
  ];

  const csv = rows.map(r => r.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=wallet-history.csv",
    },
  });
}
