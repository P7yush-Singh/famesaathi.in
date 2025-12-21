import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const orders = await Order.find().lean();

  let csv = "OrderID,Service,Link,Price,Status,CreatedAt\n";

  orders.forEach(o => {
    csv += `${o._id},"${o.serviceName}","${o.link}",${o.price},${o.status},${o.createdAt}\n`;
  });

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=orders.csv",
    },
  });
}
