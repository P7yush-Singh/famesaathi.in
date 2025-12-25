import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return Response.json(
      { error: "from and to dates required" },
      { status: 400 }
    );
  }

  await connectDB();

  const data = await Order.aggregate([
    {
      $match: {
        status: "completed",
        createdAt: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  let csv = "Date,Revenue,Orders\n";
  data.forEach(d => {
    csv += `${d._id},${d.revenue},${d.orders}\n`;
  });

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        "attachment; filename=revenue-range.csv",
    },
  });
}
