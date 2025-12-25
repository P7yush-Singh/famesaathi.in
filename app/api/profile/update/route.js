import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  const { name } = await req.json();
  const token = (await cookies()).get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();
  await User.findByIdAndUpdate(decoded.userId, { name });

  return Response.json({ success: true });
}
