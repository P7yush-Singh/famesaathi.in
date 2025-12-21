import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import WalletTransaction from "@/models/WalletTransaction";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const txs = await WalletTransaction.find().lean();

  let csv = "UserID,Amount,Type,Source,Status,CreatedAt\n";

  txs.forEach(t => {
    csv += `${t.userId},${t.amount},${t.type},${t.source},${t.status},${t.createdAt}\n`;
  });

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=wallet.csv",
    },
  });
}
